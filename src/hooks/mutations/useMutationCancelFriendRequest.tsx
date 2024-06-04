import { useMutation } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useMutationCancelFriendRequest() {
  return useMutation({
    mutationFn: (friend_id: string) => userApi.cancelFriendRequest(friend_id)
  })
}

export default useMutationCancelFriendRequest
