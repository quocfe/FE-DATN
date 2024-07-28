import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { useSocketContext } from '~/context/socket'
import { fetchConversation } from '~/pages/Message/utils/fetchInfiniteConversation'
import useConversationStore from '~/store/conversation.store'
import { getProfileFromLocalStorage } from '~/utils/auth'
import soundNewMessage from '../../assets/sound/NotificationMessageSound.mp3'
import { useQueryInfinifyMessage } from '~/pages/Message/hooks/useQueryInfinifyMessage'
import { useQueryMembers } from '~/pages/Message/hooks/useQueryMembers'
import { useQueryStatusMessage } from '~/pages/Message/hooks/useQueryStatusMessage'
import { useQueryInfinifyConversation } from '~/pages/Message/hooks/useQueryInfinifyConversation'
import useMessageFixStore from '~/store/messageFix.store'
import MessageFixed from '~/components/MessageFixed/MessageFixed'
import HiddenMessageFix from '~/components/MessageFixed/HiddenMessageFix'

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
  const { data, refetch: refetchConversation } = useQueryInfinifyConversation()
  const { refetch: refetchMessage } = useQueryInfinifyMessage()
  const { refetch: refetchMember } = useQueryMembers()
  const { refetch: refetchStatusMessage } = useQueryStatusMessage()
  let audioNewMsg = new Audio(soundNewMessage)

  useEffect(() => {
    ;(socket as Socket | null)?.on('newMessage', () => {
      audioNewMsg.play()
      refetchConversation()
      queryClient.invalidateQueries({ queryKey: ['messageInfinity'] })
      refetchStatusMessage()
      document.title = 'có tin nhắn mới'
    })
    ;(socket as Socket | null)?.on('deleteOrLeaveGroup', () => {
      // refetchConversation()
      // refetchMember()
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
    ;(socket as Socket | null)?.on('seenedMessage', () => {
      refetchStatusMessage()
    })

    return () => {
      ;(socket as Socket | null)?.off('newMessage')
      ;(socket as Socket | null)?.off('reactMessage')
      ;(socket as Socket | null)?.off('newConversation')
      ;(socket as Socket | null)?.off('newGroupName')
      ;(socket as Socket | null)?.off('newGroupImage')
      ;(socket as Socket | null)?.off('seenedMessage')
    }
  }, [socket])
}

export default useMessageSocket
