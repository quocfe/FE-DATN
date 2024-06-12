import { useMutation } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useMutationAcceptFriendRequest() {
  return useMutation({
    mutationFn: (friend_id: string) => userApi.acceptFriendRequest(friend_id)
  })
}

export default useMutationAcceptFriendRequest
