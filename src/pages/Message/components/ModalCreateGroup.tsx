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

const ModalCreateGroup = ({ isOpen, onClose }: any) => {
  const [listUser, setListUser] = useState<string[]>([])
  const [groupName, setGroupName] = useState<string>('')
  const [querySearch, setQuerySearch] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const createMessageMutation = useMutationCreateMessage()
  const { refetch } = useQueryConversation()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { upload } = useFileUpload()

  const handleCreate = async () => {
    let dataGroup = {
      list_user: JSON.stringify(listUser),
      group_name: groupName,
      group_thumbnail: ''
    }
    if (file) {
      setIsLoading(true)
      const url = await upload(file)
      dataGroup.group_thumbnail = url.url
    }

    createMessageMutation.mutate(dataGroup, {
      onSuccess: () => {
        refetch()
        onClose()
        setIsLoading(false)
        dataGroup = {
          list_user: '',
          group_name: '',
          group_thumbnail: ''
        }
      },
      onError: () => {
        toast.error('Cần tối thiểu 3 thành viên để tạo nhóm')
      }
    })
  }

  const handleSetNameGroup = useCallback(
    _.debounce((e) => setGroupName(e.target.value), 500),
    []
  )

  console.log('listUser in createGroup', listUser)
  return (
    <Modal isVisible={isOpen} onClose={onClose} height='3/4'>
      <div className='flex h-full flex-col justify-evenly '>
        <div className='flex-1'>
          <div className='p-6'>
            <h2 className='text-xl font-semibold'>Tạo </h2>
          </div>
          <div className='p-6 py-0'>
            <div className='mb-4 flex w-full gap-2'>
              <CustomFileInput type={1} iconName={'image-outline'} setFile={setFile} file={file} />
              <div className=' relative z-0 w-full border-0 border-b-2 !border-gray-600'>
                <input
                  type='text'
                  id='floating_standard'
                  className='dark:focus:gray-blue-500 peer block h-full w-full appearance-none  !bg-transparent px-0 text-sm text-gray-900 focus:border-gray-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white'
                  onChange={handleSetNameGroup}
                />
                <label
                  htmlFor='floating_standard'
                  className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-gray-500'
                >
                  Nhập tên nhóm
                </label>
              </div>
            </div>
            <div className='relative '>
              <div className='absolute bottom-1/2 left-3 flex translate-y-1/2'>
                <IonIcon icon='search' className='md hydrated text-xl' role='img' aria-label='search' />
              </div>
              <input
                onChange={_.debounce((e) => setQuerySearch(e.target.value), 500)}
                type='text'
                placeholder='Tìm bạn bè'
                className='w-full !rounded-lg !py-2 !pl-10'
              />
            </div>
            <Friend listUser={listUser} setListUser={setListUser} querySearch={querySearch} />
          </div>
        </div>
        <div className='flex justify-end p-6 text-sm font-medium'>
          <button onClick={onClose} className='uk-modal-close rounded-md px-4 py-1.5' type='button'>
            Hủy
          </button>
          {listUser.length < 2 ? (
            <button className='cursor-not-allowed rounded-md bg-gray-400 px-5 py-1.5 text-white' type='button'>
              Tạo
            </button>
          ) : isLoading ? (
            <button className='uk-modal-close  rounded-md bg-primary px-5 py-1.5 text-white' type='button'>
              <Spinner />
            </button>
          ) : (
            <button
              onClick={handleCreate}
              className='uk-modal-close  rounded-md bg-primary px-5 py-1.5 text-white'
              type='button'
            >
              Tạo
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ModalCreateGroup
