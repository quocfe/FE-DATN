import React, { createContext, useState, useEffect, useContext } from 'react'
import io, { Socket } from 'socket.io-client'
import useAuthStore from '~/store/auth.store'
import { getProfileFromLocalStorage } from '~/utils/auth'

interface SocketContextValues {
  socket: Socket | null
  onlineUsers: any[]
}

const SocketContext = createContext<SocketContextValues | undefined>(undefined)

export const useSocketContext = (): SocketContextValues => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketContextProvider')
  }
  return context
}

interface SocketContextProviderProps {
  children: React.ReactNode
}

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const { profile } = useAuthStore()

  useEffect(() => {
    const connectSocket = () => {
      if (profile?.user_id) {
        const newSocket = io('http://localhost:3000', {
          query: {
            user_id: profile?.user_id
          },
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000
        })
        setSocket(newSocket)
        newSocket.on('getOnlineUsers', (users: any) => {
          setOnlineUsers(users)
          console.log('getOnlineUsers', users)
        })
      }
    }

    const disconnectSocket = () => {
      if (socket) {
        socket.close()
        setSocket(null)
      }
    }

    connectSocket()

    return () => {
      disconnectSocket()
    }
  }, [profile?.user_id])

  return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>
}
