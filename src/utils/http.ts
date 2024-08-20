import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import {
  clearLocalStorage,
  getAccessTokenFromLocalStorage,
  setAccessTokenLocalToStorage,
  setProfileLocalStorage,
  setTypeLoginToLocalStorage
} from './auth'
import { AUTH } from '~/constants/auth.constant'
import authApi from '~/apis/auth.api'

class Http {
  instance: AxiosInstance
  private access_token: string
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    this.access_token = getAccessTokenFromLocalStorage()
    this.refreshTokenRequest = null

    this.instance = axios.create({
      baseURL: 'http://localhost:3000/api/v1/',
      timeout: 100000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.access_token ? this.access_token : ''
      }
    })

    // Request
    this.instance.interceptors.request.use(
      (config) => {
        if (this.access_token) {
          config.headers.Authorization = this.access_token
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === AUTH.LOGIN) {
          const data = response.data as AuthResponse
          const profile = data.data.user
          this.access_token = data.data.access_token

          setTypeLoginToLocalStorage(data.data.type)
          setAccessTokenLocalToStorage(this.access_token)
          setProfileLocalStorage(profile)
        } else if (url === AUTH.LOGOUT) {
          this.access_token = ''
          clearLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        const errorResponse = error.response?.data as ErrorUnauthorizedResponse
        if (
          error.response &&
          errorResponse.status === HttpStatusCode.Unauthorized &&
          errorResponse.errors.errorName === 'EXPIRED_TOKEN'
        ) {
          const { config } = error.response

          this.refreshTokenRequest = this.refreshTokenRequest
            ? this.refreshTokenRequest
            : this.handleRefreshAccessToken().finally(() => {
                this.refreshTokenRequest = null
              })

          console.log(this.refreshTokenRequest)

          return this.refreshTokenRequest.then((access_token) => {
            if (config.headers) config.headers.Authorization = access_token
            return this.instance(config)
          })
        }

        return Promise.reject(error)
      }
    )
  }

  // Xử lý refresh token
  private handleRefreshAccessToken() {
    return this.instance
      .post<RefreshTokenResponse>(AUTH.URL_REFRESH_ACCESS_TOKEN, {}, { withCredentials: true })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenLocalToStorage(access_token)
        this.access_token = access_token
        return access_token
      })
      .catch((error) => {
        authApi.logout().finally(() => {
          localStorage.clear()
          this.access_token = ''
          window.location.reload()
        })
        return error
      })
  }
}

const http = new Http().instance

export default http
