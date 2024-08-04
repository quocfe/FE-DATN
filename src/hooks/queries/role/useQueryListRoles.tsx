import { useQuery } from '@tanstack/react-query'
import roleApi from '~/apis/role.api'

function useQueryListRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: roleApi.getAllRoles
  })
}

export default useQueryListRoles
