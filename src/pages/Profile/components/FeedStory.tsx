import { IonIcon } from '@ionic/react'

interface Props {
  profile: UserProfile | null
}

function FeedStory({ profile }: Props) {
  return (
    <div className='flex-1 space-y-3 xl:space-y-6'>
      {/* add story */}
      <div className='border1 dark:bg-dark2 space-y-4 rounded-xl bg-white p-4 text-sm font-medium shadow-sm'>
        <div className='flex items-center gap-3'>
          <div
            className='dark:bg-dark3 flex-1 cursor-pointer rounded-lg bg-slate-100 transition-all hover:bg-opacity-80'
            uk-toggle='target: #create-status'
          >
            <div className='py-2.5 text-center dark:text-white'> Bạn đang suy nghĩ điều gì? </div>
          </div>
          <div
            className='cursor-pointer rounded-lg bg-pink-100/60 p-1 px-1.5 transition-all hover:bg-pink-100 hover:bg-opacity-80'
            uk-toggle='target: #create-status'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 fill-pink-200/70 stroke-pink-600'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#2c3e50'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M15 8h.01' />
              <path d='M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z' />
              <path d='M3.5 15.5l4.5 -4.5c.928 -.893 2.072 -.893 3 0l5 5' />
              <path d='M14 14l1 -1c.928 -.893 2.072 -.893 3 0l2.5 2.5' />
            </svg>
          </div>
          <div
            className='cursor-pointer rounded-lg bg-sky-100/60 p-1 px-1.5 transition-all hover:bg-sky-100 hover:bg-opacity-80'
            uk-toggle='target: #create-status'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 fill-sky-200/70 stroke-sky-600 '
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#2c3e50'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z' />
              <path d='M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z' />
            </svg>
          </div>
        </div>
      </div>
      {/*  post image*/}
      <div className='border1 dark:bg-dark2 rounded-xl bg-white text-sm font-medium shadow-sm'>
        {/* post heading */}
        <div className='flex gap-3 p-2.5 text-sm font-medium sm:p-4'>
          <a href='timeline.html'>
            <img src={profile?.Profile.profile_picture} alt='' className='h-9 w-9 rounded-full object-cover' />
          </a>
          <div className='flex-1'>
            <a href='timeline.html'>
              <h4 className='text-black dark:text-white'>
                {' '}
                {profile?.last_name} {profile?.first_name}{' '}
              </h4>
            </a>
            <div className='text-xs text-gray-500 dark:text-white/80'> 2 giờ trước</div>
          </div>
          <div className='-mr-1'>
            <button type='button' className='button-icon h-8 w-8'>
              <IonIcon className='text-xl' icon='ellipsis-horizontal' />
            </button>
            <div
              className='w-[245px]'
              uk-dropdown='pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click'
            >
              <nav>
                <a href='#'>
                  <IonIcon className='shrink-0 text-xl' icon='bookmark-outline' /> Add to favorites
                </a>
                <a href='#'>
                  <IonIcon className='shrink-0 text-xl' icon='notifications-off-outline' /> Mute Notification
                </a>
                <a href='#'>
                  <IonIcon className='shrink-0 text-xl' icon='flag-outline' /> Report this post
                </a>
                <a href='#'>
                  <IonIcon className='shrink-0 text-xl' icon='share-outline' /> Share your profile
                </a>
                <hr />
                <a href='#' className='text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50'>
                  <IonIcon className='shrink-0 text-xl' icon='stop-circle-outline' /> Unfollow
                </a>
              </nav>
            </div>
          </div>
        </div>
        {/* post image */}
        <div className='relative h-full w-full sm:px-4 lg:h-96'>
          <img
            src='https://res.cloudinary.com/dswainylr/image/upload/v1717866186/50615f8b24c2879cded3_ykqrnu.jpg'
            alt=''
            className='h-full w-full object-cover object-center sm:rounded-lg'
          />
        </div>
        {/* post icons */}
        <div className='flex items-center gap-4 p-2.5 text-xs font-semibold sm:p-4'>
          <div>
            <div className='flex items-center gap-2.5'>
              <button type='button' className='button-icon bg-red-100 text-red-500 dark:bg-slate-700'>
                <IonIcon className='text-lg' icon='heart' />
              </button>
              <a href='#'>127</a>
            </div>
            <div
              className='w-[212px] rounded-full bg-white p-1 px-2 text-2xl drop-shadow-md dark:bg-slate-700'
              uk-drop='offset:10;pos: top-left; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-bottom-left'
            >
              <div
                className='flex gap-2'
                uk-scrollspy='target: > button; cls: uk-animation-scale-up; delay: 100 ;repeat: true'
              >
                <button type='button' className='text-red-600 duration-300 hover:scale-125'>
                  <span> 👍 </span>
                </button>
                <button type='button' className='text-red-600 duration-300 hover:scale-125'>
                  <span> ❤️ </span>
                </button>
                <button type='button' className='text-red-600 duration-300 hover:scale-125'>
                  <span> 😂 </span>
                </button>
                <button type='button' className='text-red-600 duration-300 hover:scale-125'>
                  <span> 😯 </span>
                </button>
                <button type='button' className='text-red-600 duration-300 hover:scale-125'>
                  <span> 😢 </span>
                </button>
              </div>
              <div className='absolute -bottom-1 left-3 hidden h-2.5 w-2.5 rotate-45 bg-white' />
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <button type='button' className='button-icon bg-slate-200/70 dark:bg-slate-700'>
              <IonIcon className='text-lg' icon='chatbubble-ellipses' />
            </button>
            <span>36</span>
          </div>
          <button type='button' className='button-icon ml-auto'>
            <IonIcon className='text-xl' icon='paper-plane-outline' />
          </button>
          <button type='button' className='button-icon'>
            <IonIcon className='text-xl' icon='share-outline' />
          </button>
        </div>
        {/* comments */}
        <div className='relative space-y-3 border-t border-gray-100 p-2.5 font-normal sm:p-4 dark:border-slate-700/40'>
          <div className='relative flex items-start gap-3'>
            <a href='timeline.html'>
              <img
                src='https://i.pinimg.com/564x/d6/f2/8b/d6f28b9a2b8b6795e2c1e593fc451c8d.jpg'
                alt=''
                className='mt-1 h-6 w-6 rounded-full object-cover object-center'
              />
            </a>
            <div className='flex-1'>
              <a href='timeline.html' className='inline-block font-medium text-black dark:text-white'>
                Roronoa Zoro
              </a>
              <p className='mt-0.5'>Đi không rủ bây. 😐 </p>
            </div>
          </div>
          <div className='relative flex items-start gap-3'>
            <a href='timeline.html'>
              <img
                src='https://genk.mediacdn.vn/2019/4/16/anh-1-1555405706224872675384.jpg'
                alt=''
                className='mt-1 h-6 w-6 rounded-full object-cover object-center'
              />
            </a>
            <div className='flex-1'>
              <a href='timeline.html' className='inline-block font-medium text-black dark:text-white'>
                Rico Nami
              </a>
              <p className='mt-0.5'> Tình nghĩa bạn bè có chắc bền lâu 😎 </p>
            </div>
          </div>
          <button type='button' className='mt-2 flex items-center gap-1.5 text-gray-500 hover:text-blue-500'>
            <IonIcon icon='chevron-down-outline' className='ml-auto duration-200 group-aria-expanded:rotate-180' />
            Xem thêm bình luận
          </button>
        </div>
        {/* add comment */}
        <div className='flex items-center gap-1 border-t border-gray-100 p-2.5 sm:px-4 sm:py-3 dark:border-slate-700/40'>
          <img src='src/assets/images/avatars/avatar-7.jpg' alt='' className='h-6 w-6 rounded-full' />
          <div className='relative h-10 flex-1 overflow-hidden'>
            <textarea
              placeholder='Nội dung bình luận....'
              rows={1}
              className='w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent'
              defaultValue={''}
            />
            <div className='!top-2 pr-2' uk-drop='pos: bottom-right; mode: click'>
              <div
                className='flex items-center gap-2'
                uk-scrollspy='target: > svg; cls: uk-animation-slide-right-small; delay: 100 ;repeat: true'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-6 w-6 fill-sky-600'
                >
                  <path
                    fillRule='evenodd'
                    d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
                    clipRule='evenodd'
                  />
                </svg>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='h-5 w-5 fill-pink-600'
                >
                  <path d='M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z' />
                </svg>
              </div>
            </div>
          </div>
          <button type='submit' className='rounded-full bg-secondery px-3.5 py-1.5 text-sm'>
            Bình luận
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedStory
