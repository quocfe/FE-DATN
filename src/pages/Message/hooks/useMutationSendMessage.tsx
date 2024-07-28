import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import useMessageStore from '~/store/message.store'
import { MessageForm } from '~/utils/rules'

function useMutationSendMessage() {
  const { setLoadingMessage, setErrorMessage } = useMessageStore()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: MessageInput) => messageApi.sendMessage(data),
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

function useMutationSendMessageAttach() {
  const { setLoadingMessage, setErrorMessage } = useMessageStore()
  return useMutation({
    mutationFn: (data: MessageMediaInput) => messageApi.sendMessageAttach(data),
    onMutate: () => {
      setLoadingMessage(true)
      setErrorMessage(false)
    },
    onSuccess: () => {
      setLoadingMessage(false)
      setErrorMessage(false)
    },
    onError: () => {
      setErrorMessage(true)
      setLoadingMessage(false)
    }
  })
}

function useMutationSendCallMessage() {
  return useMutation({
    mutationFn: (data: MessageInput) => messageApi.sendCallMessage(data)
  })
}

export { useMutationSendMessage, useMutationSendMessageAttach, useMutationSendCallMessage }
