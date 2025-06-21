import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useQueryMediaResources from '~/hooks/queries/user/useQueryMediaResources'
import useQueryUserMediaResources from '~/hooks/queries/user/useQueryUserMediaResources'
import useAuthStore from '~/store/auth.store'

function UserMediaResources() {
  const { profile } = useAuthStore()
  const { user_id } = useParams()
  const [imageRange, setImageRange] = useState<number>(8)
  const [videoRange, setVideoRange] = useState<number>(3)
  const { data } = useQueryUserMediaResources(user_id ?? '')

  const media_resources = data?.data.data.media_resources ?? []
  const images = media_resources.filter((media) => media.media_type === 'image')
  const videos = media_resources.filter((media) => media.media_type === 'video')

  const renderMediaResources = (media_type: 'image' | 'video') => {
    if (media_type === 'image') {
      if (images.length === 0) {
        return <p className='col-span-3 mt-5 text-center text-sm text-gray-500'>Chưa có hình ảnh</p>
      }

      return images.slice(0, imageRange).map((image) => {
        return (
          <div className='h-40 w-full' key={image.media_id}>
            <img src={image.media_url} className='h-full w-full rounded-md object-cover' alt='' />
          </div>
        )
      })
    } else {
      if (videos.length === 0) {
        return <p className='col-span-3 mt-5 text-center text-sm text-gray-500'>Chưa có video</p>
      }

      return videos.slice(0, videoRange).map((video) => {
        return <video key={video.media_id} src={video.media_url} className='w-full object-cover' controls></video>
      })
    }
  }

  return (
    <div className='pb-10'>
      <div className='mb-5 block'>
        <h1 className='mb-2 font-medium'>Hình ảnh</h1>
        <div className='grid grid-cols-4 gap-4'>{renderMediaResources('image')}</div>
        {images.length - imageRange > 0 && (
          <a
            className='mt-5 block cursor-pointer text-center hover:text-primary'
            onClick={() => setImageRange(imageRange + 8)}
          >
            Xem thêm
          </a>
        )}
      </div>
      <div className='block'>
        <h1 className='mb-2 font-medium'>Video</h1>
        <div className='grid grid-cols-3 gap-4'>{renderMediaResources('video')}</div>
        {videos.length - videoRange > 0 && (
          <a
            className='mt-5 block cursor-pointer text-center hover:text-primary'
            onClick={() => setVideoRange(videoRange + 4)}
          >
            Xem thêm
          </a>
        )}
      </div>
    </div>
  )
}

export default UserMediaResources
