import { useMutation } from '@tanstack/react-query'
import postCommentApi from '~/apis/postComment.api'

function useMutationDeletePostComment() {
  return useMutation({
    mutationFn: (comment_id: string) => postCommentApi.deletePostComment(comment_id)
  })
}

export default useMutationDeletePostComment
