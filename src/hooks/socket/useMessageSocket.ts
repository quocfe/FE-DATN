import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { useSocketContext } from '~/context/socket'
import { useQueryConversation } from '~/pages/Message/hooks/useQueryConversation'
import { useQueryMessage } from '~/pages/Message/hooks/useQueryMessage'
import useConversationStore from '~/store/conversation.store'

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
  const { refetch, data } = useQueryMessage()
  const { refetch: refetchConversation } = useQueryConversation()

  useEffect(() => {
    ;(socket as Socket | null)?.on('newMessage', () => {
      refetchConversation()
      refetch()
    })
    ;(socket as Socket | null)?.on('reactMessage', () => {
      refetchConversation()
      refetch()
    })
    ;(socket as Socket | null)?.on('newConversation', () => {
      refetchConversation()
    })
    // ;(socket as Socket | null)?.on('notifyMessage', (group_message_id) => {
    //   console.log('notify message socket', group_message_id)
    // })

    return () => {
      ;(socket as Socket | null)?.off('newMessage')
      ;(socket as Socket | null)?.off('reactMessage')
      ;(socket as Socket | null)?.off('notifyMessage')
    }
  }, [socket])
}

export default useMessageSocket
