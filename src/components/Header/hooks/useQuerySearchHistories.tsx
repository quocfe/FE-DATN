import { useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'

function useQuerySearchHistories(enabled: boolean) {
  return useQuery({
    queryKey: ['search_histories'],
    queryFn: userApi.fetchAllSearchHistories,
    staleTime: 15 * 60 * 1000,
    enabled
  })
}

export default useQuerySearchHistories
