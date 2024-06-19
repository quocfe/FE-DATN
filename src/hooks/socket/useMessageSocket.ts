import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { useSocketContext } from '~/context/socket'
import { useQueryConversation } from '~/pages/Message/hooks/useQueryConversation'
import { useQueryMessage } from '~/pages/Message/hooks/useQueryMessage'
import useConversationStore from '~/store/conversation.store'
import soundNewMessage from '../../assets/sound/NotificationMessageSound.mp3'
import { getProfileFromLocalStorage } from '~/utils/auth'

type NewMessagetype = {
  body: string
  createdAt: Date
  createdBy: string
  group_message_id: string
  message_id: string
  type: number
  updatedAt: Date
}

const useMessageSocket = () => {
  const { socket } = useSocketContext()
  const { refetch: refetchMessage, data } = useQueryMessage()
  const { refetch: refetchConversation } = useQueryConversation()
  const { setIsTyping, setIsNotTyping } = useConversationStore()
  const { user_id } = getProfileFromLocalStorage()
  let audio = new Audio(soundNewMessage)

  useEffect(() => {
    ;(socket as Socket | null)?.on('newMessage', () => {
      refetchConversation()
      refetchMessage()
    })
    ;(socket as Socket | null)?.on('reactMessage', () => {
      refetchConversation()
      refetchMessage()
    })
    ;(socket as Socket | null)?.on('newConversation', () => {
      refetchConversation()
    })
    ;(socket as Socket | null)?.on('newGroupImage', () => {
      refetchConversation()
      refetchMessage()
    })
    ;(socket as Socket | null)?.on('newGroupName', () => {
      refetchConversation()
      refetchMessage()
    })
    ;(socket as Socket | null)?.on('isTyping', (user_id) => {
      setIsTyping(user_id)
      setIsNotTyping(false)
    })
    ;(socket as Socket | null)?.on('isNotTyping', () => {
      setIsNotTyping(true)
    })
    ;(socket as Socket | null)?.on('newNotifyMessage', (data) => {
      console.log('notify message socket', data)
      audio.play()
    })

    return () => {
      ;(socket as Socket | null)?.off('newMessage')
      ;(socket as Socket | null)?.off('reactMessage')
      ;(socket as Socket | null)?.off('newConversation')
      ;(socket as Socket | null)?.off('newGroupName')
      ;(socket as Socket | null)?.off('newGroupImage')
      ;(socket as Socket | null)?.off('isTyping')
      ;(socket as Socket | null)?.off('isNotTyping')
      ;(socket as Socket | null)?.off('newNotifyMessage')
    }
  }, [socket])
}

export default useMessageSocket
