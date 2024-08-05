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
        query: { user_id },
        reconnection: true, // Bật tính năng tự động reconnect
        reconnectionDelay: 1000, // Thời gian delay giữa các lần reconnect (ms)
        reconnectionAttempts: 5 // Số lần thử reconnect tối đa
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
    // Kết nối lại
    newSocket.on('reconnect', (attemptNumber) => {
      console.log('Đã kết nối lại sau', attemptNumber, 'lần thử')
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
  }, [profile?.user_id])

  return { socket }
}

export default useSocket
