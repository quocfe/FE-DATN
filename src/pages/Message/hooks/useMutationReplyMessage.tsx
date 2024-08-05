import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import useMessageStore from '~/store/message.store'
import { MessageForm } from '~/utils/rules'

function useMutationReplyMessage() {
  const { setLoadingMessage, setErrorMessage } = useMessageStore()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ReplyMessageInput) => messageApi.replyMessage(data),
    onMutate: () => {
      setLoadingMessage(true)
      setErrorMessage(false)
    },
    onSuccess: () => {
      setLoadingMessage(false)
      setErrorMessage(false)
      queryClient.invalidateQueries({ queryKey: ['messageInfinity'] })
    },
    onError: () => {
      setErrorMessage(true)
      setLoadingMessage(false)
    }
  })
}

export default useMutationReplyMessage
