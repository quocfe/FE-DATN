import { POST } from '~/constants/post.constant'
import http from '~/utils/http'

class PostApi {
  // Lấy danh sách bài đăng của tôi
  getAllMyPosts(_limit: number = 2) {
    return http.get<PostResponse>(POST.MY_POST, {
      params: {
        _limit
      }
    })
  }

  // Tạo bài đăng mới
  addNewPost(formData: FormData) {
    return http.post(POST.ADD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  // Lấy danh sách bài đăng của người dùng
  getAllUserPosts(user_id: string) {
    return http.get<PostResponse>(`${POST.USER_POST}/${user_id}`)
  }

  // Lấy danh sách bài đăng của bạn bè và người đang gửi kết bạn
  getAllPostFriendAndPending(_limit: number) {
    return http.get<PostResponse>(POST.POST_FRIEND_AND_PENDING, {
      params: {
        _limit
      }
    })
  }

  // Xóa bài đăng
  deletePost(post_id: string) {
    return http.delete(`${POST.DELETE}/${post_id}`)
  }
}

export default new PostApi()
