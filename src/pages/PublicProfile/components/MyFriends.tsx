function MyFriends() {
  return (
    <div className='box p-5 px-6'>
      <div className='items-ce flex justify-between text-black dark:text-white'>
        <h3 className='text-lg font-bold'>Bạn bè</h3>
        <a href='#' className='text-sm text-blue-500'>
          Tìm bạn
        </a>
      </div>
      <div className='mb-2 mt-4 grid grid-cols-3 gap-2 gap-y-5 text-center text-sm'>
        <div>
          <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
            <img src='/src/assets/images/avatars/avatar-7.jpg' alt='' className='inset-0 h-full w-full object-cover' />
          </div>
          <div className='mt-2 line-clamp-1'> Jesse Steeve </div>
        </div>
        <div>
          <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
            <img src='/src/assets/images/avatars/avatar-2.jpg' alt='' className='inset-0 h-full w-full object-cover' />
          </div>
          <div className='mt-2 line-clamp-1'> John Michael </div>
        </div>
        <div>
          <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
            <img src='/src/assets/images/avatars/avatar-3.jpg' alt='' className='inset-0 h-full w-full object-cover' />
          </div>
          <div className='mt-2 line-clamp-1'> Monroe Parker </div>
        </div>
        <div>
          <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
            <img src='/src/assets/images/avatars/avatar-4.jpg' alt='' className='inset-0 h-full w-full object-cover' />
          </div>
          <div className='mt-2 line-clamp-1'> Martin Gray </div>
        </div>
        <div>
          <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
            <img src='/src/assets/images/avatars/avatar-5.jpg' alt='' className='inset-0 h-full w-full object-cover' />
          </div>
          <div className='mt-2 line-clamp-1'> James Lewis </div>
        </div>
        <div>
          <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
            <img src='/src/assets/images/avatars/avatar-6.jpg' alt='' className='inset-0 h-full w-full object-cover' />
          </div>
          <div className='mt-2 line-clamp-1'> Alexa stella </div>
        </div>
      </div>
    </div>
  )
}

export default MyFriends
