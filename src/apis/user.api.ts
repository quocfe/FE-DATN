import { USER } from '~/constants/user.constant'
import http from '~/utils/http'

class UserApi {
  // Danh sách người dùng
  fetchAllUsers() {
    return http.get<UserListReponse>(USER.LIST)
  }

  // Thông tin người dùng
  fetchProfile() {
    return http.get<ProfileResponse>(USER.PROFILE)
  }

  // Thông tin người dùng khác
  fetchPublicProfile(user_id: string) {
    return http.get<ProfilePublicResponse>(`${USER.PROFILE}/${user_id}`)
  }

  // Lời mời kết bạn
  fetchAllReceivedFriendRequest() {
    return http.get<UserListReponse>(USER.RECEIVERD_FRIEND_REQUEST)
  }

  // Danh sách bạn bè của tôi
  fetchAllMyFriends() {
    return http.get<UserListReponse>(USER.FRIENDS)
  }

  // Cập nhật thông tin người dùng
  updateProfile(profile: UpdateProfile | FormData) {
    return http.post<ProfileResponse>(USER.UPDATE, profile, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  // Gửi lời mời kết bạn
  senderFriendRequest(friend_id: string) {
    return http.post(`${USER.SENDER_FRIEND_REQUEST}/${friend_id}`)
  }

  // Hủy lời mời + hủy kết bạn
  cancelFriendRequest(friend_id: string) {
    return http.post(`${USER.CANCEL_FRIEND_REQUEST}/${friend_id}`)
  }

  // Chấp nhập lời mời kết bạn
  acceptFriendRequest(friend_id: string) {
    return http.post(`${USER.ACCEPT_FRIEND_REQUEST}/${friend_id}`)
  }

  // Chặn người dùng
  blockedUser(user_id: string) {
    return http.post(`${USER.BLOCKED_USER}/${user_id}`)
  }

  // Danh sách bạn bè của bạn bè
  fetchAllFriendsOfFriends(friend_id: string) {
    return http.get<UserListReponse>(`${USER.FRIENDS_OF_FRIENDS}/${friend_id}`)
  }

  // Danh sách chặn người dùng
  fetchAllBlockUsers() {
    return http.get<UserListReponse>(USER.LIST_BLOCK_USERS)
  }

  // Bỏ chặn người dùng
  unblockedUser(user_id: string) {
    return http.post(`${USER.UNBLOCKED_USER}/${user_id}`)
  }

  // Đổi mật khẩu
  changePassword(data: ChangePassword) {
    return http.post(USER.CHANGE_PASSWORD, data)
  }
}

export default new UserApi()
