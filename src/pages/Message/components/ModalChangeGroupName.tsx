import { IonIcon } from '@ionic/react'
import _ from 'lodash'
import { useState } from 'react'
import { toast } from 'react-toastify'
import CustomFileInput from '~/components/InputFile/CustomFileInput'
import Modal from '~/components/Modal'
import useMutationCreateMessage from '../hooks/useMutationCreateGroup'
import { useQueryConversation } from '../hooks/useQueryConversation'
import useFileUpload from '../utils/uploadApi'
import Friend from './Friend'
import Spinner from './Skelaton/Spinner'
import useMutationChangeGroupName from '../hooks/useMutaionChangeGroupName'

const ModalChangeGroupName = ({ isOpen, onClose }: any) => {
  const [groupName, setGroupName] = useState<string>('')
  const changeGroupNameMutation = useMutationChangeGroupName()
  const { refetch } = useQueryConversation()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleCreate = async () => {
    const dataGroup = {
      group_id: '',
      group_name: groupName
    }

    changeGroupNameMutation.mutate(dataGroup, {
      onSuccess: () => {
        refetch()
        onClose()
        setIsLoading(false)
      },
      onError: () => {
        toast.error('')
      }
    })
  }

  return (
    <Modal isVisible={isOpen} onClose={onClose} height='3/4'>
      <div className='flex h-full flex-col justify-evenly'>
        <div className='flex-1'>
          <div className='p-6'>
            <h2 className='text-xl font-semibold'>Thay đổi tên nhóm </h2>
          </div>
          <div className='p-6 py-0'>
            <div className='mb-4 flex w-full gap-2'>
              <div className='group relative z-0 w-full border-0 border-b-2 !border-gray-600'>
                <input
                  type='text'
                  name='floating_title'
                  id='floating_title'
                  className='dark:focus:gray-blue-500 peer block h-full w-full appearance-none  !bg-transparent px-0 text-sm text-gray-900 focus:border-gray-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white'
                  onChange={(event) => setGroupName(event.target.value)}
                />
                <label
                  htmlFor='floating_title'
                  className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-gray-500'
                >
                  Nhập tên nhóm
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-end p-6 text-sm font-medium'>
          <button className='uk-modal-close rounded-md px-4 py-1.5' type='button'>
            Hủy
          </button>
          <button
            onClick={handleCreate}
            className='uk-modal-close  rounded-md bg-primary px-5 py-1.5 text-white'
            type='button'
          >
            Tạo
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalChangeGroupName
