import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { useSocketContext } from '~/context/socket'
import { useQueryConversation } from '~/pages/Message/hooks/useQueryConversation'
import { useQueryMessage } from '~/pages/Message/hooks/useQueryMessage'
import useConversationStore from '~/store/conversation.store'
import soundNewMessage from '../../assets/sound/NotificationMessageSound.mp3'
import { getProfileFromLocalStorage } from '~/utils/auth'
import useQueryNotifyMessage from '../queries/message/useQueryNotifyMessage'

const useNotifyMessageSocket = () => {
  const { socket } = useSocketContext()
  const { refetch: refetchMessage, data } = useQueryMessage()
  const { refetch: refetchConversation } = useQueryConversation()
  const { setIsTyping, setIsNotTyping } = useConversationStore()
  const { refetch: refetchNotifyMessage } = useQueryNotifyMessage()
  const { user_id } = getProfileFromLocalStorage()
  let audio = new Audio(soundNewMessage)

  useEffect(() => {
    ;(socket as Socket | null)?.on('newNotifyMessage', () => {
      refetchNotifyMessage()
      audio.play()
    })
    ;(socket as Socket | null)?.on('deleteNotifyMessage', () => {
      refetchNotifyMessage()
      // audio.play()
    })

    return () => {
      ;(socket as Socket | null)?.off('newNotifyMessage')
      ;(socket as Socket | null)?.off('deleteNotifyMessage')
    }
  }, [socket])
}

export default useNotifyMessageSocket
