import { useMutation } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useMutationSenderFriendRequest() {
  return useMutation({
    mutationFn: (friend_id: string) => userApi.senderFriendRequest(friend_id)
  })
}

export default useMutationSenderFriendRequest
