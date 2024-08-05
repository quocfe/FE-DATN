import { USER } from '~/constants/user.constant'
import http from '~/utils/http'

class UserApi {
  // Danh sách tất cả người dùng
  fetchAllUsers(userConfigParams: UserConfigParams) {
    const { _page, _limit } = userConfigParams

    return http.get<UserListReponse>(USER.LIST, {
      params: {
        _page,
        _limit
      }
    })
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
  fetchAllReceivedFriendRequest(userConfigParams: UserConfigParams) {
    const { _page, _limit } = userConfigParams

    return http.get<UserListReponse>(USER.RECEIVERD_FRIEND_REQUEST, {
      params: {
        _page,
        _limit
      }
    })
  }

  // Danh sách bạn bè của tôi
  fetchAllMyFriends(userConfigParams: UserConfigParams) {
    const { _page, _limit } = userConfigParams

    return http.get<UserListReponse>(USER.FRIENDS, {
      params: { _page, _limit }
    })
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
  fetchAllFriendsOfFriends(friend_id: string, userConfigParams: UserConfigParams) {
    const _page = userConfigParams._page
    const _limit = userConfigParams._limit

    return http.get<UserListReponse>(`${USER.FRIENDS_OF_FRIENDS}/${friend_id}`, {
      params: {
        _page,
        _limit
      }
    })
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

  // Tìm kiếm bạn bè
  searchFriends(query: string) {
    return http.get<UserListReponse>(`${USER.SEARCH_FRIEND}/${query}`)
  }

  // Danh sách lời mời kết bạn đã gửi
  fetchAllSendFriendRequests(userConfigParams: UserConfigParams) {
    const { _page, _limit } = userConfigParams

    return http.get<UserListReponse>(USER.SEND_FRIEND_REQUESTS, {
      params: {
        _page,
        _limit
      }
    })
  }

  // Thêm mới lịch sử tìm kiếm
  addNewSearchHistory(data: CreateSearchHistory) {
    return http.post(USER.CREATE_SEARCH_HISTORY, data)
  }

  // Lịch sử tìm kiếm
  fetchAllSearchHistories() {
    return http.get<SearchHistory>(USER.LIST_SEARCH_HISTORIES)
  }

  // Xóa lịch sử tìm kiếm
  deleteSearchHistory(target_id: string) {
    return http.delete(`${USER.DELETE_SEARCH_HISTORY}/${target_id}`)
  }

  // Xóa tất cả lịch sử tìm kiếm
  clearSearchHistories() {
    return http.delete(USER.CLEAR_SEARCH_HISTORIES)
  }

  // Danh sách hình ảnh và video
  getAllMediaResource() {
    return http.get<MediaResourceResponse>(USER.LIST_MEDIA_RESOURCES)
  }
  fetchUserProfile(userId: string) {
    return http.get<ProfileResponse>(`${USER.PROFILE}/${userId}`, { withCredentials: true });
  }
}

export default new UserApi()
