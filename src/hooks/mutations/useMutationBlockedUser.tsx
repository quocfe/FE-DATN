import { useMutation } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useMutationBlockedUser() {
  return useMutation({
    mutationFn: (user_id: string) => userApi.blockedUser(user_id)
  })
}

export default useMutationBlockedUser
