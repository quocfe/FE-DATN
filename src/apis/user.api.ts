import { USER } from '~/constants/user.constant'
import http from '~/utils/http'

class UserApi {
  fetchProfile() {
    return http.get<ProfileResponse>(USER.PROFILE, { withCredentials: true })
  }

  updateProfile(profile: UpdateProfile) {
    return http.post<ProfileResponse>(USER.UPDATE, profile)
  }
  fetchUserProfile(userId: string) {
    return http.get<ProfileResponse>(`${USER.PROFILE}/${userId}`, { withCredentials: true });
  }
}

export default new UserApi()
