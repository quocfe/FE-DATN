import { useMutation } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useMutationCreateSearchHistory() {
  return useMutation({
    mutationFn: (data: CreateSearchHistory) => userApi.addNewSearchHistory(data)
  })
}

export default useMutationCreateSearchHistory
