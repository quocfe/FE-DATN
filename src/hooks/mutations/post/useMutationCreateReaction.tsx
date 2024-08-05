import { useMutation } from '@tanstack/react-query'
import postReactionApi from '~/apis/postReaction.api'

function useMutationCreateReaction() {
  return useMutation({
    mutationFn: (data: { post_id: string; type: string }) => postReactionApi.createInteraction(data)
  })
}

export default useMutationCreateReaction
