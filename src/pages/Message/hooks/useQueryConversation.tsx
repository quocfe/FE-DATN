import { useQuery } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'
import useAuthStore from '~/store/auth.store'

interface QueryConversationParams {
  page?: number | string
  limit?: number | string
}

export const useQueryConversation = ({ page, limit }: QueryConversationParams = {}) => {
  const { profile } = useAuthStore()
  if (page || limit) {
    return useQuery({
      queryKey: ['conversation', profile?.user_id, page, limit],
      queryFn: () => messageApi.getConversation(page),
      enabled: profile?.user_id != null
    })
  } else {
    return useQuery({
      queryKey: ['conversation', profile?.user_id],
      queryFn: () => messageApi.getConversation(),
      enabled: profile?.user_id != null
    })
  }
}
