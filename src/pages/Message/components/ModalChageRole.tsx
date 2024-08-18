import { IonIcon } from '@ionic/react'
import _ from 'lodash'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import CustomFileInput from '~/components/InputFile/CustomFileInput'
import Modal from '~/components/Modal'
import useMutationCreateMessage from '../hooks/useMutaion/useMutationCreateGroup'
import { useQueryConversation } from '../hooks/useQueryConversation'
import useFileUpload from '../utils/uploadApi'
import Friend from './Friend'
import Spinner from './Skelaton/Spinner'
import useMutaionChangeRoleGroup from '../hooks/useMutaion/useMutaionChangeRoleGroup'
import useConversationStore from '~/store/conversation.store'
import Dialog from '~/components/Dialog'
import useMutationDeleteOrLeaveMember from '../hooks/useMutaion/useMutationDeleteOrLeaveMember'
import { useQueryMembers } from '../hooks/useQueryMembers'
import { getProfileFromLocalStorage } from '~/utils/auth'

const ModalChageRole = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [listUser, setListUser] = useState<string[]>([])
  const [showDiaLogComfirm, setShowDiaLogComfirm] = useState<boolean>(false)
  const [querySearch, setQuerySearch] = useState<string>('')
  const chageRoleGroup = useMutaionChangeRoleGroup()
  const { selectedConversation, setSelectedConversation } = useConversationStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const deleteOrLeaveMember = useMutationDeleteOrLeaveMember()
  const { refetch: refetchMembers } = useQueryMembers(selectedConversation.group_id, 2)
  const { user_id: userLoggin } = getProfileFromLocalStorage()

  const handleChangeRole = async () => {
    const data: { group_id: string; user_id: string } = {
      group_id: selectedConversation.group_id,
      user_id: listUser.toString()
    }

    chageRoleGroup.mutate(data, {
      onSuccess: () => {
        onClose()
        setIsLoading(false)
        setShowDiaLogComfirm(true)
      },
      onError: () => {
        toast.error('')
        setShowDiaLogComfirm(false)
      }
    })
  }

  const confirmOutGroup = () => {
    const dataDelete: { group_id: string; user_id: string } = {
      group_id: selectedConversation.group_id,
      user_id: userLoggin
    }
    deleteOrLeaveMember.mutate(dataDelete, {
      onSuccess: () => {
        setShowDiaLogComfirm(false)
        refetchMembers()
        setSelectedConversation({})
      },
      onError: () => {
        toast.error('Có lỗi rồi. liên hệ admin')
      }
    })
  }

  return (
    <>
      <Modal isVisible={isOpen} onClose={onClose} height='3/4'>
        <div className='flex h-full flex-col justify-evenly '>
          <div className='flex-1'>
            <div className='p-6'>
              <h2 className='text-xl font-semibold'>Chọn trưởng nhóm mới trước khi rời</h2>
            </div>
            <div className='p-6 py-0'>
              <div className='relative '>
                <div className='absolute bottom-1/2 left-3 flex translate-y-1/2'>
                  <IonIcon icon='search' className='md hydrated text-xl' role='img' aria-label='search' />
                </div>
                <input
                  onChange={_.debounce((e) => setQuerySearch(e.target.value), 500)}
                  type='text'
                  placeholder='Tìm kiếm ...'
                  className='w-full !rounded-lg !py-2 !pl-10'
                />
              </div>
              <Friend listUser={listUser} setListUser={setListUser} querySearch={querySearch} type='changeRole' />
            </div>
          </div>
          <div className='flex justify-end p-6 text-sm font-medium'>
            <button onClick={onClose} className='uk-modal-close rounded-md px-4 py-1.5' type='button'>
              Hủy
            </button>
            {listUser.length < 1 ? (
              <button className='cursor-not-allowed rounded-md bg-gray-400 px-5 py-1.5 text-white' type='button'>
                Chuyển và tiếp tục
              </button>
            ) : isLoading ? (
              <button className='uk-modal-close  rounded-md bg-primary px-5 py-1.5 text-white' type='button'>
                <Spinner />
              </button>
            ) : (
              <button
                onClick={handleChangeRole}
                className='uk-modal-close  rounded-md bg-primary px-5 py-1.5 text-white'
                type='button'
              >
                Chuyển và tiếp tục
              </button>
            )}
          </div>
        </div>
      </Modal>
      <Dialog
        isVisible={showDiaLogComfirm}
        onClose={() => {
          setShowDiaLogComfirm(false), refetchMembers()
        }}
        type='warning'
        title='Xác nhận'
        description='Bạn sẽ không thể xem lại tin nhắn sau khi rời nhóm!'
        textBtn='Rời nhóm'
        callback={() => confirmOutGroup()}
      />
    </>
  )
}

export default ModalChageRole
