import useQuerySendFriendRequests from '~/hooks/queries/user/useQuerySendFriendRequests'
import FriendItem from './components/FriendItem'

function SentFriendRequests() {
  // React Query Hooks
  const { data } = useQuerySendFriendRequests()

  // Danh sách lời mời kết bạn đã gửi
  const sentFriendRequest = data?.data.data.friends

  return (
    <div className='uk-active grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4'>
      {sentFriendRequest ? (
        sentFriendRequest?.map((friend) => <FriendItem key={friend.user_id} friend={friend} />)
      ) : (
        <span>Hiện chưa có gửi mời kết bạn nào!</span>
      )}
    </div>
  )
}

export default SentFriendRequests
