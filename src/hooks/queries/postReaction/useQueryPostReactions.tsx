import { keepPreviousData, useQuery } from '@tanstack/react-query'
import postReactionApi from '~/apis/postReaction.api'

function useQueryPostReactions(post_id: string) {
  return useQuery({
    queryKey: ['post_reactions', { post_id }],
    queryFn: () => postReactionApi.getAllPostReactions(post_id),
    placeholderData: keepPreviousData,
    enabled: post_id !== null
  })
}

export default useQueryPostReactions
