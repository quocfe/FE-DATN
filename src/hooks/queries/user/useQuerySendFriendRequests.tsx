import { useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQuerySendFriendRequests() {
  return useQuery({
    queryKey: ['send_friend_requests'],
    queryFn: userApi.fetchAllSendFriendRequests
  })
}

export default useQuerySendFriendRequests
