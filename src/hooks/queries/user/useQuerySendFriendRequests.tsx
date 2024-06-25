import { keepPreviousData, useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQuerySendFriendRequests(userConfigParams: UserConfigParams) {
  return useQuery({
    queryKey: ['send_friend_requests', userConfigParams],
    queryFn: () => userApi.fetchAllSendFriendRequests(userConfigParams),
    placeholderData: keepPreviousData
  })
}

export default useQuerySendFriendRequests
