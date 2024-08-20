import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { useSocketContext } from '~/context/socket'
import useConversationStore from '~/store/conversation.store'

const useTypingMessageSocket = () => {
  const { socket } = useSocketContext()
  const { setIsTyping, setIsNotTyping } = useConversationStore()

  useEffect(() => {
    socket?.on('isTyping', (data) => {
      setIsTyping(data)
      setIsNotTyping(false)
    })
    socket?.on('isNotTyping', () => {
      setIsNotTyping(true)
    })

    return () => {
      socket?.off('isTyping')
      socket?.off('isNotTyping')
    }
  }, [socket])
}

export default useTypingMessageSocket
