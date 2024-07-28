import { keepPreviousData, useQuery } from '@tanstack/react-query'
import postApi from '~/apis/post.api'

function useQueryListMyPosts(limit: number) {
  return useQuery({
    queryKey: ['my_posts', { limit }],
    queryFn: () => postApi.getAllMyPosts(limit),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData
  })
}

export default useQueryListMyPosts
