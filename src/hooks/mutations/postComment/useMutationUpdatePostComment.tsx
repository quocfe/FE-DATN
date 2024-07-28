import { useMutation } from '@tanstack/react-query'
import postCommentApi from '~/apis/postComment.api'

function useMutationUpdatePostComment() {
  return useMutation({
    mutationFn: (data: { comment_id: string; formData: FormData }) => postCommentApi.updatePostComment(data)
  })
}

export default useMutationUpdatePostComment
