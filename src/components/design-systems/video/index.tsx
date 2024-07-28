/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '~/helpers'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { timeLineVideo } from '~/utils/helpers'
import './video-style.css'
import Volume from './volume'
import ProgressValue, { ProgressValuePropsRef } from './progress-value'

interface VideoProps {
  className?: string
  dataVideo?: DataVideoResponse
}

export const Video: React.FC<VideoProps> = ({ className, dataVideo }) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlay, setIsPlay] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.5)
  const [showControls, setShowControls] = useState(false)

  const playerRef = useRef<ReactPlayer>(null)
  const refProgress = useRef<ProgressValuePropsRef>(null)

  const wapperVideoRef = useRef<HTMLDivElement>(null)
  const intervalId = useRef<NodeJS.Timeout | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current)
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleVideoEnded = () => {
    if (intervalId.current) {
      setIsPlay(false)
      setCurrentTime(0)
      clearInterval(intervalId.current)
      intervalId.current = null
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        setIsFullScreen(false)
      }
    }

    if (isFullScreen) {
      document.querySelector('body')?.classList.add('overflow-hidden')
      // Thêm trình nghe sự kiện keydown vào document
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.querySelector('body')?.classList.remove('overflow-hidden')
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFullScreen])

  const handleMouseMove = () => {
    setShowControls(true)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setShowControls(false)
      timerRef.current = null
    }, 5000)
  }

  return (
    <div
      className={cn('player-wrapper  group cursor-pointer bg-black', {
        '!fixed !left-0 !top-0 bottom-0 right-0  z-[999999] !pt-0': isFullScreen
      })}
      ref={wapperVideoRef}
      onMouseMove={handleMouseMove}
      // onClick={refProgress.current?.handlePlay}
    >
      <div className='' onClick={refProgress.current?.handlePlay}>
        <ReactPlayer
          ref={playerRef}
          className={cn('react-player ', className)}
          url={dataVideo?.url}
          playing={isPlay}
          controls={false}
          onEnded={handleVideoEnded}
          volume={volume}
        />
      </div>
      <div
        className={cn(
          'absolute bottom-0 left-0 z-[9999] hidden w-full bg-[linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.6))] text-white',
          {
            'py-4': isFullScreen,
            block: showControls
          }
        )}
      >
        <div className='flex h-8 items-center justify-between gap-x-3 px-4'>
          <button type='button' className='text-white' onClick={refProgress.current?.handlePlay}>
            {isPlay ? (
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                <path
                  fillRule='evenodd'
                  d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z'
                  clipRule='evenodd'
                />
              </svg>
            ) : (
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                <path
                  fillRule='evenodd'
                  d='M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z'
                  clipRule='evenodd'
                />
              </svg>
            )}
          </button>
          <div className='flex flex-1 items-center gap-x-5'>
            <div className='flex gap-x-1 text-[13px]'>
              <span className='font-semibold'>{timeLineVideo(currentTime)}</span>
              <span>/</span>
              <span>{timeLineVideo(dataVideo?.duration || 0)}</span>
            </div>
            <div className='relative flex h-full w-full cursor-pointer items-center justify-center'>
              <ProgressValue
                ref={refProgress}
                playerRef={playerRef}
                duration={dataVideo?.duration ?? 0}
                setCurrentTime={setCurrentTime}
                intervalId={intervalId}
                isPlay={isPlay}
                setIsPlay={setIsPlay}
              />
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <button type='button'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                <path
                  fillRule='evenodd'
                  d='M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            <button type='button' onClick={() => setIsFullScreen((prev) => !prev)}>
              {isFullScreen ? (
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M3.22 3.22a.75.75 0 0 1 1.06 0l3.97 3.97V4.5a.75.75 0 0 1 1.5 0V9a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1 0-1.5h2.69L3.22 4.28a.75.75 0 0 1 0-1.06Zm17.56 0a.75.75 0 0 1 0 1.06l-3.97 3.97h2.69a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75V4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0ZM3.75 15a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-2.69l-3.97 3.97a.75.75 0 0 1-1.06-1.06l3.97-3.97H4.5a.75.75 0 0 1-.75-.75Zm10.5 0a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-2.69l3.97 3.97a.75.75 0 1 1-1.06 1.06l-3.97-3.97v2.69a.75.75 0 0 1-1.5 0V15Z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </button>
            <Volume setVolume={setVolume} volume={volume} />
          </div>
        </div>
      </div>
    </div>
  )
}
