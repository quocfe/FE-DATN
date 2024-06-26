import useQueryUsers from '~/hooks/queries/user/useQueryUsers'
import FriendItem from './components/FriendItem'
import Pagination from '~/components/Pagination'
import useUserConfigParams from '~/hooks/user/useUserConfigParams'
import { ENDPOINT } from '~/constants/endpoint.constant'

function FriendSuggest() {
  // React Query Hooks
  const userConfigParams = useUserConfigParams()
  const { data } = useQueryUsers(userConfigParams)

  // Tổng số trang
  const pages = data?.data.data.pages ?? 1

  // Danh sách gợi ý kết bạn
  const suggestMakeFriends = data?.data.data.users ?? []

  return (
    <>
      <div className='uk-active grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4'>
        {suggestMakeFriends ? (
          suggestMakeFriends?.map((friend) => <FriendItem key={friend.user_id} friend={friend} />)
        ) : (
          <span>Hiện không có lời mời kết bạn nào!</span>
        )}
      </div>
      <Pagination<UserConfigParams> pages={pages} basePath={ENDPOINT.FRIEND_SUGGESTS} configParams={userConfigParams} />
    </>
  )
}

export default FriendSuggest
