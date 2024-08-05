import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ENDPOINT } from '~/constants/endpoint.constant'
import useManageFriendRequests from '~/hooks/user/useManageFriendRequests'

interface Props {
  friend: UserCompact
}

function FriendItem({ friend }: Props) {
  const [isFriendRequested, setIsFriendRequested] = useState<boolean>(true)
  const { handleSenderFriendRequest, handleCancelFriendRequest } = useManageFriendRequests(
    friend.user_id,
    setIsFriendRequested
  )

  const commonFriends = friend.CommonFriends

  return (
    <div className='card'>
      <a href='timeline-group.html'>
        <div className='card-media h-24'>
          <img src={friend.Profile?.cover_photo} className='w-full object-cover' alt='cover_photo' />
          <div className='card-overly' />
        </div>
      </a>
      <div className='card-body relative z-10'>
        <img
          src={friend.Profile?.profile_picture}
          alt='profile_picture'
          className='relative -mt-8 mb-2 h-11 w-11 rounded-full border-2 border-white object-cover shadow dark:border-slate-800'
        />
        <Link to={`/profile/${friend.user_id}`}>
          <h4 className='card-title'>
            {' '}
            {friend.last_name} {friend.first_name}{' '}
          </h4>
        </Link>
        {commonFriends.length !== 0 ? (
          <div className='mt-2 flex items-center'>
            {commonFriends.slice(0, 2).map((user) => {
              return (
                <Link to={`${ENDPOINT.PROFILE}/${user.user_id}`} className='-mr-2 h-6 w-6'>
                  <img
                    src={user.Profile?.profile_picture}
                    className='h-full w-full rounded-full border-2 border-gray-200'
                    alt=''
                  />
                </Link>
              )
            })}
            <div className='ml-2 text-sm text-gray-500'> {commonFriends.length} bạn chung</div>
          </div>
        ) : (
          <div className='mt-2 flex h-[24px] items-center'>
            <p className='text-sm'>Không có bạn chung</p>
          </div>
        )}
        <div className='flex gap-2'>
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
            <button className='button flex-1 bg-primary text-white' onClick={handleSenderFriendRequest}>
              Thêm bạn bè
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FriendItem
