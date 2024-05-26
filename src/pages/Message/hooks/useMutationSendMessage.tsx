import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import { MessageForm } from '~/utils/rules'

function useMutationSendMessage() {
  return useMutation({
    mutationFn: (data: MessageInput) => messageApi.sendMessage(data)
  })
}

export default useMutationSendMessage
