import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import { MessageForm } from '~/utils/rules'

function useMutationReportMessage() {
  return useMutation({
    mutationFn: (message_id: string) => messageApi.reportMessage(message_id)
  })
}

export default useMutationReportMessage
