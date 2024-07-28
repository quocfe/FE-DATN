import { useEffect, useState } from 'react'

function callTime(callStartTime: Date | null) {
  const [callDuration, setCallDuration] = useState<string>('00:00')

  useEffect(() => {
    if (!callStartTime) return

    const timerInterval = setInterval(() => {
      const elapsed = Date.now() - callStartTime.getTime()
      const minutes = Math.floor(elapsed / 60000)
      const seconds = Math.floor((elapsed % 60000) / 1000)
      setCallDuration(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [callStartTime])

  return callDuration
}

export default callTime
