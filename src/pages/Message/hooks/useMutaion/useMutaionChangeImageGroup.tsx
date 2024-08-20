import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import messageApi from '~/apis/message.api'
import { MessageForm } from '~/utils/rules'

function useMutationChangeImageGroup() {
  return useMutation({
    mutationFn: (data: ChangeImageInput) => messageApi.changeImageGroup(data)
  })
}

export default useMutationChangeImageGroup
