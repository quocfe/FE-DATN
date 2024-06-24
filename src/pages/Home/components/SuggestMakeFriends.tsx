import useQueryUsers from '~/hooks/queries/user/useQueryUsers'
import FriendItem from './FriendItem'
import { Link } from 'react-router-dom'

function SuggestMakeFriends() {
  // React Query Hooks
  const userQuery = useQueryUsers()

  // Danh sách gợi ý kết bạn
  const suggestMakeFriends = userQuery.data?.data.data.users

  return (
    <div className='box p-5 px-6'>
      <div className='flex items-baseline justify-between text-black dark:text-white'>
        <h3 className='text-base font-bold'> Gợi ý kết bạn </h3>
        <Link to={'/friend/suggests'} className='text-sm text-blue-500'>
          Xem tất cả
        </Link>
      </div>
      <div className='side-list'>
        {suggestMakeFriends &&
          suggestMakeFriends.slice(0, 4).map((user) => <FriendItem type='sugget' user={user} key={user.user_id} />)}
        <button className='button mt-2 hidden w-full bg-secondery'>Xem tất cả</button>
      </div>
    </div>
  )
}

export default SuggestMakeFriends
