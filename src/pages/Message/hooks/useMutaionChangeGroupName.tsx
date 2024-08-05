import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import { MessageForm } from '~/utils/rules'

function useMutationChangeGroupName() {
  return useMutation({
    mutationFn: (data: ChangeNameGroupInput) => messageApi.changeGroupName(data)
  })
}

export default useMutationChangeGroupName
