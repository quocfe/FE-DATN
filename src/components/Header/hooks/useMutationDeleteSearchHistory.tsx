import { useMutation } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useMutationDeleteSearchHistory() {
  return useMutation({
    mutationFn: (target_id: string) => userApi.deleteSearchHistory(target_id)
  })
}

export default useMutationDeleteSearchHistory
