import { useQueryClient } from '@tanstack/react-query'
import useMutationAcceptFriendRequest from '../mutations/user/useMutationAcceptFriendRequest'
import { toast } from 'react-toastify'
import useMutationCancelFriendRequest from '../mutations/user/useMutationCancelFriendRequest'
import useMutationSenderFriendRequest from '../mutations/user/useMutationSenderFriendRequest'

function useManageFriendRequests(
  user_id: string,
  setIsFriendRequested?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient()
  const senderFriendRequestMutation = useMutationSenderFriendRequest()
  const cancelFriendRequestMutation = useMutationCancelFriendRequest()
  const acceptFriendRequestMutation = useMutationAcceptFriendRequest()

  const toggleFriendRequestState = (newState: boolean) => {
    if (setIsFriendRequested) setIsFriendRequested(newState)
  }

  const handleSenderFriendRequest = () => {
    senderFriendRequestMutation.mutate(user_id, {
      onSuccess: () => {
        toast.success('Gửi lời mời kết bạn thành công')
        toggleFriendRequestState(true)
      },
      onError: (error) => {
        toast.error('Đã có lỗi xảy ra')
        console.log(error)
      }
    })
  }

  const handleCancelFriendRequest = () => {
    cancelFriendRequestMutation.mutate(user_id, {
      onSuccess: () => {
        toast.success('Hủy lời mời kết bạn thành công')
        toggleFriendRequestState(false)
      },
      onError: () => {
        toast.error('Đã có lỗi xảy ra!')
      }
    })
  }

  // Chấp nhận lời mời kết bạn
  const handleAcceptFriendRequest = () => {
    acceptFriendRequestMutation.mutate(user_id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['my_friends'] })
        queryClient.invalidateQueries({ queryKey: ['received_friend_requests'] })
        toast.success('Đã chấp nhận lời mời kết bạn')
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  return { handleSenderFriendRequest, handleCancelFriendRequest, handleAcceptFriendRequest }
}

export default useManageFriendRequests
