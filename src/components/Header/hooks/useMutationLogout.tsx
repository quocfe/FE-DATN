import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import authApi from '~/apis/auth.api'
import useAuthStore from '~/store/auth.store'

function useMutationLogout() {
  const { setIsAuthenticated, setProfile } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.clear()
      toast.success('Đăng xuất thành công!')
    }
  })
}

export default useMutationLogout
