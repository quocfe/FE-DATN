import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import Modal from '~/components/Modal'
import useMutationReportMessage from '../hooks/useMutationReportMessage'
import { useQueryInfinifyMessage } from '../hooks/useQueryInfinifyMessage'

type ModalTypes = {
  isOpen: boolean
  onClose: () => void
  message_id: string
}

const ModalReportMessage = ({ isOpen, onClose, message_id }: ModalTypes) => {
  const [type, setType] = useState<string>('')
  const { refetch } = useQueryInfinifyMessage()
  const queryClient = useQueryClient()
  const mutationReport = useMutationReportMessage()

  const handleClickReport = () => {}

  return (
    <Modal isVisible={isOpen} onClose={onClose} height='3/6'>
      <div className='border border-b-gray-400 p-6'>
        <h2 className='text-xl font-semibold'>Bạn muốn gỡ tin nhắn này ở phía ai?</h2>
      </div>

      {/* btn */}
      <div className='flex justify-end p-6 text-sm font-medium'>
        <button onClick={onClose} className='uk-modal-close rounded-md px-4 py-1.5' type='button'>
          Hủy
        </button>

        <button
          onClick={handleClickReport}
          className='uk-modal-close rounded-md bg-primary px-5 py-1.5 text-white'
          type='button'
        >
          Báo cáo
        </button>
      </div>
    </Modal>
  )
}

export default ModalReportMessage
