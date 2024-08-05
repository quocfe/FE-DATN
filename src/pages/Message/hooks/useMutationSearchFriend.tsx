import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import userApi from '~/apis/user.api'
import { MessageForm } from '~/utils/rules'

function useMutaionSearchFriend() {
  return useMutation({
    mutationFn: (data: string) => userApi.searchFriends(data)
  })
}

export default useMutaionSearchFriend
