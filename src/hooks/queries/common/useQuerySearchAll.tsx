import { useQuery } from '@tanstack/react-query'
import commonApi from '~/apis/common.api'

function useQuerySearchAll(query: string) {
  return useQuery({
    queryKey: ['search_all', { query }],
    queryFn: () => commonApi.searchAll(query),
    enabled: !!query
  })
}

export default useQuerySearchAll
