import useQuerySendFriendRequests from '~/hooks/queries/user/useQuerySendFriendRequests'
import FriendItem from './components/FriendItem'
import useUserConfigParams from '~/hooks/user/useUserConfigParams'
import Pagination from '~/components/Pagination'
import { ENDPOINT } from '~/constants/endpoint.constant'

function SentFriendRequests() {
  // Hooks
  const userConfigParams = useUserConfigParams()

  // React Query Hooks
  const { data } = useQuerySendFriendRequests(userConfigParams)

  // Danh sách lời mời kết bạn đã gửi
  const sentFriendRequest = data?.data.data.friends

  const pages = data?.data.data.pages ?? 1

  return (
    <>
      <div className='uk-active grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4'>
        {sentFriendRequest && sentFriendRequest.length !== 0 ? (
          sentFriendRequest?.map((friend) => <FriendItem key={friend.user_id} friend={friend} />)
        ) : (
          <span>Hiện chưa có gửi mời kết bạn nào!</span>
        )}
      </div>
      {sentFriendRequest && sentFriendRequest.length !== 0 && (
        <Pagination pages={pages} basePath={ENDPOINT.FRIEND_SENT_REQUESTS} configParams={userConfigParams} />
      )}
    </>
  )
}

export default SentFriendRequests
