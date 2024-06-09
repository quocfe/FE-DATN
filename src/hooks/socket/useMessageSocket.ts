import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { useSocketContext } from '~/context/socket'
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
  const { setNotifyMessage } = useConversationStore()
  useEffect(() => {
    ;(socket as Socket | null)?.on('newMessage', () => {
      console.log('new message')
      refetch()
    })
    ;(socket as Socket | null)?.on('reactMessage', () => {
      refetch()
    })
    ;(socket as Socket | null)?.on('notifyMessage', (group_message_id) => {
      // console.log('notify message socket', group_message_id)
      setNotifyMessage(group_message_id)
    })

    return () => {
      ;(socket as Socket | null)?.off('newMessage')
      ;(socket as Socket | null)?.off('reactMessage')
      ;(socket as Socket | null)?.off('notifyMessage')
    }
  }, [socket])
}

export default useMessageSocket
