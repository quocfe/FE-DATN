import { useQuery } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'
import useConversationStore from '~/store/conversation.store'

export const useQueryMembers = (group_id: string, type: number | string) => {
  return useQuery({
    queryKey: ['memmbers', group_id],
    queryFn: () => messageApi.getMembersGroup(group_id),
    enabled: type != 1
  })
}
