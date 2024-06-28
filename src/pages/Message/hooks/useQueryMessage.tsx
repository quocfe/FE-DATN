import { keepPreviousData, useQuery } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'
import useConversationStore from '~/store/conversation.store'

export const useQueryMessage = () => {
  const { selectedConversation } = useConversationStore()
  if (selectedConversation.type === 1) {
    return useQuery({
      queryKey: ['message', selectedConversation.id],
      queryFn: () => messageApi.getOneToOneMessage(selectedConversation.id),
      enabled: selectedConversation.id != null,
      staleTime: Infinity
    })
  } else {
    return useQuery({
      queryKey: ['message', selectedConversation.id],
      queryFn: () => messageApi.getGroupMessage(selectedConversation.id),
      enabled: selectedConversation.id != null,
      staleTime: Infinity
    })
  }
}
