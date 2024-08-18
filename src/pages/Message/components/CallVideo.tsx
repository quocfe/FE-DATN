import { IonIcon } from '@ionic/react'
import { useEffect, useState } from 'react'
import { useSocketContext } from '~/context/socket'
import useMessageStore from '~/store/message.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import { useMutationSendCallMessage } from '../hooks/useMutaion/useMutationSendMessage'

function CallVideo() {
  const sendCallMessageMutation = useMutationSendCallMessage()

  const { videoCall, setVideoCall, callingMessageCallAudio, endCallAudio, connectingMessageCallAudio } =
    useMessageStore()
  const { socket, onlineUsers } = useSocketContext()
  const { user_id } = getProfileFromLocalStorage()
  const [checkUserConnection, setCheckUserConnection] = useState<boolean>(false)

  const handleCancelVideoCall = async () => {
    socket?.emit('cancelVideoCall', { group_message_id: videoCall?.group_message_id, user_id })
    setVideoCall({})
    callingMessageCallAudio.pause()
    connectingMessageCallAudio.pause()
    endCallAudio.play()
    const baseData = {
      body: 'Cuộc gọi nhỡ',
      sub_body: '',
      group_message_id: videoCall?.group_message_id,
      type: 6,
      sender: user_id
    }
    await sendCallMessageMutation.mutateAsync(baseData)
  }

  useEffect(() => {
    if (videoCall) {
      const checkUserConnection = onlineUsers.some((onlineUser) => onlineUser.includes(videoCall?.user_id))
      checkUserConnection ? callingMessageCallAudio.play() : connectingMessageCallAudio.play()
      setCheckUserConnection(checkUserConnection)

      // Đặt hẹn giờ để tự động hủy cuộc gọi sau 10 giây
      const cancelTimeout = setTimeout(() => {
        handleCancelVideoCall()
      }, 10000) // 10000ms = 10 giây

      return () => {
        clearTimeout(cancelTimeout)
        callingMessageCallAudio.pause()
        connectingMessageCallAudio.pause()
      }
    }
  }, [onlineUsers, videoCall])

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
          <h1 className='text-[28px] font-semibold'>{videoCall?.group_name}</h1>
          <p className='text-[12px]'>{checkUserConnection ? 'Đang rung chuông...' : 'Đang kết nối'} </p>
          <div className='flex flex-1 items-center justify-center'>
            <img className='h-32 w-32 rounded-full object-cover' src={videoCall?.avatar} alt='' />
          </div>
          <button
            onClick={handleCancelVideoCall}
            className='flex h-14 w-14 rotate-[135deg] items-center justify-center rounded-full bg-[#ff0505] p-4'
          >
            <IonIcon name='call' className='text-white' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CallVideo
