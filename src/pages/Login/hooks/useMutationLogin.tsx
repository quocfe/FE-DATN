import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import { LoginForm } from '~/utils/rules'

function useMutationLogin() {
  return useMutation({
    mutationFn: (data: LoginForm) => authApi.login(data)
  })
}

export default useMutationLogin
