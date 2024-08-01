import { useMutation } from '@tanstack/react-query'
import roleApi from '~/apis/role.api'

function useMutationAddNewRole() {
  return useMutation({
    mutationFn: (role: { name: string; description: string }) => roleApi.addNewRole(role)
  })
}

export default useMutationAddNewRole
