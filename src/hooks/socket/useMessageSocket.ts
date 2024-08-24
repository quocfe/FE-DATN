import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSocketContext } from '~/context/socket'
import { useQueryInfinifyConversation } from '~/pages/Message/hooks/useQuery/useQueryInfinifyConversation'
import { useQueryInfinifyMessage } from '~/pages/Message/hooks/useQuery/useQueryInfinifyMessage'
import { useQueryStatusMessage } from '~/pages/Message/hooks/useQuery/useQueryStatusMessage'
import useConversationStore from '~/store/conversation.store'
import soundNewMessage from '../../assets/sound/NotificationMessageSound.mp3'

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
  const queryClient = useQueryClient()
  const { selectedConversation, previewImg } = useConversationStore()
  const { refetch: refetchConversation } = useQueryInfinifyConversation()
  const { refetch: refetchMessage } = useQueryInfinifyMessage()
  const { refetch: refetchStatusMessage } = useQueryStatusMessage()
  let audioNewMsg = new Audio(soundNewMessage)

  useEffect(() => {
    socket?.on('newMessage', () => {
      // audioNewMsg.play()
      refetchConversation()
      refetchMessage()
      refetchStatusMessage()
      document.title = 'có tin nhắn mới'
    })
    socket?.on('deleteOrLeaveGroup', () => {
      refetchConversation()
      refetchMessage()
      queryClient.invalidateQueries({ queryKey: ['memmbers'] })
    })
    socket?.on('reactMessage', () => {
      refetchConversation()
      refetchMessage()
    })
    socket?.on('newConversation', () => {
      refetchConversation()
    })
    socket?.on('newGroupImage', () => {
      refetchConversation()
      refetchMessage()
    })
    socket?.on('newGroupName', () => {
      refetchConversation()
      refetchMessage()
      queryClient.invalidateQueries({ queryKey: ['message'] })
    })
    socket?.on('seenedMessage', () => {
      refetchStatusMessage()
    })
    socket?.on('blockedMessage', () => {
      queryClient.invalidateQueries({ queryKey: ['message'] })
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    })

    return () => {
      socket?.off('newMessage')
      socket?.off('reactMessage')
      socket?.off('newConversation')
      socket?.off('newGroupName')
      socket?.off('newGroupImage')
      socket?.off('seenedMessage')
      socket?.off('blockedMessage')
    }
  }, [socket])
}

export default useMessageSocket
