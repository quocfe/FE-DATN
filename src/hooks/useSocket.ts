import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import useAuthStore from '~/store/auth.store'

const SERVER_URL = 'http://localhost:3000'

const useSocket = (): { socket: Socket | null } => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const { profile } = useAuthStore()

  useEffect(() => {
    let newSocket: Socket
    const user_id = profile?.user_id

    if (!user_id) {
      if (socket) {
        socket.disconnect()
      }
      return
    }

    if (user_id) {
      newSocket = io(SERVER_URL, {
        query: { user_id }
      })
    } else {
      newSocket = io(SERVER_URL)
    }

    newSocket.connect()

    // Lỗi kết nối
    newSocket.on('connect_error', () => {
      console.error('Không thể kết nối đến máy chủ!')
      newSocket.disconnect()
      setSocket(null)
    })

    // Mất kết nối
    newSocket.on('disconnect', () => {
      setSocket(null)
    })

    setSocket(newSocket)

    // Clear up function - Dọn dẹp khi bị unmount
    return () => {
      if (newSocket.connected) {
        newSocket.disconnect()
      }
    }
  }, [profile])

  return { socket }
}

export default useSocket
