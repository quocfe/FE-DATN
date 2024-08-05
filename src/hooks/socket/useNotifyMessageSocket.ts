import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { useSocketContext } from '~/context/socket'
import soundNewMessage from '../../assets/sound/NotificationMessageSound.mp3'
import useQueryNotifyMessage from '../queries/message/useQueryNotifyMessage'

const useNotifyMessageSocket = () => {
  const { socket } = useSocketContext()

  const { refetch: refetchNotifyMessage } = useQueryNotifyMessage()

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
