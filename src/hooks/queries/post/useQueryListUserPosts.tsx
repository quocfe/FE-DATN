import { useQuery } from '@tanstack/react-query'
import postApi from '~/apis/post.api'

function useQueryListUserPosts(user_id: string) {
  return useQuery({
    queryKey: ['user_posts', { user_id }],
    queryFn: () => postApi.getAllUserPosts(user_id),
    staleTime: 5 * 60 * 1000,
    enabled: user_id !== ''
  })
}

export default useQueryListUserPosts
