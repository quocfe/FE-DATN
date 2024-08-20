import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import { MessageForm } from '~/utils/rules'

function useMutationDeleteMessage() {
  return useMutation({
    mutationFn: (id: string) => messageApi.deleteConversation(id)
  })
}

export default useMutationDeleteMessage
