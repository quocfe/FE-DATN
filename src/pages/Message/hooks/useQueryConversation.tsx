import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import messageApi from '~/apis/message.api'
import useAuthStore from '~/store/auth.store'
import useConversationStore from '~/store/conversation.store'
import { getProfileFromLocalStorage } from '~/utils/auth'

export const useQueryConversation = () => {
  const { profile } = useAuthStore()
  return useQuery({
    queryKey: ['conversation', profile?.user_id],
    queryFn: () => messageApi.getConversation()
  })
}
