import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import messageApi from '~/apis/message.api'
import useConversationStore from '~/store/conversation.store'

export const useQueryConversation = () => {
  return useQuery({
    queryKey: ['conversation '],
    queryFn: () => messageApi.getConversation(),
    staleTime: 5 * 60 * 1000
  })
}
