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
    socket?.on('newNotifyMessage', () => {
      refetchNotifyMessage()
      audio.play()
    })
    socket?.on('deleteNotifyMessage', () => {
      refetchNotifyMessage()
      // audio.play()
    })

    return () => {
      socket?.off('newNotifyMessage')
      socket?.off('deleteNotifyMessage')
    }
  }, [socket])
}

export default useNotifyMessageSocket
