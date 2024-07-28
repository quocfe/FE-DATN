import React, { useEffect } from 'react'

interface AudioTimerProps {
  isRunning: boolean
  elapsedTime: number
  setElapsedTime: (elapsedTime: any) => void
}

const AudioTimer: React.FC<AudioTimerProps> = ({ isRunning, elapsedTime, setElapsedTime }) => {
  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isRunning) {
      intervalId = setInterval(() => setElapsedTime((prevTime: any) => prevTime + 1), 10)
    }

    return () => clearInterval(intervalId)
  }, [isRunning, elapsedTime])

  const hours = Math.floor(elapsedTime / 360000)
  const minutes = Math.floor((elapsedTime % 360000) / 6000)
  const seconds = Math.floor((elapsedTime % 6000) / 100)
  const milliseconds = elapsedTime % 100

  return (
    <div className=''>
      <p className='time text-[11px] font-semibold'>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </p>
    </div>
  )
}

export default AudioTimer
