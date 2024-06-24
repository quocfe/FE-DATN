import { useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQueryListMyFriends() {
  return useQuery({
    queryKey: ['my_friends'],
    queryFn: userApi.fetchAllMyFriends,
    staleTime: 15 * 60 * 1000
  })
}

export default useQueryListMyFriends
