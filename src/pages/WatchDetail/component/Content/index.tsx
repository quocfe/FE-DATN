import { IonIcon } from '@ionic/react'
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Video } from '~/components/design-systems'
import { useQuery } from '@tanstack/react-query'
import videoApi from '~/apis/video.api'
import { useParams } from 'react-router-dom'
import SvgIcon from '~/helpers/SvgIcon'
import AddCommentVideo from '../add-comment-video'
import CommentVideo from '../comment-video'

const Content = () => {
  const { id } = useParams()

  const [refetchComment, setRefetchComment] = useState<boolean>(false)

  const { data: videoData } = useQuery({
    queryKey: ['getOne'],
    queryFn: async () => {
      const res = await videoApi.getOneVideo(id)
      return res?.data
    }
  })

  return (
    <div className='mx-auto grid w-full max-w-max grid-cols-3 gap-6'>
      <div className='col-span-3 lg:col-span-2'>
        {/*  post image*/}
        <div className='border1 dark:bg-dark2 rounded-xl bg-white text-sm font-medium shadow-sm'>
          {/* video player */}

          <div className='h-[445px] w-full'>
            <Video link={videoData?.url ?? ''} />
          </div>
          {/* post heading */}
          <div className='flex gap-3 p-2.5 text-sm font-medium sm:p-4'>
            <a href='timeline.html'>
              <img src={videoData?.user.Profile.cover_photo} alt='' className='h-9 w-9 rounded-full' />
            </a>
            <div className='flex-1'>
              <a href='timeline.html'>
                <h4 className='text-black dark:text-white'> {videoData?.user.first_name} </h4>
              </a>
              <div className='text-xs text-gray-500 dark:text-white/80'> 2 hours ago</div>
            </div>
            <div className='-mr-1'>
              <button type='button' className='button-icon h-8 w-8'>
                <IonIcon className='text-xl' name='ellipsis-horizontal' />
              </button>
              <div
                className='w-[245px]'
                uk-dropdown='pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click'
              >
                <nav>
                  <a href='#'>
                    <IonIcon className='shrink-0 text-xl' name='bookmark-outline' /> Add to favorites
                  </a>
                  <a href='#'>
                    <IonIcon className='shrink-0 text-xl' name='notifications-off-outline' /> Mute Notification
                  </a>
                  <a href='#'>
                    <IonIcon className='shrink-0 text-xl' name='flag-outline' /> Report this post
                  </a>
                  <a href='#'>
                    <IonIcon className='shrink-0 text-xl' name='share-outline' /> Share your profile
                  </a>
                  <hr />
                  <a href='#' className='text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50'>
                    <IonIcon className='shrink-0 text-xl' name='stop-circle-outline' /> Unfollow
                  </a>
                </nav>
              </div>
            </div>
          </div>
          <p className='px-6 text-sm font-normal leading-6'>{videoData?.content}</p>
          {/* post icons */}
          <div className='flex items-center gap-4 text-xs font-semibold sm:p-4'>
            <div className='card-list-body relative px-3'>
              <div className='flex items-center gap-x-4'>
                <button className='relative flex items-center gap-x-2 rounded-md py-[6px] hover:bg-secondery dark:text-white'>
                  <SvgIcon name='like' className='h-5 w-5' />
                  <p className='text-xs font-medium'>Thích</p>
                </button>
                <button
                  // to={ROUTE_PATH.WATCH + '/' + video.id}
                  className='relative flex items-center gap-x-2 rounded-md px-3 py-[6px] hover:bg-secondery dark:text-white'
                >
                  <SvgIcon name='comment' className='h-5 w-5' />
                  <p className='text-xs font-medium'>Bình luận</p>
                </button>
                <button className='relative flex items-center gap-x-2 rounded-md px-3 py-[6px] hover:bg-secondery dark:text-white'>
                  <SvgIcon name='share' className='h-5 w-5' />
                  <p className='text-xs font-medium'>Chia sẻ</p>
                </button>
              </div>
              <div className='flex items-center gap-x-4'></div>
            </div>
          </div>
          {/* comments */}
          {/* <div className='relative space-y-3 border-t border-gray-100 p-2.5 font-normal sm:p-6 dark:border-slate-700/40'>
            <div className='relative flex items-start gap-3'>
              <a href='timeline.html'>
                <img src='assets/images/avatars/avatar-3.jpg' alt='' className='mt-1 h-6 w-6 rounded-full' />
              </a>
              <div className='flex-1'>
                <a href='timeline.html' className='inline-block font-medium text-black dark:text-white'>
                  Monroe Parker
                </a>
                <p className='mt-0.5'>What a beautiful photo! I love it. 😍 </p>
              </div>
            </div>
            <div className='relative flex items-start gap-3'>
              <a href='timeline.html'>
                <img src='assets/images/avatars/avatar-2.jpg' alt='' className='mt-1 h-6 w-6 rounded-full' />
              </a>
              <div className='flex-1'>
                <a href='timeline.html' className='inline-block font-medium text-black dark:text-white'>
                  John Michael
                </a>
                <p className='mt-0.5'> You captured the moment.😎 </p>
              </div>
            </div>
            <div className='relative flex items-start gap-3'>
              <a href='timeline.html'>
                <img src='assets/images/avatars/avatar-5.jpg' alt='' className='mt-1 h-6 w-6 rounded-full' />
              </a>
              <div className='flex-1'>
                <a href='timeline.html' className='inline-block font-medium text-black dark:text-white'>
                  James Lewis
                </a>
                <p className='mt-0.5'>What a beautiful photo! I love it. 😍 </p>
              </div>
            </div>
            <div className='relative flex items-start gap-3'>
              <a href='timeline.html'>
                <img src='assets/images/avatars/avatar-4.jpg' alt='' className='mt-1 h-6 w-6 rounded-full' />
              </a>
              <div className='flex-1'>
                <a href='timeline.html' className='inline-block font-medium text-black dark:text-white'>
                  Martin Gray
                </a>
                <p className='mt-0.5'> You captured the moment.😎 </p>
              </div>
            </div>
            <button type='button' className='mt-2 flex items-center   gap-1.5 text-blue-500'>
              <IonIcon name='chevron-down-outline' className='ml-auto duration-200 group-aria-expanded:rotate-180' />
              More Comment
            </button>
          </div> */}

          <div id='scroll-base' className='h-[400px] px-4'>
            <CommentVideo refetchCommentVideo={refetchComment} />
          </div>
          {/* add comment */}
          <AddCommentVideo video_id={videoData?.id as string} setRefetchComment={setRefetchComment} />
        </div>
        <br />
        <br />
      </div>
      {/* sidebar */}
      <div className='bottom-0 right-0 top-[75px] !h-[calc(100vh-5.5rem)] !w-auto pr-2 sm:col-span-3 lg:fixed lg:col-span-1'>
        <Sidebar />
      </div>
    </div>
  )
}

export default Content
