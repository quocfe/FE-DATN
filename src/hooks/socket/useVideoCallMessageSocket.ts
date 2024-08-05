import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { useSocketContext } from '~/context/socket'
import soundCallMessage from '../../assets/sound/Sound_call.mp3'
import useQueryNotifyMessage from '../queries/message/useQueryNotifyMessage'
import useMessageStore from '~/store/message.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import useConversationStore from '~/store/conversation.store'
import { useQueryInfinifyConversation } from '~/pages/Message/hooks/useQueryInfinifyConversation'
import { useQueryInfinifyMessage } from '~/pages/Message/hooks/useQueryInfinifyMessage'

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
    ;(socket as Socket | null)?.on('inComingCallVideo', (data) => {
      inComingCallAudio.play()
      setInCommingVideoCall(data)
      // refetchNotifyMessage()
    })
    ;(socket as Socket | null)?.on('cancelVideoCall', () => {
      inComingCallAudio.pause()
      setInCommingVideoCall([])
    })
    ;(socket as Socket | null)?.on('cancelInComingVideoCall', () => {
      callingMessageCallAudio.pause()
      inComingCallAudio.pause()
      setVideoCall([])
    })
    ;(socket as Socket | null)?.on('acceptVideoCall', (data) => {
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
      ;(socket as Socket | null)?.off('inComingCallVideo')
      ;(socket as Socket | null)?.off('cancelVideoCall')
      ;(socket as Socket | null)?.off('cancelInComingVideoCall')
      ;(socket as Socket | null)?.off('acceptVideoCall')
    }
  }, [socket])
}

export default useVideoCallMessageSocket
