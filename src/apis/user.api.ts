import { USER } from '~/constants/user.constant'
import http from '~/utils/http'

class UserApi {
  fetchProfile() {
    return http.get<ProfileResponse>(USER.PROFILE, { withCredentials: true })
  }

  updateProfile(profile: UpdateProfile) {
    return http.post<ProfileResponse>(USER.UPDATE, profile)
  }
}

export default new UserApi()
