import { useQuery } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'
import useConversationStore from '~/store/conversation.store'

export const useQueryMessage = () => {
  const { selectedConversation } = useConversationStore()
  return useQuery({
    queryKey: ['message', selectedConversation?.group_message_id],
    queryFn: () => messageApi.getMessage(selectedConversation ? selectedConversation.group_message_id : ''),
    enabled: selectedConversation?.group_message_id != null
  })
}
