import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import { MessageForm } from '~/utils/rules'

function useMutationReCallMessage() {
  return useMutation({
    mutationFn: (body: ReCallMessageInput) => messageApi.recallMessage(body)
  })
}

export default useMutationReCallMessage
