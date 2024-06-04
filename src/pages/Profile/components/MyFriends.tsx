import useQueryListMyFriends from '../hooks/useQueryListMyFriends'
import FriendItem from './FriendItem'

function MyFriends() {
  // React Query
  const { data } = useQueryListMyFriends()

  const friends = data?.data.data.friends ?? []

  return (
    <div className='box p-5 px-6'>
      <div className='items-ce flex justify-between text-black dark:text-white'>
        <h3 className='text-lg font-bold'>Bạn bè</h3>
        <a href='#' className='text-sm text-blue-500'>
          Tìm bạn
        </a>
      </div>
      <div className='mb-2 mt-4 grid grid-cols-3 gap-2 gap-y-5 text-center text-sm'>
        {friends && friends.length !== 0 ? (
          <>
            {friends.map((friend) => (
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
