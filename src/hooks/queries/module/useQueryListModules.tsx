import { useQuery } from '@tanstack/react-query'
import moduleApi from '~/apis/module.api'

function useQueryListModules() {
  return useQuery({
    queryKey: ['modules'],
    queryFn: moduleApi.getAllModules
  })
}

export default useQueryListModules
