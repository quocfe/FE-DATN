import React from 'react'

const LazyLoadingVideo = () => {
  return (
    <div role='status' className='animate-pulse'>
      <div className='mb-3 flex max-w-sm gap-4 px-4 py-3 '>
        <div className='h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700'></div>
        <div className='flex flex-col justify-between'>
          <div className='mb-2 h-3 w-48 rounded-full bg-gray-200 dark:bg-gray-700'></div>
          <div className='mb-2 h-3 w-48 rounded-full bg-gray-200 dark:bg-gray-700'></div>
        </div>
      </div>
      <div className='w-full px-4'>
        <div className='mb-3 h-5 w-full rounded-md bg-gray-200 dark:bg-gray-700'></div>
      </div>
      <div className='mb-2.5 h-96 rounded bg-gray-200 dark:bg-gray-700'></div>
    </div>
  )
}

export default LazyLoadingVideo
