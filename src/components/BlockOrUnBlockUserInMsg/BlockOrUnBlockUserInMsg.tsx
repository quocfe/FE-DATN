import React from 'react'
import Dialog from '../Dialog'
import useMutationBlockedUser from '~/hooks/mutations/user/useMutationBlockedUser'
import { toast } from 'react-toastify'
import { useQueryMessage } from '~/pages/Message/hooks/useQueryMessage'
import { useQueryConversation } from '~/pages/Message/hooks/useQueryConversation'
import useMutationUnblockedUser from '~/hooks/mutations/user/useMutationUnblockedUser'
import { useQueryInfinifyConversation } from '~/pages/Message/hooks/useQueryInfinifyConversation'
import { useQueryClient } from '@tanstack/react-query'
import useQueryParams from '~/hooks/useQueryParams'
import { useSocketContext } from '~/context/socket'

interface props {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  user_id: string
  type: 'block' | 'unBlock'
}
function BlockOrUnBlockUserInMsg({ show, setShow, user_id, type }: props) {
  const blockMutation = useMutationBlockedUser()
  const unBlockMutation = useMutationUnblockedUser()
  const { refetch: refetchMessage } = useQueryMessage()
  const { refetch: refetchConversation } = useQueryInfinifyConversation()

  const queryClient = useQueryClient()
  const url = window.location.href
  const checkUrlMesage = url.split('/').includes('message')

  const { socket } = useSocketContext()
  const handleUnBlockOrUnBlockUser = () => {
    type === 'block'
      ? blockMutation.mutate(user_id, {
          onSuccess: () => {
            refetchMessage()
            refetchConversation()
            if (!checkUrlMesage) {
              queryClient.invalidateQueries({ queryKey: ['messageFix'] })
            }
            socket?.emit('blockMsg', user_id)
            setShow(false)
          },
          onError: () => toast.error('Chặn người dùng thất bại')
        })
      : unBlockMutation.mutate(user_id, {
          onSuccess: () => {
            setShow(false)
            refetchMessage()
            refetchConversation()
            if (!checkUrlMesage) {
              queryClient.invalidateQueries({ queryKey: ['messageFix'] })
            }
            socket?.emit('blockMsg', user_id)
          },
          onError: (error) => {
            toast.error(error.message)
          }
        })
  }
  const description =
    type === 'block'
      ? 'Nếu là bạn bè sẽ bị hủy kết bạn, bạn sẽ không thể nhận hoặc gửi tin nhắn tới tài khoản này!'
      : 'Tài khoản DevBook của bạn sẽ bắt đầu nhận được tin nhắn hoặc cuộc gọi từ tài khoản này'
  const title = type === 'block' ? 'Chặn người dùng' : 'Bỏ chặn'
  const textBtn = type === 'block' ? 'Chặn' : 'Bỏ chặn'
  return (
    <Dialog
      isVisible={show}
      onClose={() => setShow(false)}
      type='warning'
      title={title}
      description={description}
      textBtn={textBtn}
      callback={() => handleUnBlockOrUnBlockUser()}
    />
  )
}

export default BlockOrUnBlockUserInMsg
