import { IonIcon } from '@ionic/react'
import _ from 'lodash'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import CustomFileInput from '~/components/InputFile/CustomFileInput'
import Modal from '~/components/Modal'
import useMutationCreateMessage from '../hooks/useMutationCreateGroup'
import { useQueryConversation } from '../hooks/useQueryConversation'
import useFileUpload from '../utils/uploadApi'
import Friend from './Friend'
import Spinner from './Skelaton/Spinner'
import useConversationStore from '~/store/conversation.store'
import useMutaionAddMemberGroup from '../hooks/useMutaionAddMemberGroup'

const ModalAddMember = ({ isOpen, onClose }: any) => {
  const [listMember, setListMember] = useState<any[]>([])
  const { selectedConversation } = useConversationStore()
  const [querySearch, setQuerySearch] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const addMemberMutation = useMutaionAddMemberGroup()

  const listID = listMember.map((member) => member.user_id)
  const handleAdd = async () => {
    const data = {
      list_user: JSON.stringify(listID),
      group_message_id: selectedConversation.group_id
    }
    addMemberMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Thêm thành công')
        onClose()
      },
      onError: (error) => {
        toast.error('Đã có l~~~i xảy ra!')
        console.log('error', error)
      }
    })

    console.log('data add', data)
    console.log(selectedConversation)
  }

  return (
    <Modal isVisible={isOpen} onClose={onClose} height='3/4'>
      <div className='flex h-full flex-col justify-evenly '>
        <div className='flex-1'>
          <div className='p-6'>
            <h2 className='text-xl font-semibold'>Thêm người</h2>
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
            <div className='mt-4 flex h-[80px] w-full flex-row items-center justify-start gap-2  border-t p-2'>
              {listMember.map((member, index) => (
                <div key={index} className='flex flex-col items-center gap-1'>
                  <div className='relative'>
                    <img
                      src={member.Profile.profile_picture}
                      className='h-7 w-7 shrink-0 rounded-full shadow sm:h-9 sm:w-9'
                    />
                    <div className='absolute -right-1 top-0 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-slate-600 shadow-sm'>
                      <IonIcon icon='close' className='text-white ' />
                    </div>
                  </div>
                  <p className='text-[10px] text-gray-500'>
                    {member.first_name} {member.last_name}
                  </p>
                </div>
              ))}
              {listMember.length == 0 && (
                <p className='w-full text-center text-[12px] text-gray-600'>Chưa chọn người dùng nào</p>
              )}
            </div>
            <div className='h-[200px]'>
              <Friend type='addMember' listUser={listMember} setListUser={setListMember} querySearch={querySearch} />
            </div>
          </div>
        </div>
        <div className='flex justify-end p-6 text-sm font-medium'>
          <button onClick={onClose} className='uk-modal-close rounded-md px-4 py-1.5' type='button'>
            Hủy
          </button>
          {listMember.length < 1 ? (
            <button className='cursor-not-allowed rounded-md bg-gray-400 px-5 py-1.5 text-white' type='button'>
              Thêm
            </button>
          ) : isLoading ? (
            <button className='uk-modal-close  rounded-md bg-primary px-5 py-1.5 text-white' type='button'>
              <Spinner />
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className='uk-modal-close  rounded-md bg-primary px-5 py-1.5 text-white'
              type='button'
            >
              Thêm
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ModalAddMember
