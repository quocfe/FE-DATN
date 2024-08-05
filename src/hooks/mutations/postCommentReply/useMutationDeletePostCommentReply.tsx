import { useMutation } from '@tanstack/react-query'
import postCommentReplyApi from '~/apis/postCommentReply.api'

function useMutationDeletePostCommentReply() {
  return useMutation({
    mutationFn: (comment_reply_id: string) => postCommentReplyApi.deletePostCommentReply(comment_reply_id)
  })
}

export default useMutationDeletePostCommentReply
