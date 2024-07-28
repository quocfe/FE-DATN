import { POST_COMMENT_REPLY } from '~/constants/postCommentReply.constant'
import http from '~/utils/http'

class postCommentReply {
  addPostCommentReply({ comment_id, formData }: { comment_id: string; formData: FormData }) {
    return http.post(`${POST_COMMENT_REPLY.CREATE}/${comment_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default new postCommentReply()
