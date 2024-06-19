import { useQuery } from '@tanstack/react-query'
import notifyMessageApi from '~/apis/notifyMessage.api'
import userApi from '~/apis/user.api'

function useQueryNotifyMessage() {
  return useQuery({
    queryKey: ['notify_message'],
    queryFn: () => notifyMessageApi.getAllNotify()
  })
}

export default useQueryNotifyMessage
