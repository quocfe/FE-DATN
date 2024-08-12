import { useState } from 'react'
import Modal from '~/components/Modal'
import { getProfileFromLocalStorage } from '~/utils/auth'
import { useQueryMessage } from '../hooks/useQueryMessage'
import useMutationReCallMessage from './../hooks/useMutationUnSend'
import { useQueryInfinifyMessage } from '../hooks/useQueryInfinifyMessage'
import { useQueryClient } from '@tanstack/react-query'

type ModalTypes = {
  isOpen: boolean
  onClose: () => void
  message: Message
}

const ModalUnSendOption = ({ isOpen, onClose, message }: ModalTypes) => {
  const [type, setType] = useState<string>('')
  const { refetch } = useQueryInfinifyMessage()
  const queryClient = useQueryClient()
  const mutationRecall = useMutationReCallMessage()
  const profile = getProfileFromLocalStorage() || {}

  const handleClickUnSend = () => {
    if (type === 'everyone') {
      const data = {
        message_id: message.message_id,
        forAll: true
      }
      mutationRecall.mutate(data, {
        onSuccess: () => {
          onClose()
          refetch()
          queryClient.invalidateQueries({ queryKey: ['messageFixInfinity'] })
        },
        onError: (error) => {
          console.log(error)
        }
      })
    } else {
      const data = {
        message_id: message.message_id,
        forAll: false
      }
      mutationRecall.mutate(data, {
        onSuccess: () => {
          onClose()
          refetch()
          queryClient.invalidateQueries({ queryKey: ['messageFixInfinity'] })
        },
        onError: (error) => {
          console.log(error)
        }
      })
    }
    onClose()
  }

  return (
    <Modal isVisible={isOpen} onClose={onClose} height='3/6'>
      <div className='p-6 border border-b-gray-400'>
        <h2 className='text-xl font-semibold'>Bạn muốn gỡ tin nhắn này ở phía ai?</h2>
      </div>
      {profile.user_id === message.createdBy ? (
        <div className='flex flex-col items-center'>
          <div className='flex items-center w-full p-2 mb-4 shadow-sm'>
            <input
              id='everyone'
              checked={type === 'everyone'}
              type='checkbox'
              value='everyone'
              className='w-4 h-4 rounded-full'
              onChange={() => setType('everyone')}
            />
            <label
              htmlFor='everyone'
              className='flex items-center w-full gap-2 p-2 text-sm font-medium text-gray-900 select-none ms-2 dark:text-gray-300'
            >
              <div className='text-left'>
                <p className='mb-1 text-sm font-semibold'>Thu hồi với mọi người</p>
                <span className='text-sm font-thin'>
                  Tin nhắn này sẽ bị thu hồi với mọi người trong đoạn chat. Những người khác có thể đã xem hoặc chuyển
                  tiếp tin nhắn đó.
                </span>
              </div>
            </label>
          </div>

          <div className='flex items-center w-full p-2 mb-4 shadow-sm'>
            <input
              id='onlyone'
              checked={type === 'onlyone'}
              type='checkbox'
              value='onlyone'
              className='w-4 h-4 rounded-full'
              onChange={() => setType('onlyone')}
            />
            <label
              htmlFor='onlyone'
              className='flex items-center w-full gap-2 p-2 text-sm font-medium text-gray-900 select-none ms-2 dark:text-gray-300'
            >
              <div className='text-left'>
                <p className='mb-1 text-sm font-semibold'>Thu hồi ở phía bạn</p>
                <span className='text-sm font-thin'>
                  Chúng tôi sẽ gỡ tin nhắn này ở phía bạn. Những người khác trong đoạn chat vẫn có thể xem được.
                </span>
              </div>
            </label>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center w-full'>
          <div className='flex items-center w-full p-2 mb-4 shadow-sm'>
            <input
              id='onlyone'
              checked={type === 'onlyone'}
              type='checkbox'
              value='onlyone'
              className='w-4 h-4 rounded-full'
              onChange={() => setType('onlyone')}
            />
            <label
              htmlFor='onlyone'
              className='flex items-center w-full gap-2 p-2 text-sm font-medium text-gray-900 select-none ms-2 dark:text-gray-300'
            >
              <div className='text-left'>
                <p className='mb-1 text-sm font-semibold'>Thu hồi ở phía bạn</p>
                <span className='text-sm font-thin'>
                  Chúng tôi sẽ gỡ tin nhắn này ở phía bạn. Những người khác trong đoạn chat vẫn có thể xem được.
                </span>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* btn */}
      <div className='flex justify-end p-6 text-sm font-medium'>
        <button onClick={onClose} className='uk-modal-close rounded-md px-4 py-1.5' type='button'>
          Hủy
        </button>

        <button
          onClick={handleClickUnSend}
          className='uk-modal-close rounded-md bg-primary px-5 py-1.5 text-white'
          type='button'
        >
          Gỡ
        </button>
      </div>
    </Modal>
  )
}

export default ModalUnSendOption
