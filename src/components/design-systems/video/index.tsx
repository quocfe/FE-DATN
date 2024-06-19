import { cn } from '~/helpers'

interface VideoProps {
  link: string
  className?: string
}

export const Video = ({ link, className }: VideoProps) => {
  return (
    <div className='h-full w-full bg-black'>
      {/* <source
        key={typeof link !== 'string' ? URL.createObjectURL(link) : ''}
        src={typeof link !== 'string' ? URL.createObjectURL(link) : ''}
        type={typeof link !== 'string' ? link.type : 'mp4'}
      />
      Trình duyệt của bạn không hỗ trợ video. */}
      <video src={link} controls className={cn('h-full w-full', className)}>
        Trình duyệt của bạn không hỗ trợ video.
      </video>
    </div>
  )
}
