import useQueryReceivedFriendRequests from '~/hooks/queries/user/useQueryReceivedFriendRequests'
import FriendItem from './components/FriendItem'

function FriendRequest() {
  // React Query Hooks
  const receivedFriendRequestQuery = useQueryReceivedFriendRequests()

  // danh sách lời mời kết bạn
  const friendRequests = receivedFriendRequestQuery.data?.data.data.friends

  return (
    <div className='uk-active grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4'>
      {friendRequests ? (
        friendRequests?.map((friend) => <FriendItem key={friend.user_id} friend={friend} />)
      ) : (
        <span>Hiện chưa có lời mời kết bạn nào!</span>
      )}
    </div>
  )
}

export default FriendRequest
