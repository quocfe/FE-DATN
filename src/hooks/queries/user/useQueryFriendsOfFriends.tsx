import { keepPreviousData, useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQueryFriendsOfFriends(friend_id: string, userConfigParams: UserConfigParams) {
  return useQuery({
    queryKey: ['friends_of_friends', userConfigParams],
    queryFn: () => userApi.fetchAllFriendsOfFriends(friend_id, userConfigParams),
    enabled: !!friend_id,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000
  })
}

export default useQueryFriendsOfFriends
