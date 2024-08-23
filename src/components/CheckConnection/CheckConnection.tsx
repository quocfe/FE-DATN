import { ReactNode, useEffect, useState } from 'react'
import Disconnection from '~/pages/Disconnection'

function CheckConnection({ children }: { children: ReactNode }) {
  const [online, setOnline] = useState<boolean>(true)

  useEffect(() => {
    const handleCheckInternetOnline = () => {
      setOnline(true)
    }
    const handleCheckInternetOffline = () => {
      setOnline(false)
    }

    window.addEventListener('online', handleCheckInternetOnline)
    window.addEventListener('offline', handleCheckInternetOffline)

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener('online', handleCheckInternetOnline)
      window.removeEventListener('offline', handleCheckInternetOffline)
    }
  }, [])

  return <>{online ? children : <Disconnection />}</>
}

export default CheckConnection
