// hooks/useQueryConversation.ts

import { useInfiniteQuery } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'
import useConversationStore from '~/store/conversation.store'
import { getProfileFromLocalStorage } from '~/utils/auth'

export const useQueryInfinifyMessage = () => {
  const { selectedConversation } = useConversationStore()
  const fetchMessage = async ({ pageParam }: { pageParam: number }) => {
    if (selectedConversation.type === 1) {
      const data = await messageApi.getOneToOneMessage(selectedConversation.id, pageParam, 20)
      return data.data.data.messages
    } else if (selectedConversation.type === 2) {
      const data = await messageApi.getGroupMessage(selectedConversation.id, pageParam, 20)
      return data.data.data.messages
    }
  }

  return useInfiniteQuery({
    queryKey: ['messageInfinity', selectedConversation.id],
    queryFn: fetchMessage,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.length === 20) {
        return allPages.length + 1
      } else {
        return undefined
      }
    },
    enabled: selectedConversation.id != null
  })
}
