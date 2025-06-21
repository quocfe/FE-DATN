import { useQuery } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'
import useConversationStore from '~/store/conversation.store'

export const useQueryStatusMessage = (group_id?: string) => {
  const { selectedConversation } = useConversationStore()
  const id = selectedConversation.group_id ? selectedConversation.group_id : group_id
  return useQuery({
    queryKey: ['statusMessage', id],
    queryFn: () => messageApi.statusMessage(id),
    enabled: id != undefined,
    staleTime: Infinity
  })
}
