/* eslint-disable react-hooks/exhaustive-deps */
import { cn } from '~/helpers'
import ReactPlayer from 'react-player'

interface VideoProps {
  link: string
  className?: string
  video_id?: string
  public_id?: string
}

export const Video = ({ link, className }: VideoProps) => {
  return (
    <div className='relative flex h-full w-full items-center justify-center bg-black'>
      {/* <source
        key={typeof link !== 'string' ? URL.createObjectURL(link) : ''}
        src={typeof link !== 'string' ? URL.createObjectURL(link) : ''}
        type={typeof link !== 'string' ? link.type : 'mp4'}
      />
      Trình duyệt của bạn không hỗ trợ video. */}
      {/* <video
        src={link}
        controls
        className={cn('h-full w-full', className)}
        onPlay={handlePlay}
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onSeeked={handleSeeking}
      >
        Trình duyệt của bạn không hỗ trợ video.
      </video> */}
      <ReactPlayer
        className={cn('react-player', className)}
        url={link}
        playing={false}
        controls={true}
        style={{
          width: '100%',
          height: '100%'
        }}
        onProgress={(state) => {
          console.log(state)
        }}
      />
    </div>
  )
}
