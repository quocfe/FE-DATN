import React from 'react'
import FriendItem from './FriendItem'
import { Link } from 'react-router-dom'
import useQueryListMyFriends from '~/hooks/queries/user/useQueryListMyFriends'

function MyFriends() {
  // React Query
  const { data } = useQueryListMyFriends()

  // Danh sách bạn bè
  const friends = data?.data.data.friends ?? []
  const totalFriends = data?.data.data.total

  return (
    <div className='box p-5 px-6'>
      <div className='items-ce flex justify-between text-black dark:text-white'>
        <div>
          <h3 className='text-lg font-bold'>Bạn bè</h3>
          <span className='mt-0. block text-sm font-normal text-gray-500 dark:text-white'>{totalFriends} Bạn bè</span>
        </div>
        <Link to={'/profile/my_friends'} className='text-sm text-blue-500'>
          Xem tất cả
        </Link>
      </div>
      <div className='mb-2 mt-4 grid grid-cols-3 gap-2 gap-y-5 text-center text-sm'>
        {friends && friends.length !== 0 ? (
          <>
            {friends.slice(0, 6).map((friend) => (
              <FriendItem key={friend.user_id} friend={friend} />
            ))}
          </>
        ) : (
          <div className='col-span-3 mt-2'>Hiện chưa có bạn bè nào</div>
        )}
      </div>
    </div>
  )
}

export default React.memo(MyFriends)
