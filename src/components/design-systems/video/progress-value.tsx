/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import ReactPlayer from 'react-player'

interface ProgressValueProps {
  playerRef: React.RefObject<ReactPlayer>
  data: { duration: number }
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>
  intervalId: React.MutableRefObject<NodeJS.Timeout | null>
  isPlay: boolean
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ProgressValuePropsRef {
  handlePlay: () => void
}

const ProgressValue = React.forwardRef<ProgressValuePropsRef, ProgressValueProps>(
  ({ playerRef, data, setCurrentTime, intervalId, isPlay, setIsPlay }, ref) => {
    const [isMouseDown, setIsMouseDown] = useState(false)

    const progress = useRef<HTMLDivElement>(null)
    const progressValue = useRef<HTMLDivElement>(null)

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault()
      setIsMouseDown(true)
    }, [])

    const handleMouseMove = useCallback(
      (event: MouseEvent) => {
        if (isMouseDown && progressValue.current && progress.current && playerRef.current && data) {
          const rect = progress.current.getBoundingClientRect()
          const widthClick = event.clientX - rect.left
          const width = widthClick <= 0 ? 0 : widthClick >= rect.width ? 100 : (widthClick / rect.width) * 100

          progressValue.current.style.width = width + '%'
          const newTime = (data.duration * width) / 100
          playerRef.current.seekTo(newTime)
          setCurrentTime(newTime)
        }
      },
      [isMouseDown, data, playerRef, setCurrentTime]
    )

    const handleMouseUp = useCallback(() => {
      setIsMouseDown(false)
    }, [])

    useEffect(() => {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }, [handleMouseMove, handleMouseUp])

    const handlePlay = useCallback(() => {
      if (intervalId.current && data) {
        clearInterval(intervalId.current)
        intervalId.current = null
        setIsPlay((prev) => !prev)
      } else {
        const newIntervalId = setInterval(() => {
          if (playerRef.current && progressValue.current) {
            const currentTime = playerRef.current.getCurrentTime()
            setCurrentTime(currentTime)
            const width = (currentTime / data.duration) * 100
            progressValue.current.style.width = `${width}%`
          }
        }, 40)
        setIsPlay((prev) => !prev)
        intervalId.current = newIntervalId as NodeJS.Timeout
      }
    }, [data, playerRef, setCurrentTime, intervalId])

    useImperativeHandle(ref, () => ({
      handlePlay,
      isPlay,
      setIsPlay
    }))

    return (
      <React.Fragment>
        <div
          ref={progress}
          className='h-[3px] w-full rounded-lg bg-[#ffffff66] shadow-[0_1p_4p_rgba(20_22_26_.3)]'
          onMouseDown={handleMouseDown}
        >
          <div
            ref={progressValue}
            className='relative flex items-center justify-end'
            style={{
              background: '#4080ff',
              justifyContent: 'flex-start',
              borderRadius: '100px',
              alignItems: 'center',
              position: 'relative',
              display: 'flex',
              height: '100%',
              width: '0',
              cursor: 'pointer',
              animation: '3s normal forwards'
            }}
          >
            <div className='absolute right-0 h-3 w-3 rounded-full bg-white'></div>
          </div>
        </div>
      </React.Fragment>
    )
  }
)

export default ProgressValue
