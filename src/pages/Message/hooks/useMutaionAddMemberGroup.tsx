import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import { MessageForm } from '~/utils/rules'

function useMutaionAddMemberGroup() {
  return useMutation({
    mutationFn: (data: AddMemberGroupInput) => messageApi.addMembersToGroup(data)
  })
}

export default useMutaionAddMemberGroup
