import { useMutation } from '@tanstack/react-query'
import notifyMessageApi from '~/apis/notifyMessage.api'
import userApi from '~/apis/user.api'

function useMutationDeleteNotify() {
  return useMutation({
    mutationFn: (id: string) => notifyMessageApi.deleteNotify(id)
  })
}

export default useMutationDeleteNotify
