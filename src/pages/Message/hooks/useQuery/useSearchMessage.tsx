import { useMutation } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'

function useMutationSearchMessage() {
  return useMutation({
    mutationFn: async (args: { query: string; conversationId: string }) => {
      const { query, conversationId } = args
      return await messageApi.searchMessage(query, conversationId)
    }
  })
}

export default useMutationSearchMessage
