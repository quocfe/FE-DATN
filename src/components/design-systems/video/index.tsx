/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from 'react'
import { cn } from '~/helpers'

interface VideoProps {
  link: string
  className?: string
  video_id?: string
}

export const Video = ({ link, className }: VideoProps) => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [startTime, setStartTime] = useState<number>(0)
  const [watchedEnoughTime, setWatchedEnoughTime] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    setPlaying(true)
    setStartTime(videoRef.current?.currentTime || 0)
  }

  const handleTimeUpdate = () => {
    if (videoRef.current && playing && !watchedEnoughTime) {
      const currentTime = videoRef.current.currentTime
      if (currentTime - startTime >= 5) {
        setWatchedEnoughTime(true)
        console.log('User has watched at least 5 seconds of the video')
        // Call API to record view count here
      }
    }
  }

  const handleSeeking = () => {
    if (watchedEnoughTime) {
      // User has watched enough time, prevent seeking
      videoRef.current!.currentTime = startTime + 5 // Go back to 5 seconds after start time
    }
  }

  return (
    <div className='h-full w-full bg-black'>
      {/* <source
        key={typeof link !== 'string' ? URL.createObjectURL(link) : ''}
        src={typeof link !== 'string' ? URL.createObjectURL(link) : ''}
        type={typeof link !== 'string' ? link.type : 'mp4'}
      />
      Trình duyệt của bạn không hỗ trợ video. */}
      <video
        src={link}
        controls
        className={cn('h-full w-full', className)}
        onPlay={handlePlay}
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onSeeked={handleSeeking}
      >
        Trình duyệt của bạn không hỗ trợ video.
      </video>
    </div>
  )
}
