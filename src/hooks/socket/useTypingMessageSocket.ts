import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { useSocketContext } from '~/context/socket'
import useConversationStore from '~/store/conversation.store'

const useTypingMessageSocket = () => {
  const { socket } = useSocketContext()
  const { setIsTyping, setIsNotTyping } = useConversationStore()

  useEffect(() => {
    ;(socket as Socket | null)?.on('isTyping', (user_id) => {
      setIsTyping(user_id)
      setIsNotTyping(false)
    })
    ;(socket as Socket | null)?.on('isNotTyping', () => {
      setIsNotTyping(true)
    })

    return () => {
      ;(socket as Socket | null)?.off('isTyping')
      ;(socket as Socket | null)?.off('isNotTyping')
    }
  }, [socket])
}

export default useTypingMessageSocket
