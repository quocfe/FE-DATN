import { POST_COMMENT } from '~/constants/postComment.constant'
import http from '~/utils/http'

class postComment {
  getAllPostComments(post_id: string) {
    return http.get<PostCommentResponse>(`${POST_COMMENT.LIST}/${post_id}`)
  }

  addNewPostComment({ post_id, formData }: { post_id: string; formData: FormData }) {
    return http.post(`${POST_COMMENT.CREATE}/${post_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  deletePostComment(comment_id: string) {
    return http.delete(`${POST_COMMENT.DELETE}/${comment_id}`)
  }

  // cập nhật comment_id: string, formData: FormData
  updatePostComment({ comment_id, formData }: { comment_id: string; formData: FormData }) {
    return http.put(`${POST_COMMENT.UPDATE}/${comment_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default new postComment()
