import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import likeVideoApi from '~/apis/like-video.api'
import { Video } from '~/components/design-systems'
import { ROUTE_PATH } from '~/constants'
import { cn } from '~/helpers'
import SvgIcon from '~/helpers/SvgIcon'
import { calculateTimeAgo } from '~/utils/helpers'
import ShowLikeOfComment from '~/components/design-systems/show-like-of-comment'
import VideoAction from '~/components/design-systems/video-action'
import SlateEditor from '~/components/design-systems/slate-editor'

interface HorizontalVideoCardProps {
  video: DataVideoResponse
  setVideoData: React.Dispatch<React.SetStateAction<DataVideoResponse[]>>
}

const HorizontalVideoCard = ({ video, setVideoData }: HorizontalVideoCardProps) => {
  const [userLike, setUserLike] = useState<boolean>(video.isLike)

  const { mutate: handlePatchLikeVideo } = useMutation({
    mutationFn: async () => {
      const res = await likeVideoApi.pathLikeVideo(video.id)
      return res.data
    },
    onSuccess: () => {
      setUserLike((prev) => !prev)
    }
  })
  return (
    <React.Fragment>
      <div className='flex flex-col gap-y-2'>
        <div className='flex items-start justify-between px-2 pt-2'>
          <div className=''>
            <div className='flex gap-x-2 px-2'>
              <div className='relative shrink-0 cursor-pointer rounded-full'>
                <img className='size-10 rounded-full shadow' src={video?.user.Profile.cover_photo} alt='' />
              </div>
              <div className=''>
                <p className='font-medium text-black'>{video?.user.first_name}</p>
                <p className='text-[12px]'>{calculateTimeAgo(video.createdAt as unknown as string)}</p>
              </div>
            </div>
            {/* <div className='mt-2 text-sm'>{video.content}</div> */}
            <SlateEditor
              className='!my-5 overflow-y-auto overflow-x-hidden px-2'
              valueSaleRender={JSON.parse(video.content)}
              readOnly
            />
          </div>
          {/* Action video item */}
          <VideoAction dataVideo={video} setVideoData={setVideoData} />
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
                  'text-blue-500': userLike
                }
              )}
              onClick={handlePatchLikeVideo as never}
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
              <ShowLikeOfComment dataVideo={video} setUserLike={setUserLike} userLike={userLike} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(HorizontalVideoCard)
