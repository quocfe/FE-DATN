import { useQuery } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'
import useConversationStore from '~/store/conversation.store'

export const useQueryRecallMessage = () => {
  return useQuery({
    queryKey: ['recallmessage'],
    queryFn: () => messageApi.getRecall()
  })
}
