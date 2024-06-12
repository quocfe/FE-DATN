import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Dialog from '~/components/Dialog'
import useMutationUnblockedUser from '~/hooks/mutations/user/useMutationUnblockedUser'

interface Props {
  friend: UserCompact
}

function BlockUserItem({ friend }: Props) {
  // Hooks
  const [showDialog, setShowDialog] = useState<boolean>(false)
  // React Query
  const queryClient = useQueryClient()
  const unblockedUserMutation = useMutationUnblockedUser()

  // Hủy chặn người dùng
  const handleUnblockedUser = () => {
    unblockedUserMutation.mutate(friend.user_id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['list_blocks'] })
        toast.success('Hủy chặn người dùng thành công')
        setShowDialog(false)
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  return (
    <>
      <Dialog
        isVisible={showDialog}
        onClose={() => setShowDialog(false)}
        type='warning'
        title={`Chắc chắn hủy chặn ${friend.last_name} ${friend.first_name}!`}
        description='Chức năng hủy chặn người dùng cho phép bạn khôi phục quyền truy cập cho một tài khoản đã bị chặn trước đó, cho phép họ tiếp tục truy cập và tương tác với các dịch vụ của bạn.'
        textBtn='Hủy chặn'
        callback={handleUnblockedUser}
      />
      <div className='side-list-item'>
        <a href='timeline-group.html'>
          <img src={friend.Profile?.profile_picture} alt='' className='side-list-image rounded-full object-cover' />
        </a>
        <div className='flex-1'>
          <a>
            <h4 className='side-list-title'>
              {friend.last_name} {friend.first_name}
            </h4>
          </a>
          <div className='side-list-info text-red-600'> Hiện đang chặn người này </div>
        </div>
        <button
          onClick={() => setShowDialog(true)}
          className='button text-red-600'
          style={{
            backgroundColor: 'rgb(255 236 235)'
          }}
        >
          Bỏ chặn
        </button>
      </div>
    </>
  )
}

export default BlockUserItem
