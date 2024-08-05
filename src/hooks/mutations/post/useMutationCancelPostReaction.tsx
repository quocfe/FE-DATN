import { useMutation } from '@tanstack/react-query'
import postReactionApi from '~/apis/postReaction.api'

function useMutationCancelPostReaction() {
  return useMutation({
    mutationFn: (post_id: string) => postReactionApi.cancelPostReaction(post_id)
  })
}

export default useMutationCancelPostReaction
