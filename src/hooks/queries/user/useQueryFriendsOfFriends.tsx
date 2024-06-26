import { useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQueryFriendsOfFriends(friend_id: string) {
  return useQuery({
    queryKey: ['friends_of_friends'],
    queryFn: () => userApi.fetchAllFriendsOfFriends(friend_id),
    enabled: !!friend_id
  })
}

export default useQueryFriendsOfFriends
