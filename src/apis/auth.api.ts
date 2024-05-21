import { AUTH } from '~/constants/auth.constant'
import http from '~/utils/http'
import { LoginForm } from '~/utils/rules'

class authApi {
  login(data: LoginForm) {
    return http.post<AuthResponse>(AUTH.LOGIN, data, { withCredentials: true })
  }

  logout() {
    return http.post(AUTH.LOGOUT, {}, { withCredentials: true })
  }
}

export default new authApi()
