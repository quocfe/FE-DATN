import { useQuery } from '@tanstack/react-query'
import HorizontalVideoCard from './components/HorizontalVideoCard'
// import SwiperVideoCard from './components/SwiperVideoCard'
import FormCreateVideo from './components/form-create-video'
import videoApi from '~/apis/video.api'

function Watch() {
  const { data } = useQuery({
    queryKey: ['getVideos'],
    queryFn: async () => {
      return await videoApi.get()
    }
  })

  return (
    <div>
      <FormCreateVideo />

      {/* Swiper video media */}
      {/* <SwiperVideoCard /> */}
      {/* card list  */}
      <div className='mx-auto sm:max-w-[95%] md:max-w-[80%] lg:max-w-[70%]'>
        {data &&
          data?.data?.map((item: DataVideoResponse) => {
            return (
              <div className='mt-6 flex flex-col gap-y-10 rounded-lg bg-white py-2 shadow-sm' key={item.id}>
                <HorizontalVideoCard video={item} />
              </div>
            )
          })}
      </div>
      {/* load more */}
      <div className='my-6 flex justify-center'>
        <button type='button' className='dark:bg-dark2 rounded-full bg-white px-5 py-2 text-sm font-semibold shadow-md'>
          Load more...
        </button>
      </div>
    </div>
  )
}

export default Watch
