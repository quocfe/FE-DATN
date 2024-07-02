import { useMutation } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useMutationUnblockedUser() {
  return useMutation({
    mutationFn: (user_id: string) => userApi.unblockedUser(user_id)
  })
}

export default useMutationUnblockedUser
