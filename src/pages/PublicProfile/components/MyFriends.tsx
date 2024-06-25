import { useParams } from 'react-router-dom'
import useQueryFriendsOfFriends from '~/hooks/queries/user/useQueryFriendsOfFriends'
import FriendItem from './FriendItem'
import { useEffect } from 'react'

function MyFriends() {
  // Hooks
  const { user_id } = useParams()
  const { data, refetch } = useQueryFriendsOfFriends(user_id ?? '')

  useEffect(() => {
    if (user_id) {
      refetch()
    }
  }, [user_id, refetch])

  // Danh sách bạn bè của bạn bè
  const friends = data?.data.data.friends ?? []

  return (
    <div className='box p-5 px-6'>
      <div className='items-ce flex justify-between text-black dark:text-white'>
        <div>
          <h3 className='text-lg font-bold'>Bạn bè</h3>
          <span className='mt-0. block text-sm font-normal text-gray-500 dark:text-white'>{friends.length} Bạn bè</span>
        </div>
        <a href='#' className='text-sm text-blue-500'>
          Xem tất cả
        </a>
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

export default MyFriends
