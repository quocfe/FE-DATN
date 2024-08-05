import { useQuery } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'
import userApi from '~/apis/user.api'
import useConversationStore from '~/store/conversation.store'

export const useQueryFriendSuggestGm = (group_id: string) => {
  return useQuery({
    queryKey: ['friendSuggest'],
    queryFn: () => messageApi.getFriendSuggestInGroupMsg(group_id)
  })
}
