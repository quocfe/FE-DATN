import { IonIcon } from '@ionic/react'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import favoriteVideoApi from '~/apis/favoriteVideo.api'
import useAuthStore from '~/store/auth.store'

interface VideoActionProps {
  dataVideo: DataVideoResponse
}

const VideoAction = ({ dataVideo }: VideoActionProps) => {
  const { profile } = useAuthStore()

  // Lưu video
  const { mutate: handleFavoriteVideo } = useMutation({
    mutationFn: async () => {
      const res = await favoriteVideoApi.patchFavoriteVideo(dataVideo.id)
      return res
    },
    onSuccess: () => {
      getFavoriteVideo()
    }
  })

  // Kiểm tra video đã được lưu hay chưa
  const {
    data: favoriteVideo,
    mutate: getFavoriteVideo,
    isPending: loadingGetFavorite
  } = useMutation({
    mutationFn: async () => {
      const res = await favoriteVideoApi.getFavoriteVideo(dataVideo.id)
      return res.data.data
    }
  })

  const handleClickActionVideo = () => {
    if (!favoriteVideo) {
      getFavoriteVideo()
    }
  }

  return (
    <div className=''>
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
          {loadingGetFavorite ? (
            <div role='status'>
              <svg
                aria-hidden='true'
                className='h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
            </div>
          ) : (
            <React.Fragment>
              {/* Favorite Video */}
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

              {/* Report video with video.user_id !== profile?.user_id */}
              {dataVideo?.user_id !== profile?.user_id && (
                <a href='#'>
                  <IonIcon className='text-xl' name='flag-outline' />
                  <div className='flex flex-col '>
                    <span className='text-sm font-medium text-black'>Báo cáo video</span>
                    <span className='text-[12px] font-normal text-[#65676B]'>Tôi lo ngại về video này.</span>
                  </div>
                </a>
              )}

              {/* Delete video with video.user_id === profile?.user_id */}
              {dataVideo.user_id === profile?.user_id && (
                <React.Fragment>
                  <hr />
                  <a href='#' className='text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50'>
                    <IonIcon className='text-xl' name='trash-outline' /> Delete
                  </a>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  )
}

export default VideoAction
