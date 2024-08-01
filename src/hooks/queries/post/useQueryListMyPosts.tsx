import { keepPreviousData, useQuery } from '@tanstack/react-query'
import postApi from '~/apis/post.api'

function useQueryListMyPosts() {
  return useQuery({
    queryKey: ['my_posts'],
    queryFn: () => postApi.getAllMyPosts(),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData
  })
}

export default useQueryListMyPosts
