import { POST_COMMENT_REPLY } from '~/constants/postCommentReply.constant'
import http from '~/utils/http'

class postCommentReply {
  getAllPostCommentReplies(comment_id: string) {
    return http.get<PostCommentReplyResponse>(`${POST_COMMENT_REPLY.LIST}/${comment_id}`)
  }

  addPostCommentReply({ comment_id, formData }: { comment_id: string; formData: FormData }) {
    return http.post(`${POST_COMMENT_REPLY.CREATE}/${comment_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  deletePostCommentReply(comment_reply_id: string) {
    return http.delete(`${POST_COMMENT_REPLY.DELETE}/${comment_reply_id}`)
  }
}

export default new postCommentReply()
