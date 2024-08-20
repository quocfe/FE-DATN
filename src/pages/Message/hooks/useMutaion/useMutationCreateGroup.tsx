import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import { MessageForm } from '~/utils/rules'

function useMutationCreateMessage() {
  return useMutation({
    mutationFn: (data: CreateGroupMessageInput) => messageApi.createGroup(data)
  })
}

export default useMutationCreateMessage
