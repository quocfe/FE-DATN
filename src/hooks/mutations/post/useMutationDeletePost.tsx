import { useMutation } from '@tanstack/react-query'
import postApi from '~/apis/post.api'

function useMutationDeletePost() {
  return useMutation({
    mutationFn: (post_id: string) => postApi.deletePost(post_id)
  })
}

export default useMutationDeletePost
