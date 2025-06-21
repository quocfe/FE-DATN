// hooks/useQueryConversation.ts

import { useInfiniteQuery } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'
import { getProfileFromLocalStorage } from '~/utils/auth'

export const useQueryInfinifyConversation = () => {
  const { user_id } = getProfileFromLocalStorage()

  const fetchConversation = async ({ pageParam }: { pageParam: number }) => {
    const data = await messageApi.getConversation(pageParam, 10)
    return data.data.data.data
  }

  return useInfiniteQuery({
    queryKey: ['conversations', user_id],
    queryFn: fetchConversation,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined
    },
    staleTime: Infinity
  })
}
