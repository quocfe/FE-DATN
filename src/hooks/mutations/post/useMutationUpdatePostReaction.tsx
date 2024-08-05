import { useMutation } from '@tanstack/react-query'
import postReactionApi from '~/apis/postReaction.api'

function useMutationUpdatePostReaction() {
  return useMutation({
    mutationFn: (data: { post_id: string; type: string }) => postReactionApi.updatePostReaction(data)
  })
}

export default useMutationUpdatePostReaction
