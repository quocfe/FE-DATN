import useQueryReceivedFriendRequests from '~/hooks/queries/user/useQueryReceivedFriendRequests'
import FriendItem from './components/FriendItem'
import useUserConfigParams from '~/hooks/user/useUserConfigParams'
import Pagination from '~/components/Pagination'
import { ENDPOINT } from '~/constants/endpoint.constant'

function FriendRequest() {
  // Hooks
  const userConfigParams = useUserConfigParams()

  // React Query Hooks
  const { data } = useQueryReceivedFriendRequests(userConfigParams)

  // danh sách lời mời kết bạn
  const friendRequests = data?.data.data.friends

  const pages = data?.data.data.pages ?? 1

  return (
    <>
      <div className='uk-active grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4'>
        {friendRequests && friendRequests.length !== 0 ? (
          friendRequests?.map((friend) => <FriendItem key={friend.user_id} friend={friend} />)
        ) : (
          <span>Hiện chưa có lời mời kết bạn nào!</span>
        )}
      </div>
      {friendRequests && friendRequests.length !== 0 && (
        <Pagination pages={pages} basePath={ENDPOINT.FRIEND_REQUESTS} configParams={userConfigParams} />
      )}
    </>
  )
}

export default FriendRequest
