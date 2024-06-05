import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import { MessageForm } from '~/utils/rules'

function useMutationReplyMessage() {
  return useMutation({
    mutationFn: (data: ReplyMessageInput) => messageApi.replyMessage(data)
  })
}

export default useMutationReplyMessage
