import { POST_RECTION } from '~/constants/postReaction.constant'
import http from '~/utils/http'

class postReaction {
  // Lấy danh sách tương tác bài đăng
  getAllPostReactions(post_id: string) {
    return http.get<PostReactionResponse>(`${POST_RECTION.LIST}/${post_id}`)
  }

  // Tạo mới tương tác
  createInteraction(data: { post_id: string; type: string }) {
    const { post_id, type } = data
    return http.post(`${POST_RECTION.CREATE}/${post_id}`, { type })
  }

  // Thu hồi tương tác
  cancelPostReaction(post_id: string) {
    return http.delete(`${POST_RECTION.CANCEL}/${post_id}`)
  }

  // Cập nhật tương tác
  updatePostReaction(data: { post_id: string; type: string }) {
    const { post_id, type } = data
    return http.post(`${POST_RECTION.UPDATE}/${post_id}`, { type })
  }
}

export default new postReaction()
