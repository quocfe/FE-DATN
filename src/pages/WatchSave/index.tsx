import { useQuery } from '@tanstack/react-query'
import React from 'react'
import favoriteVideoApi from '~/apis/favoriteVideo.api'
import Content from './component/content'
import { Video } from '~/components/design-systems'

const WatchSave = () => {
  const { data: favorites, refetch: refetchFavoriteVideos } = useQuery({
    queryKey: ['getFavoriteVideos'],
    queryFn: async () => {
      const res = await favoriteVideoApi.getFavoriteVideos()
      return res.data.data
    }
  })

  console.log(favorites)

  return (
    <div className='mx-auto sm:max-w-[95%] md:max-w-[80%] lg:max-w-[70%]'>
      {favorites &&
        favorites.map((item, index) => (
          <div className='mt-6 flex gap-y-10 rounded-xl bg-white shadow-sm' key={index}>
            <div className='grid w-full grid-cols-5 gap-x-2'>
              <div className='col-span-2 '>
                <Video dataVideo={item.video} />
              </div>
              <div className='col-span-3'>
                <Content video={item} refetchFavoriteVideos={refetchFavoriteVideos} />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default WatchSave
