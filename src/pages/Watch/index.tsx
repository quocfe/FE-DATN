/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query'
import HorizontalVideoCard from './components/HorizontalVideoCard'
import videoApi from '~/apis/video.api'
import { useEffect, useState } from 'react'
import FormCreateVideo from './components/form-create-video'
import InfiniteScroll from 'react-infinite-scroll-component'

function Watch() {
  const [videos, setVideos] = useState<DataVideoResponse[]>([])
  // const [isScroll, setIsScroll] = useState<boolean>(false)
  const [loadMoreNumber, setLoadMoreNumber] = useState(1) // Trang hiện tại, bắt đầu từ trang 1

  const { data, refetch, isSuccess } = useQuery({
    queryKey: ['getVideos', loadMoreNumber],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await videoApi.get(loadMoreNumber)
      // setVideos((prev) => [...prev, ...(res?.data.content || [])])
      return res?.data as VideoResponse
    }
    // enabled: false // Không tự động gọi khi component mount
  })

  useEffect(() => {
    if (data && isSuccess) {
      setVideos((prev) => [...prev, ...(data.content || [])])
    }
  }, [data, isSuccess])

  useEffect(() => {
    refetch()
  }, [loadMoreNumber])

  return (
    <div>
      <FormCreateVideo getVideos={refetch as any} />

      {/* Danh sách video */}
      <div className='mx-auto sm:max-w-[95%] md:max-w-[80%] lg:max-w-[70%]'>
        <InfiniteScroll
          dataLength={data?.totalRecords ?? 0}
          next={() => {
            if (data && videos.length < data?.totalRecords) {
              setLoadMoreNumber((prev) => prev + 1)
              // refetch()
            }
          }}
          // height={800}

          hasMore={true} // Replace with a condition based on your data source
          loader={<></>}
          endMessage={<p>No more data to load.</p>}
        >
          {videos.map((item: DataVideoResponse) => (
            <div className='mt-6 flex flex-col gap-y-10 rounded-lg bg-white py-2 shadow-sm' key={item.id}>
              <HorizontalVideoCard video={item} setVideoData={setVideos} />
            </div>
          ))}
        </InfiniteScroll>
        {/* {isFetchingMore && <LazyLoadingVideo />}  */}
      </div>
    </div>
  )
}

export default Watch
