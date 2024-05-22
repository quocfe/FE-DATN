import { IonIcon } from '@ionic/react'
import React from 'react'

const VideoPlayer = () => {
  return (
    <div className='videoFrame' uk-sticky='cls-active: sticked uk-animation-scale-up; media: 992; top:600'>
      {/* <iframe
        src='http://res.cloudinary.com/dizwixa7c/video/upload/v1716403685/w94elbpvrf5q5bjx97hs.mp4'
        className='aspect-video w-full  rounded-t-md'
        uk-video='autoplay: inview'
      /> */}

      <video className='aspect-video w-full  rounded-t-md' autoPlay muted>
        <source src='http://res.cloudinary.com/dizwixa7c/video/upload/v1716403685/w94elbpvrf5q5bjx97hs.mp4' />
        <source src='movie.ogg' type='video/ogg' />
        Your browser does not support the video tag.
      </video>

      {/* close button after stiky */}
      <button type='button' id='closebtn' className='hidden' uk-toggle='target:.videoFrame ; cls: hide'>
        <IonIcon name='close' />{' '}
      </button>
    </div>
  )
}

export default VideoPlayer
