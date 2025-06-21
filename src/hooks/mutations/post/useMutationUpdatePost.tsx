import { useMutation } from '@tanstack/react-query'
import postApi from '~/apis/post.api'

function useMutationUpdatePost() {
  return useMutation({
    mutationFn: (data: { post_id: string; data: PostUpdate }) => postApi.updatePost(data)
  })
}

export default useMutationUpdatePost
