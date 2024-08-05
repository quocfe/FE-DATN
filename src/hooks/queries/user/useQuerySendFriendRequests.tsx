import { keepPreviousData, useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQuerySendFriendRequests(userConfigParams: UserConfigParams) {
  return useQuery({
    queryKey: ['send_friend_requests', userConfigParams],
    queryFn: () => userApi.fetchAllSendFriendRequests(userConfigParams),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000
  })
}

export default useQuerySendFriendRequests
