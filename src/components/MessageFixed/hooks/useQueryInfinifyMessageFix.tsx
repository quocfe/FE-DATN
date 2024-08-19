// hooks/useQueryConversation.ts

import { useInfiniteQuery } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'
import { MessageFix } from '~/store/messageFix.store'

export const useQueryInfinifyMessageFix = (message_fix: MessageFix) => {
  const idQuery = message_fix.type === 1 ? message_fix.id : message_fix.group_id

  const fetchMessage = async ({ pageParam }: { pageParam: number }) => {
    if (message_fix.type === 1) {
      const data = await messageApi.getOneToOneMessage(message_fix.id, pageParam, 20)
      return data.data.data.messages
    } else if (message_fix.type === 2) {
      const data = await messageApi.getGroupMessage(message_fix.group_id, pageParam, 20)
      return data.data.data.messages
    }
  }

  return useInfiniteQuery({
    queryKey: ['messageFixInfinity', idQuery],
    queryFn: fetchMessage,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.length === 20) {
        return allPages.length + 1
      } else {
        return undefined
      }
    },
    enabled: message_fix.group_id != null || message_fix.id != null
  })
}
