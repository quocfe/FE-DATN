import { useQuery } from '@tanstack/react-query'
import React from 'react'
import favoriteVideoApi from '~/apis/favoriteVideo.api'
import Content from './component/content'
import { Video } from '~/components/design-systems'
import { useNavigate } from 'react-router-dom'

const WatchSave = () => {
  const navigate = useNavigate()

  const { data: favorites, refetch: refetchFavoriteVideos } = useQuery({
    queryKey: ['getFavoriteVideos'],
    queryFn: async () => {
      const res = await favoriteVideoApi.getFavoriteVideos()
      return res.data.data
    }
  })

  return (
    <div className='mx-auto sm:max-w-[95%] md:max-w-[80%] lg:max-w-[70%]'>
      {favorites && favorites.length > 0 ? (
        favorites.map((item, index) => (
          <div className='mt-6 flex gap-y-10 rounded-xl bg-white shadow-sm' key={index}>
            <div className='grid w-full grid-cols-5 gap-x-2'>
              <div className='relative col-span-2'>
                <div className='absolute bottom-0 left-0 right-0 top-0 z-10 text-white'>
                  <div
                    className='w-ful flex h-full cursor-pointer items-center justify-center'
                    onClick={() => {
                      return navigate(`/watch/${item.video.id}`)
                    }}
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-10'>
                      <path
                        fillRule='evenodd'
                        d='M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                </div>
                <Video dataVideo={item.video} />
              </div>
              <div className='col-span-3'>
                <Content video={item} refetchFavoriteVideos={refetchFavoriteVideos} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <h4 className='mt-4 py-10 text-center text-[36px] font-bold !text-gray-500'>Không có video nào được lưu</h4>
      )}
    </div>
  )
}

export default WatchSave
