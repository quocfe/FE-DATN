import { useMutation, useQueryClient } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useMutationClearSearchHistories() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.clearSearchHistories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['search_histories'] })
    }
  })
}

export default useMutationClearSearchHistories
