import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { useSocketContext } from '~/context/socket'
import soundCallMessage from '../../assets/sound/Sound_call.mp3'
import useQueryNotifyMessage from '../queries/message/useQueryNotifyMessage'
import useMessageStore from '~/store/message.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import useConversationStore from '~/store/conversation.store'
import { useQueryInfinifyConversation } from '~/pages/Message/hooks/useQuery/useQueryInfinifyConversation'
import { useQueryInfinifyMessage } from '~/pages/Message/hooks/useQuery/useQueryInfinifyMessage'

const useVideoCallMessageSocket = () => {
  const { socket } = useSocketContext()
  const { refetch: refetchConversation } = useQueryInfinifyConversation()
  const { refetch: refetchMessage } = useQueryInfinifyMessage()

  const {
    setDataCall,
    callingMessageCallAudio,
    setInCommingVideoCall,
    inComingCallAudio,
    setVideoCall,
    setAcceptCall
  } = useMessageStore()
  const { selectedConversation } = useConversationStore()

  useEffect(() => {
    socket?.on('inComingCallVideo', (data) => {
      inComingCallAudio.play()
      setInCommingVideoCall(data)
      // refetchNotifyMessage()
    })
    socket?.on('cancelVideoCall', () => {
      inComingCallAudio.pause()
      setInCommingVideoCall([])
    })
    socket?.on('cancelInComingVideoCall', () => {
      callingMessageCallAudio.pause()
      inComingCallAudio.pause()
      setVideoCall([])
    })
    socket?.on('acceptVideoCall', (data) => {
      const { user_id: user_id_loggin } = getProfileFromLocalStorage()
      localStorage.setItem('dataCall', JSON.stringify(data))
      setAcceptCall(true)
      callingMessageCallAudio.pause()
      inComingCallAudio.pause()
      setVideoCall([])
      setInCommingVideoCall([])
      const newWindow = open(
        `/videocall/${data.room_id}/${user_id_loggin}/${data?.group_message_id}/${data.user_id}`,
        '_blank',
        'width=1000,height=600'
      )

      newWindow?.open()
    })
    return () => {
      socket?.off('inComingCallVideo')
      socket?.off('cancelVideoCall')
      socket?.off('cancelInComingVideoCall')
      socket?.off('acceptVideoCall')
    }
  }, [socket])
}

export default useVideoCallMessageSocket
