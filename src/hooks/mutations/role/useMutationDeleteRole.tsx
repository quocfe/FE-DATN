import { useMutation } from '@tanstack/react-query'
import roleApi from '~/apis/role.api'

function useMutationDeleteRole() {
  return useMutation({
    mutationFn: (role_id: string) => roleApi.deleteRole(role_id)
  })
}
export default useMutationDeleteRole
