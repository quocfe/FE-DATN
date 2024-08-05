import { useMutation } from '@tanstack/react-query'
import postCommentApi from '~/apis/postComment.api'

function useMutationAddPostComment() {
  return useMutation({
    mutationFn: (data: { post_id: string; formData: FormData }) => postCommentApi.addNewPostComment(data)
  })
}

export default useMutationAddPostComment
