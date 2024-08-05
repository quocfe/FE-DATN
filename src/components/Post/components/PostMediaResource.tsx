import { IonIcon } from '@ionic/react'

interface Props {
  media_resources: PostMediaResource[]
}

function PostMediaResource({ media_resources }: Props) {
  return (
    <div className='relative mt-2 h-full w-full sm:px-4'>
      <div
        className='uk-visible-toggle relative h-full w-full'
        tabIndex={-1}
        uk-slideshow='finite: true; autoplay: true'
      >
        <ul className='uk-slideshow-items h-full w-full'>
          {media_resources.map((media) => {
            if (media.media_type === 'image') {
              return (
                <li key={media.media_id} className='h-full w-full cursor-pointer overflow-hidden rounded-md'>
                  <img src={media.media_url} className='h-full w-full object-cover' alt='media' />
                </li>
              )
            } else if (media.media_type === 'video') {
              return (
                <li key={media.media_id} className='h-full w-full cursor-pointer overflow-hidden rounded-md'>
                  <video className='h-full w-full object-cover' controls src={media.media_url}></video>
                </li>
              )
            }
            return null
          })}
        </ul>
        {/* navigation */}
        <a
          className='dark:bg-dark3 absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white shadow'
          href='#'
          uk-slideshow-item='previous'
        >
          <IonIcon icon='chevron-back' className='text-2xl' />
        </a>
        <a
          className='dark:bg-dark3 absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white shadow'
          href='#'
          uk-slideshow-item='next'
        >
          <IonIcon icon='chevron-forward' className='text-2xl' />
        </a>
      </div>
    </div>
  )
}

export default PostMediaResource
