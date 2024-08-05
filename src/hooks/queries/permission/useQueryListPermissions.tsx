import { useQuery } from '@tanstack/react-query'
import permissionApi from '~/apis/permission.api'

function useQueryListPermissions() {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: permissionApi.getAllPermissions
  })
}

export default useQueryListPermissions
