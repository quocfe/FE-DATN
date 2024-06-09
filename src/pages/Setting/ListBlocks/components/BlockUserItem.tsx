import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Modal from '~/components/Modal'
import useMutationUnblockedUser from '~/hooks/mutations/user/useMutationUnblockedUser'

interface Props {
  friend: UserCompact
}

function BlockUserItem({ friend }: Props) {
  // Hooks
  const [showModal, setShowModal] = useState<boolean>(false)
  // React Query
  const queryClient = useQueryClient()
  const unblockedUserMutation = useMutationUnblockedUser()

  const handleUnblockedUser = () => {
    unblockedUserMutation.mutate(friend.user_id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['list_blocks'] })
        toast.success('Hủy chặn người dùng thành công')
        setShowModal(false)
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  return (
    <>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} width='500px'>
        <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
          <div className='sm:flex sm:items-start'>
            <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
              <svg
                className='h-6 w-6 text-red-600'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                />
              </svg>
            </div>
            <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
              <h3 className='text-base font-semibold leading-6 text-gray-900' id='modal-title'>
                Deactivate account
              </h3>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  Are you sure you want to deactivate your account? All of your data will be permanently removed. This
                  action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
          <button
            onClick={handleUnblockedUser}
            type='button'
            className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
          >
            Hủy chặn
          </button>
          <button
            onClick={() => setShowModal(false)}
            type='button'
            className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
          >
            Quay lại
          </button>
        </div>
      </Modal>
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
          onClick={() => setShowModal(true)}
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
