import { IonIcon } from '@ionic/react'
import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query'
import React from 'react'
import favoriteVideoApi from '~/apis/favoriteVideo.api'
import SlateEditor from '~/components/design-systems/slate-editor'
import useAuthStore from '~/store/auth.store'
import { calculateTimeAgo } from '~/utils/helpers'

interface ContentProps {
  video: DataFavoriteVideoResponse
  refetchFavoriteVideos: (options?: RefetchOptions) => Promise<QueryObserverResult<DataFavoriteVideoResponse[], Error>>
}

const Content = ({ video, refetchFavoriteVideos }: ContentProps) => {
  const { profile } = useAuthStore()

  const { mutate: handleFavoriteVideo } = useMutation({
    mutationFn: async () => {
      const res = await favoriteVideoApi.patchFavoriteVideo(video.video.id)
      return res
    },
    onSuccess: () => {
      refetchFavoriteVideos()
    }
  })

  const { data: favoriteVideo, mutate: getFavoriteVideo } = useMutation({
    mutationFn: async () => {
      const res = await favoriteVideoApi.getFavoriteVideo(video.video.id)
      return res.data.data
    }
    // onSuccess: (data) => {
    // }
  })

  const handleClickActionVideo = () => {
    if (!favoriteVideo) {
      getFavoriteVideo()
    }
  }

  return (
    <div className='relative flex items-start justify-between px-2 py-1'>
      <div className='py-2'>
        <div className='flex gap-x-2'>
          <div className='relative shrink-0 cursor-pointer rounded-full'>
            <img
              className='h-10 w-10 shrink-0 rounded-full shadow'
              src={video.video.user.Profile.profile_picture}
              alt=''
            />
          </div>
          <div className=''>
            <p className='text-sm font-medium text-black'>{video.video.user.first_name}</p>
            <p className='text-[12px]'>{calculateTimeAgo(video.createdAt as unknown as string)}</p>
          </div>
        </div>
        <div className='mt-2 text-sm'>
          <SlateEditor
            className='!my-5 overflow-y-auto overflow-x-hidden px-2'
            valueSaleRender={JSON.parse(video.video.content)}
            readOnly
          />
        </div>
      </div>
      <div className='absolute right-2 top-3'>
        <button
          type='button'
          className='grid h-10 w-10 place-items-center rounded-full hover:bg-secondery'
          onClick={handleClickActionVideo}
        >
          <IonIcon className='text-2xl' name='ellipsis-horizontal' />
        </button>
        <div
          className='w-[245px]'
          uk-dropdown='pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click'
        >
          <nav>
            <button
              className='flex w-full items-center gap-x-2 rounded-lg px-2.5 py-2 hover:bg-slate-100'
              onClick={() => handleFavoriteVideo()}
            >
              {favoriteVideo?.isFavorite ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5'
                  />
                </svg>
              ) : (
                <IonIcon className='size-5' name='bookmark-outline' />
              )}
              <div className='flex flex-col items-start'>
                <span className='text-sm font-medium text-black'>
                  {favoriteVideo?.isFavorite ? 'Bỏ lưu video' : 'Lưu video'}
                </span>
                <span className='text-[12px] font-normal text-[#65676B]'>
                  {favoriteVideo?.isFavorite ? 'Gõ bỏ phần video đã lưu' : 'Thêm vào phần Video đã lưu.'}
                </span>
              </div>
            </button>
            {/* <a href='#'>
    <IonIcon className='text-xl' name='albums-outline' /> add to collections
  </a> */}
            {video.video.user_id !== profile?.user_id && (
              <a href='#'>
                <IonIcon className='text-xl' name='flag-outline' />
                <div className='flex flex-col '>
                  <span className='text-sm font-medium text-black'>Báo cáo video</span>
                  <span className='text-[12px] font-normal text-[#65676B]'>Tôi lo ngại về video này.</span>
                </div>
              </a>
            )}

            {/* {video.video.user_id === profile?.user_id && (
              <React.Fragment>
                <hr />
                <a href='#' className='text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50'>
                  <IonIcon className='text-xl' name='trash-outline' /> Delete
                </a>
              </React.Fragment>
            )} */}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Content
