import { USER } from '~/constants/user.constant'
import http from '~/utils/http'

class UserApi {
  fetchAllUsers() {
    return http.get<UserListReponse>(USER.LIST)
  }

  fetchProfile() {
    return http.get<ProfileResponse>(USER.PROFILE)
  }

  fetchPublicProfile(user_id: string) {
    return http.get<ProfilePublicResponse>(`${USER.PROFILE}/${user_id}`)
  }

  fetchAllReceivedFriendRequest() {
    return http.get<UserListReponse>(USER.RECEIVERD_FRIEND_REQUEST)
  }

  fetchAllMyFriends() {
    return http.get<UserListReponse>(USER.FRIENDS)
  }

  updateProfile(profile: UpdateProfile | FormData) {
    return http.post<ProfileResponse>(USER.UPDATE, profile, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  senderFriendRequest(friend_id: string) {
    return http.post(`${USER.SENDER_FRIEND_REQUEST}/${friend_id}`)
  }

  cancelFriendRequest(friend_id: string) {
    return http.post(`${USER.CANCEL_FRIEND_REQUEST}/${friend_id}`)
  }

  acceptFriendRequest(friend_id: string) {
    return http.post(`${USER.ACCEPT_FRIEND_REQUEST}/${friend_id}`)
  }

  blockedUser(user_id: string) {
    return http.post(`${USER.BLOCKED_USER}/${user_id}`)
  }
}

export default new UserApi()
