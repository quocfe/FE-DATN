import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import userApi from '~/apis/user.api'
import { MessageForm } from '~/utils/rules'

function useMutaionSearchFriendAndGrMsg() {
  return useMutation({
    mutationFn: (query: string) => messageApi.searchfrandgr(query)
  })
}

export default useMutaionSearchFriendAndGrMsg
