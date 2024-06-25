import useQueryUsers from '~/hooks/queries/user/useQueryUsers'
import FriendItem from './components/FriendItem'
import useUserConfigParams from './hooks/useUserConfigParams'
import Pagination from '~/components/Pagination'

function FriendSuggest() {
  // React Query Hooks
  const userConfigParams = useUserConfigParams()
  const userQuery = useQueryUsers(userConfigParams)

  // Tổng số trang
  const pages = userQuery.data?.data.data.pages ?? 1

  // Danh sách gợi ý kết bạn
  const suggestMakeFriends = userQuery.data?.data.data.users ?? []

  return (
    <>
      <div className='uk-active grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4'>
        {suggestMakeFriends ? (
          suggestMakeFriends?.map((friend) => <FriendItem key={friend.user_id} friend={friend} />)
        ) : (
          <span>Hiện không có lời mời kết bạn nào!</span>
        )}
      </div>
      <Pagination<UserConfigParams> pages={pages} basePath='/friend/suggests' configParams={userConfigParams} />
    </>
  )
}

export default FriendSuggest
