import useQueryListBlockUsers from '~/hooks/queries/user/useQueryListBlockUsers'
import BlockUserItem from './components/BlockUserItem'

function ListBlocks() {
  const { data } = useQueryListBlockUsers()

  const listBlockUsers = data?.data.data.friends

  const renderListBlockUsers = () => {
    if (listBlockUsers?.length === 0) {
      return <div className='text-center text-gray-700'>Hiện đang không chặn người dùng nào</div>
    } else if (listBlockUsers) {
      return listBlockUsers.map((friend) => <BlockUserItem key={friend.user_id} friend={friend} />)
    }
  }

  return <div className='side-list'>{renderListBlockUsers()}</div>
}

export default ListBlocks
