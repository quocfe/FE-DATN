import { useState } from 'react'
import { Link } from 'react-router-dom'
import useManageFriendRequests from '~/hooks/user/useManageFriendRequests'

interface Props {
  user: UserCompact
  type: string
}

function FriendItem({ user, type }: Props) {
  // Hooks
  const [isFriendRequested, setIsFriendRequested] = useState<boolean>(false)

  // React Query Hooks
  const { handleSenderFriendRequest, handleCancelFriendRequest, handleAcceptFriendRequest } = useManageFriendRequests(
    user.user_id,
    setIsFriendRequested
  )

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
              onClick={handleCancelFriendRequest}
              style={{
                backgroundColor: 'rgb(255 236 235)'
              }}
            >
              Hủy lời mời
            </button>
          ) : (
            <button className='button bg-primary-soft text-primary dark:text-white' onClick={handleSenderFriendRequest}>
              Thêm bạn bè
            </button>
          )}
        </div>
      ) : (
        <div className='flex gap-2'>
          <button className='button bg-primary-soft text-primary dark:text-white' onClick={handleAcceptFriendRequest}>
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
