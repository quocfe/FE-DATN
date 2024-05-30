import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import useMutationAcceptFriendRequest from '~/hooks/mutations/useMutationAcceptFriendRequest'
import useMutationCancelFriendRequest from '~/hooks/mutations/useMutationCancelFriendRequest'
import useMutationSenderFriendRequest from '~/hooks/mutations/useMutationSenderFriendRequest'

interface Props {
  user: UserCompact
  type: string
}

function FriendItem({ user, type }: Props) {
  // Hooks
  const [isFriendRequested, setIsFriendRequested] = useState<boolean>(false)

  // React Query
  const queryClient = useQueryClient()
  const senderFriendRequestMutation = useMutationSenderFriendRequest()
  const cancelFriendRequestMutation = useMutationCancelFriendRequest()
  const acceptFriendRequestMutation = useMutationAcceptFriendRequest()

  // Gửi lời mời kết bạn
  const handleSenderFriendRequest = (friend_id: string) => () => {
    senderFriendRequestMutation.mutate(friend_id, {
      onSuccess: () => {
        toast.success('Gửi lời mời kết bạn thành công')
        setIsFriendRequested(true)
      },
      onError: (error) => {
        toast.error('Đã có lỗi xảy ra')
        console.log(error)
      }
    })
  }

  // Hủy lời mời kết bạn
  const handleCancelFriendRequest = (friend_id: string) => () => {
    cancelFriendRequestMutation.mutate(friend_id, {
      onSuccess: () => {
        toast.success('Hủy lời mời kết bạn thành công')
        setIsFriendRequested(false)
      },
      onError: () => {
        toast.error('Đã có lỗi xảy ra!')
      }
    })
  }

  // Chấp nhận lời mời kết bạn
  const handleAcceptFriendRequest = (friend_id: string) => () => {
    acceptFriendRequestMutation.mutate(friend_id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['received_friend_requests'] })
        toast.success('Đã chấp nhận lời mời kết bạn')
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  return (
    <div className='side-list-item'>
      <a href='timeline.html'>
        <img src={user.Profile?.profile_picture} alt='' className='side-list-image rounded-full object-cover' />
      </a>
      <div className='flex-1'>
        <Link to={`/profile/${user.user_id}`}>
          <h4 className='side-list-title line-clamp-1'>
            {user.last_name} {user.first_name}
          </h4>
        </Link>
        <div className='side-list-info'> 10 theo dõi </div>
      </div>
      {type === 'sugget' ? (
        <div>
          {isFriendRequested ? (
            <button
              className='button text-red-600'
              onClick={handleCancelFriendRequest(user.user_id)}
              style={{
                backgroundColor: 'rgb(255 236 235)'
              }}
            >
              Hủy lời mời
            </button>
          ) : (
            <button
              className='button bg-primary-soft text-primary dark:text-white'
              onClick={handleSenderFriendRequest(user.user_id)}
            >
              Kết bạn
            </button>
          )}
        </div>
      ) : (
        <div className='flex gap-2'>
          <button
            className='button bg-primary-soft text-primary dark:text-white'
            onClick={handleAcceptFriendRequest(user.user_id)}
          >
            Chấp nhận
          </button>
          <button
            className='button text-red-600'
            style={{
              backgroundColor: 'rgb(255 236 235)'
            }}
          >
            Xóa
          </button>
        </div>
      )}
    </div>
  )
}

export default FriendItem
