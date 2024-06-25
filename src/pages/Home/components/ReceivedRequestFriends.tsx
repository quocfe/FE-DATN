import React from 'react'
import useQueryReceivedFriendRequests from '~/hooks/queries/user/useQueryReceivedFriendRequests'
import FriendItem from './FriendItem'
import { Link } from 'react-router-dom'
import useUserConfigParams from '~/hooks/user/useUserConfigParams'

function ReceivedRequestFriends() {
  // Hooks
  const userConfigParams = useUserConfigParams()

  // React Query Hooks
  const receivedFriendRequestQuery = useQueryReceivedFriendRequests(userConfigParams)

  // danh sách lời mời kết bạn
  const friendRequests = receivedFriendRequestQuery.data?.data.data.friends

  return (
    <div className='box p-5 px-6'>
      <div className='flex items-baseline justify-between text-black dark:text-white'>
        <h3 className='text-base font-bold'> Lời mời kết bạn </h3>
        <Link to={'/friend/requests'} className='text-sm text-blue-500'>
          Xem tất cả
        </Link>
      </div>
      <div className='side-list'>
        {friendRequests && friendRequests.length !== 0 ? (
          friendRequests.slice(0, 4).map((friend) => <FriendItem type='request' user={friend} key={friend.user_id} />)
        ) : (
          <div className='mt-2 text-center text-sm'>Hiện không có lời mời nào</div>
        )}
        <button className='button mt-2 hidden w-full bg-secondery'>Xem tất cả</button>
      </div>
    </div>
  )
}

export default ReceivedRequestFriends
