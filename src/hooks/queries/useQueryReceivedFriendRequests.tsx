import { useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQueryReceivedFriendRequests() {
  return useQuery({
    queryKey: ['received_friend_requests'],
    queryFn: userApi.fetchAllReceivedFriendRequest
  })
}

export default useQueryReceivedFriendRequests
