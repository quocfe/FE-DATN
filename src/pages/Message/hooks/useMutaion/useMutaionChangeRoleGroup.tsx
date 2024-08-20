import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import { MessageForm } from '~/utils/rules'

function useMutaionChangeRoleGroup() {
  return useMutation({
    mutationFn: (data: ChangeRoleGroupInput) => messageApi.changerolegroup(data)
  })
}

export default useMutaionChangeRoleGroup
