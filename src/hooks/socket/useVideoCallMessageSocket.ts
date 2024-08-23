import { useEffect } from 'react'
import { useSocketContext } from '~/context/socket'
import { useQueryInfinifyConversation } from '~/pages/Message/hooks/useQuery/useQueryInfinifyConversation'
import { useQueryInfinifyMessage } from '~/pages/Message/hooks/useQuery/useQueryInfinifyMessage'
import useConversationStore from '~/store/conversation.store'
import useMessageStore from '~/store/message.store'
import { getProfileFromLocalStorage } from '~/utils/auth'

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
