/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import HorizontalVideoCard from '../Watch/components/HorizontalVideoCard'
import videoApi from '~/apis/video.api'
import { useSearchParams } from 'react-router-dom'

const WatchSearch = () => {
  const [searchParams] = useSearchParams()
  const searchValue = useMemo(() => searchParams.get('q') ?? '', [searchParams])
  const [videos, setVideos] = useState<DataVideoResponse[]>([])
  const [loadMoreNumber, setLoadMoreNumber] = useState(1) // Trang hiện tại, bắt đầu từ trang 1

  const { data, refetch, isSuccess } = useQuery({
    queryKey: ['getVideos', loadMoreNumber, searchValue],
    queryFn: async () => {
      const res = await videoApi.get(loadMoreNumber, searchValue)
      return res?.data as VideoResponse
    },
    enabled: !!searchValue // Chỉ gọi query khi có searchValue
  })

  useEffect(() => {
    if (isSuccess && data) {
      setVideos((prev) => [...prev, ...(data.content || [])])
    }
  }, [data, isSuccess])

  useEffect(() => {
    if (searchValue) {
      setLoadMoreNumber(1) // Reset to first page when search value changes
      refetch()
    }
  }, [searchValue])

  return (
    <div className='mx-auto sm:max-w-[95%] md:max-w-[80%] lg:max-w-[70%]'>
      {/* {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading videos.</p>}
      {!isLoading && !isError && ( */}
      <InfiniteScroll
        dataLength={videos.length}
        next={() => {
          if (data && videos.length < data.totalRecords) {
            setLoadMoreNumber((prev) => prev + 1)
            refetch()
          }
        }}
        // hasMore={videos.length < (data?.totalRecords ?? 0)}
        hasMore={true}
        loader={<></>}
        endMessage={<p>No more data to load.</p>}
        // scrollableTarget='scrollableDiv'
      >
        {videos.length > 0 ? (
          videos.map((item: DataVideoResponse) => (
            <div className='relative mt-6 flex flex-col gap-y-10 rounded-lg bg-white py-2 shadow-sm' key={item.id}>
              <HorizontalVideoCard video={item} setVideoData={setVideos} />
            </div>
          ))
        ) : (
          <h4 className='mt-4 py-10 text-center text-[36px] font-bold !text-gray-500'>Không tìm thấy video phù hợp</h4>
        )}
      </InfiniteScroll>
      {/* )} */}
    </div>
  )
}

export default WatchSearch
