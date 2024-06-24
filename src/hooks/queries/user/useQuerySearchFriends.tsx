import { useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQuerySearchFriends(query: string) {
  return useQuery({
    queryKey: ['search_friends', { query }],
    queryFn: () => userApi.searchFriends(query),
    enabled: !!query
  })
}

export default useQuerySearchFriends
