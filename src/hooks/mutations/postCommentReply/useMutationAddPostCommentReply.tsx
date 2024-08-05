import { useMutation } from '@tanstack/react-query'
import postCommentReplyApi from '~/apis/postCommentReply.api'

function useMutationAddPostCommentReply() {
  return useMutation({
    mutationFn: (data: { comment_id: string; formData: FormData }) => postCommentReplyApi.addPostCommentReply(data)
  })
}

export default useMutationAddPostCommentReply
