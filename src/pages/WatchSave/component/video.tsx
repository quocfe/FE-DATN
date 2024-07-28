// import { useQuery } from '@tanstack/react-query'
// import React from 'react'
// import ReactPlayer from 'react-player'
// import { Link } from 'react-router-dom'
// import videoApi from '~/apis/video.api'
// import '~/components/design-systems/video/video-style.css'
// import { ROUTE_PATH } from '~/constants'

// interface VideoProps {
//   video_id: string
//   public_id: string
// }

// const Video: React.FC<VideoProps> = ({ video_id, public_id }) => {
//   const { data } = useQuery({
//     queryKey: ['getResourceVideo', public_id],
//     queryFn: async () => {
//       const res = await videoApi.getResourceVideo(public_id)
//       return res.data
//     }
//   })

//   return (
//     <div className='player-wrapper relative rounded-l-xl bg-black'>
//       <ReactPlayer className='react-player' url={data?.url} controls={false} />
//       <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
//         <Link
//           to={ROUTE_PATH.WATCH + `/${video_id}`}
//           className='block rounded-full border-2 border-white p-3 text-white'
//         >
//           <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
//             <path
//               fillRule='evenodd'
//               d='M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z'
//               clipRule='evenodd'
//             />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default Video
