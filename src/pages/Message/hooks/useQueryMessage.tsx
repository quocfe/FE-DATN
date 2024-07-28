import { keepPreviousData, useQuery } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'
import useConversationStore from '~/store/conversation.store'

export const useQueryMessage = (page?: number, limit?: number) => {
  const { selectedConversation } = useConversationStore()

  if (selectedConversation.type === 1) {
    return useQuery({
      queryKey: ['message', selectedConversation.id],
      queryFn: () =>
        page && limit
          ? messageApi.getOneToOneMessage(selectedConversation.id, page, limit)
          : messageApi.getOneToOneMessage(selectedConversation.id),
      enabled: selectedConversation.id != null,
      staleTime: Infinity
    })
  } else {
    return useQuery({
      queryKey: ['message', selectedConversation.id],
      queryFn: () =>
        page && limit
          ? messageApi.getGroupMessage(selectedConversation.id, 1, 30)
          : messageApi.getGroupMessage(selectedConversation.id),
      enabled: selectedConversation.id != null,
      staleTime: Infinity
    })
  }
}
