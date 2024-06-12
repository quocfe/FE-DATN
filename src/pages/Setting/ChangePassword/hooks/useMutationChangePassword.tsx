import { useMutation } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useMutationChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePassword) => userApi.changePassword(data)
  })
}

export default useMutationChangePassword
