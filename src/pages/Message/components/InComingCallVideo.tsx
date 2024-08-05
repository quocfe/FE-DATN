import { IonIcon } from '@ionic/react'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '~/components/Modal'
import { useSocketContext } from '~/context/socket'
import useConversationStore from '~/store/conversation.store'
import useMessageStore from '~/store/message.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import { useMutationSendCallMessage } from '../hooks/useMutationSendMessage'

function InComingCallVideo() {
  const { socket } = useSocketContext()
  const { inCommingVideoCall, setInCommingVideoCall, endCallAudio, inComingCallAudio } = useMessageStore()
  const { selectedConversation } = useConversationStore()
  const { user_id } = getProfileFromLocalStorage()
  const navigate = useNavigate()
  const sendCallMessageMutation = useMutationSendCallMessage()

  const handleAcceptInComingVideoCall = () => {
    socket?.emit('acceptInComingVideoCall', inCommingVideoCall)
  }

  const handleCancelInComingVideoCall = async () => {
    socket?.emit('cancelInComingVideoCall', inCommingVideoCall)
    setInCommingVideoCall([])
    inComingCallAudio.pause()
    endCallAudio.play()
    const baseData = {
      body: 'Cuộc gọi nhỡ',
      sub_body: '',
      group_message_id: inCommingVideoCall?.group_message_id,
      type: 6,
      sender: inCommingVideoCall?.user_id
    }
    await sendCallMessageMutation.mutateAsync(baseData)
  }

  return (
    <div
      className='fixed inset-0 z-[1010] flex items-center bg-black bg-opacity-10 backdrop-blur-sm'
      id='wrapper-modal'
    >
      <div
        className='dark:bg-dark2 relative mx-auto h-[400px] w-[60%] overflow-hidden overflow-y-scroll rounded-lg bg-white text-sm text-black shadow-xl md:w-[400px]'
        style={{ scrollbarWidth: 'none' }}
      >
        <div className='flex h-full flex-col items-center gap-5 p-9'>
          <h1 className='text-[28px] font-semibold'>{inCommingVideoCall?.group_name}</h1>
          <p className='text-[12px]'>Cuộc gọi tới</p>
          <div className='flex flex-1 items-center justify-center'>
            <img className='h-32 w-32 rounded-full object-cover' src={inCommingVideoCall?.avatar} alt='' />
          </div>
          <div className='flex gap-11'>
            <button
              onClick={handleAcceptInComingVideoCall}
              className='flex h-14 w-14 items-center justify-center rounded-full bg-[#22bb33] p-4'
            >
              <IonIcon name='call' className='text-white' />
            </button>
            <button
              onClick={handleCancelInComingVideoCall}
              className='flex h-14 w-14 rotate-[135deg] items-center justify-center rounded-full bg-[#ff0505] p-4'
            >
              <IonIcon name='call' className='text-white' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(InComingCallVideo)
