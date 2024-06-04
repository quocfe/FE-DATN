import { useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQueryListMyFriends() {
  return useQuery({
    queryKey: ['my_friends'],
    queryFn: userApi.fetchAllMyFriends
  })
}

export default useQueryListMyFriends
