import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import { MessageForm } from '~/utils/rules'

function useMutationDeleteOrLeaveMember() {
  return useMutation({
    mutationFn: (params: { user_id: string; group_id: string }) =>
      messageApi.leaveAndDeleteMemberGroup(params.group_id, params.user_id)
  })
}

export default useMutationDeleteOrLeaveMember
