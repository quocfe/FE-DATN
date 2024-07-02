/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '~/helpers'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { timeLineVideo } from '~/utils/helpers'
import './video-style.css'
import { useQuery } from '@tanstack/react-query'
import videoApi from '~/apis/video.api'

interface VideoProps {
  link: string
  className?: string
  public_id: string
}

export const Video: React.FC<VideoProps> = ({ className, public_id }) => {
  const [isPlay, setIsPlay] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const playerRef = useRef<ReactPlayer>(null)
  const progress = useRef<HTMLDivElement>(null)
  const progressValue = useRef<HTMLDivElement>(null)
  const wapperVideoRef = useRef<HTMLDivElement>(null)
  const intervalId = useRef<number | null>(null)

  const { data } = useQuery({
    queryKey: ['getResourceVideo', public_id],
    queryFn: async () => {
      const res = await videoApi.getResourceVideo(public_id)
      return res.data
    }
  })

  // hàm sử lý sự kiện khi play and pause video
  const handlePlay = () => {
    if (intervalId.current && data) {
      clearInterval(intervalId.current)
      intervalId.current = null
      setIsPlay((prev) => !prev)
    } else {
      const newIntervalId = setInterval(() => {
        if (playerRef.current && progressValue.current) {
          setCurrentTime(playerRef.current.getCurrentTime())
          const width = (playerRef.current.getCurrentTime() / data?.duration) * 100
          progressValue.current.style.width = `${width}%`
        }
      }, 40)
      setIsPlay((prev) => !prev)
      intervalId.current = newIntervalId as any // Ép kiểu về NodeJS.Timeout
    }
  }

  useEffect(() => {
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current)
      }
    }
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setIsMouseDown(true)
  }, [])

  // hàm sử lý sự kiện khi tua video
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isMouseDown && progressValue.current && progress.current && playerRef.current && data) {
        const widthClick = progress.current?.getBoundingClientRect().left - event.clientX
        const width =
          widthClick <= 0
            ? Math.abs(widthClick) > progress.current?.offsetWidth
              ? 100
              : (Math.abs(widthClick) / progress.current?.offsetWidth) * 100
            : 0
        progressValue.current.style.width = width + '%'
        playerRef.current.seekTo((data?.duration * width) / 100)
        setCurrentTime((data?.duration * width) / 100)
      }
    },
    [isMouseDown && data]
  )

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false)
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  const handleVideoEnded = () => {
    if (intervalId.current) {
      // Video ended, reset play state
      setIsPlay(false)
      setCurrentTime(0)
      clearInterval(intervalId.current)
      intervalId.current = null
    }
  }

  // Chức năng tự động phát video
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach(() => {
  //         handlePlay()
  //       })
  //     },
  //     { threshold: 0.8 } // 80% of the video visible
  //   )

  //   if (wapperVideoRef.current) {
  //     observer.observe(wapperVideoRef.current as any)
  //   }

  //   return () => {
  //     if (wapperVideoRef.current) {
  //       observer.unobserve(wapperVideoRef.current as any)
  //     }
  //   }
  // }, [])

  return (
    <div className='player-wrapper !bg-transparent' ref={wapperVideoRef}>
      <ReactPlayer
        ref={playerRef}
        className={cn('react-player', className)}
        url={data?.url}
        playing={isPlay}
        controls={false}
        onEnded={handleVideoEnded}
      />
      <div className='absolute bottom-0 left-0 w-full bg-black'>
        <div className='flex h-8 items-center justify-between gap-x-3 px-4'>
          <button className='text-white' onClick={handlePlay}>
            {intervalId.current ? (
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
              <span>{timeLineVideo(data?.duration)}</span>
            </div>
            <div className='relative flex h-full w-full cursor-pointer items-center justify-center'>
              <div
                ref={progress}
                className='h-[3px] w-full rounded-lg bg-red-500 shadow-[0_1p_4p_rgba(20_22_26_.3)]'
                onMouseDown={handleMouseDown}
              >
                <div
                  ref={progressValue}
                  className='relative flex items-center justify-end'
                  style={{
                    background: 'white',
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
                  <div className='absolute right-0 h-3 w-3 rounded-full bg-white hover:bg-blue-500'></div>
                  <div className='hover-time py-.5 absolute -top-3 hidden rounded-md bg-white px-2 text-sm'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
