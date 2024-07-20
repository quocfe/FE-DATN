import { useQuery } from '@tanstack/react-query'
import HorizontalVideoCard from './components/HorizontalVideoCard'
import videoApi from '~/apis/video.api'
import { useEffect, useState } from 'react'
import FormCreateVideo from './components/form-create-video'
import LazyLoadingVideo from './components/lazy-loading-video'

function Watch() {
  const [videos, setVideos] = useState<DataVideoResponse[]>([])
  const [loadMoreNumber, setLoadMoreNumber] = useState(1) // Trang hiện tại, bắt đầu từ trang 1
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const { data, refetch } = useQuery({
    queryKey: ['getVideos', loadMoreNumber],
    queryFn: async () => {
      const res = await videoApi.get(loadMoreNumber)
      return res.data
    },
    enabled: false // Không tự động gọi khi component mount
  })

  useEffect(() => {
    refetch()
  }, [loadMoreNumber, refetch])

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 100
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement

      if (scrollTop + clientHeight >= scrollHeight - threshold && !isFetchingMore) {
        setIsFetchingMore(true) // Bắt đầu tải thêm
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isFetchingMore])

  // useEffect(() => {
  //   if (isFetchingMore) {
  //     setLoadMoreNumber((prev) => prev + 1) // Tăng số trang để gọi API load thêm
  //   }
  // }, [isFetchingMore])

  useEffect(() => {
    if (data) {
      setVideos((prev) => [...prev, ...data])
      // setIsFetchingMore(false) // Kết thúc khi đã tải xong
    }
  }, [data])

  return (
    <div>
      <FormCreateVideo getVideos={refetch} />

      {/* Danh sách video */}
      <div className='mx-auto sm:max-w-[95%] md:max-w-[80%] lg:max-w-[70%]'>
        {videos.map((item: DataVideoResponse) => (
          <div className='mt-6 flex flex-col gap-y-10 rounded-lg bg-white py-2 shadow-sm' key={item.id}>
            <HorizontalVideoCard video={item} setVideoData={setVideos} />
          </div>
        ))}
        {isFetchingMore && <LazyLoadingVideo />} {/* Hiển thị loading khi đang tải thêm */}
      </div>

      {/* Nút load more (nếu cần) */}
      {/* <div className='my-6 flex justify-center'>
        <button
          type='button'
          className='dark:bg-dark2 rounded-full bg-white px-5 py-2 text-sm font-semibold shadow-md'
          onClick={() => setLoadMoreNumber((prev) => prev + 1)}
        >
          Load more...
        </button>
      </div> */}
    </div>
  )
}

export default Watch
