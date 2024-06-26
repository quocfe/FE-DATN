import { keepPreviousData, useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQueryReceivedFriendRequests(userConfigParams: UserConfigParams) {
  return useQuery({
    queryKey: ['received_friend_requests', userConfigParams],
    queryFn: () => userApi.fetchAllReceivedFriendRequest(userConfigParams),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData
  })
}

export default useQueryReceivedFriendRequests
