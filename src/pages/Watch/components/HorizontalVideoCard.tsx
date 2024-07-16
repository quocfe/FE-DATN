import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import likeVideoApi from '~/apis/like-video.api'
import { Video } from '~/components/design-systems'
import { ROUTE_PATH } from '~/constants'
import { cn } from '~/helpers'
import SvgIcon from '~/helpers/SvgIcon'
import { calculateTimeAgo } from '~/utils/helpers'
import ReportVideo from './report-video'
import ShowLikeOfComment from '~/pages/WatchDetail/component/show-like-of-comment'

interface HorizontalVideoCardProps {
  video: DataVideoResponse
}

const HorizontalVideoCard = ({ video }: HorizontalVideoCardProps) => {
  const { data: likeVideo, refetch } = useQuery({
    queryKey: ['getLikeVideos', video.id],
    queryFn: async () => {
      const res = await likeVideoApi.getLikeCountVideo(video.id)
      return res.data
    }
  })

  const { mutate: handlePatchLikeVideo } = useMutation({
    mutationFn: async () => {
      const res = await likeVideoApi.pathLikeVideo(video.id)
      return res.data
    },
    onSuccess: () => {
      refetch()
    }
  })

  return (
    <React.Fragment>
      <div className='flex flex-col gap-y-2'>
        <div className='flex items-start justify-between px-2'>
          <div className=''>
            <div className='flex gap-x-2'>
              <div className='relative shrink-0 cursor-pointer rounded-full'>
                <img
                  className='sm:w-h-11 h-10 w-11 shrink-0 rounded-full shadow sm:h-11'
                  src={video?.user.Profile.cover_photo}
                  alt=''
                />
              </div>
              <div className=''>
                <p className='font-medium text-black'>{video?.user.first_name}</p>
                <p className='text-sm'>{calculateTimeAgo(video.createdAt as unknown as string)}</p>
              </div>
            </div>
            <div className='mt-2 text-sm'>{video.content}</div>
          </div>
          <ReportVideo dataVideo={video} />
        </div>
        {/* <img src='src/assets/images/video/img-2.png' alt='' />
            <img src='' className='absolute !left-1/2 !top-1/2 !h-12 !w-12 -translate-x-1/2 -translate-y-1/2' alt='' /> */}
        <Video dataVideo={video} />
        <div className='card-list-body relative mt-2 flex items-center justify-between px-2'>
          <div className='flex items-center gap-x-4'>
            <button
              className={cn(
                'relative flex items-center gap-x-2 rounded-md px-3 py-[6px] hover:bg-secondery dark:text-white',
                {
                  'text-blue-500': video.isLikes.length > 0
                }
              )}
              onClick={() => {
                console.log('Click like')
                handlePatchLikeVideo()
              }}
            >
              <SvgIcon name='like' className='h-5 w-5' />
              <p className='text-xs font-medium'>Thích</p>
            </button>
            <Link
              to={ROUTE_PATH.WATCH + '/' + video.id}
              className='relative flex items-center gap-x-2 rounded-md px-3 py-[6px] hover:bg-secondery dark:text-white'
            >
              <SvgIcon name='comment' className='h-5 w-5' />
              <p className='text-xs font-medium'>Bình luận</p>
            </Link>
            <button className='relative flex items-center gap-x-2 rounded-md px-3 py-[6px] hover:bg-secondery dark:text-white'>
              <SvgIcon name='share' className='h-5 w-5' />
              <p className='text-xs font-medium'>Chia sẻ</p>
            </button>
          </div>
          <div className='flex items-center gap-x-4 px-2'>
            <div className='flex gap-x-3'>
              {/* <div className='flex items-center justify-center rounded-full bg-blue-600 p-[6px]'>
                <SvgIcon name='like' className='h-3 w-3 text-white' />
              </div>
              <p className='text-sm'>{likeVideo?.data?.likeCount}</p> */}
              <ShowLikeOfComment dataVideo={video} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default HorizontalVideoCard
