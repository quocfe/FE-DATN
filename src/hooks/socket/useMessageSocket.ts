import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { useSocketContext } from '~/context/socket'
import { fetchConversation } from '~/pages/Message/utils/fetchInfiniteConversation'
import useConversationStore from '~/store/conversation.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import soundNewMessage from '../../assets/sound/NotificationMessageSound.mp3'
import { fetchMessages } from '~/pages/Message/utils/fetchInfiniteMessage'
import { useQueryInfinifyMessage } from '~/pages/Message/hooks/useQueryInfinifyMessage'

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
  // const { refetch: refetchMessage, data } = useQueryMessage()
  // const { refetch: refetchConversation } = useQueryConversation()
  const { selectedConversation, previewImg } = useConversationStore()

  const { refetch: refetchConversation } = useInfiniteQuery({
    queryKey: ['conversations'],
    queryFn: fetchConversation,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined
    }
  })

  const { refetch: refetchMessage } = useQueryInfinifyMessage()

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
      ;(socket as Socket | null)?.off('newNotifyMessage')
    }
  }, [socket])
}

export default useMessageSocket
