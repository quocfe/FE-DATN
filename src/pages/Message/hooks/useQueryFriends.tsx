import { useQuery } from '@tanstack/react-query'
import messageApi from '~/apis/message.api'
import userApi from '~/apis/user.api'
import useConversationStore from '~/store/conversation.store'

export const useQueryFriends = () => {
  return useQuery({
    queryKey: ['friends'],
    queryFn: () => userApi.fetchAllMyFriends()
  })
}
