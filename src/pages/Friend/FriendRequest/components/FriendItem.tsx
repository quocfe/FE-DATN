interface Props {
  friend: UserCompact
}

function FriendItem({ friend }: Props) {
  return (
    <div className='card'>
      <a href='timeline-group.html'>
        <div className='card-media h-24'>
          <img src={friend.Profile?.cover_photo} className='w-full object-cover' alt='cover_photo' />
          <div className='card-overly' />
        </div>
      </a>
      <div className='card-body relative z-10'>
        <img
          src={friend.Profile?.profile_picture}
          alt='profile_picture'
          className='relative -mt-8 mb-2 h-11 w-11 rounded-full border-2 border-white object-cover shadow dark:border-slate-800'
        />
        <a href='timeline-group.html'>
          <h4 className='card-title'>
            {' '}
            {friend.last_name} {friend.first_name}{' '}
          </h4>
        </a>
        <div className='mt-2 flex items-center'>
          <img
            src='/src/assets/images/avatars/avatar-4.jpg'
            className='-mr-2 h-6 w-6 rounded-full border-2 border-gray-200'
            alt=''
          />
          <img
            src='/src/assets/images/avatars/avatar-2.jpg'
            className='h-6 w-6 rounded-full border-2 border-gray-200'
            alt=''
          />
          <div className='ml-2 text-sm text-gray-500'> 13 bạn chung</div>
        </div>
        <div className='flex gap-2'>
          <button className='button flex-1 bg-primary text-white'>Chấp nhận</button>
          <a
            className='button !w-auto cursor-pointer text-red-600'
            style={{
              backgroundColor: 'rgb(255 236 235)'
            }}
          >
            Xóa
          </a>
        </div>
      </div>
    </div>
  )
}

export default FriendItem
