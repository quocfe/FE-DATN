import { useQuery } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'
import useConversationStore from '~/store/conversation.store'

export const useQueryMembers = () => {
  const { selectedConversation } = useConversationStore()
  const id = selectedConversation.type === 2 ? selectedConversation.id : null

  return useQuery({
    queryKey: ['memmbers', id],
    queryFn: () => messageApi.getMembersGroup(id),
    enabled: id != null
  })
}
