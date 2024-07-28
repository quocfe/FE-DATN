import { useQuery } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'
import useConversationStore from '~/store/conversation.store'

export const useQueryStatusMessage = () => {
  const { selectedConversation } = useConversationStore()

  return useQuery({
    queryKey: ['statusMessage', selectedConversation.group_id],
    queryFn: () => messageApi.statusMessage(selectedConversation.group_id),
    enabled: selectedConversation.group_id != undefined
  })
}
