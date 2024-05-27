import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import { MessageForm } from '~/utils/rules'

function useMutationUnSendFromOthers() {
  return useMutation({
    mutationFn: (id: string) => messageApi.deleteMessageFromOthers(id)
  })
}

function useMutationUnSendFromMe() {
  return useMutation({
    mutationFn: (id: string) => messageApi.deleteMessageFromMe(id)
  })
}

export { useMutationUnSendFromOthers, useMutationUnSendFromMe }
