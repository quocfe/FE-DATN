import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import { MessageForm } from '~/utils/rules'

function useMutationSendReactMessage() {
  return useMutation({
    mutationFn: (data: ReactMessageInput) => messageApi.sendReactMessage(data)
  })
}

export default useMutationSendReactMessage
