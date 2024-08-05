import { IonIcon } from '@ionic/react'
import { Link } from 'react-router-dom'

function NavbarAdmin() {
  return (
    <div className='m-6 rounded-md bg-white py-2 shadow-sm'>
      <div className='relative flex-1'>
        <div className='mx-auto flex max-w-[1220px] items-center'>
          {/* search */}
          <div
            id='search--box'
            className='left-0 z-20 w-screen overflow-hidden rounded-xl max-md:hidden max-sm:fixed max-sm:top-2 sm:relative sm:w-96 xl:w-[680px]'
            tabIndex={0}
            aria-haspopup='true'
            aria-expanded='false'
          >
            <IonIcon
              icon='search'
              className='md hydrated absolute left-4 top-1/2 -translate-y-1/2 text-lg'
              role='img'
              aria-label='search'
            />

            <input
              type='text'
              placeholder='Nội dung cần tìm kiếm ..'
              className='h-12 w-full !bg-transparent !pl-10 !text-sm !font-normal'
            />
          </div>
          {/* search dropdown*/}
          <div
            className='uk- open uk-drop z-10 hidden'
            uk-drop='pos: bottom-center ; animation: uk-animation-slide-bottom-small;mode:click '
          >
            <div className='dark:bg-dark3 -mt-14 w-screen rounded-lg bg-white p-2 pt-14 shadow-lg sm:w-96 xl:w-[694px]'>
              <div className='flex justify-between px-2 py-2.5 text-sm font-medium'>
                <div className=' text-black dark:text-white'>Recent</div>
                <button type='button' className='text-blue-500'>
                  Clear
                </button>
              </div>
              <nav className='text-sm font-medium text-black dark:text-white'>
                <a
                  href='#!'
                  className=' relative flex items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
                >
                  <img
                    src='https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg'
                    className='h-9 w-9 rounded-full'
                    alt=''
                  />
                  <div>
                    <div> Jesse Steeve </div>
                    <div className='mt-0.5 text-xs font-medium text-blue-500'> Friend </div>
                  </div>
                  <IonIcon
                    icon='close'
                    className='md hydrated absolute right-3 top-1/2 -translate-y-1/2 text-base'
                    role='img'
                    aria-label='close'
                  />
                </a>
                <a
                  href='#!'
                  className=' relative flex items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
                >
                  <img
                    src='https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg'
                    className='h-9 w-9 rounded-full'
                    alt=''
                  />
                  <div>
                    <div> Martin Gray </div>
                    <div className='mt-0.5 text-xs font-medium text-blue-500'> Friend </div>
                  </div>
                  <IonIcon
                    icon='close'
                    className='md hydrated absolute right-3 top-1/2 -translate-y-1/2 text-base'
                    role='img'
                    aria-label='close'
                  />
                </a>
                <a
                  href='#!'
                  className=' relative flex items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
                >
                  <img src='src/assets/images/group/group-2.jpg' className='h-9 w-9 rounded-full' alt='' />
                  <div>
                    <div> Delicious Foods</div>
                    <div className='mt-0.5 text-xs font-medium text-rose-500'> Group </div>
                  </div>
                  <IonIcon
                    icon='close'
                    className='md hydrated absolute right-3 top-1/2 -translate-y-1/2 text-base'
                    role='img'
                    aria-label='close'
                  />
                </a>
                <a
                  href='#!'
                  className=' relative flex items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
                >
                  <img src='src/assets/images/group/group-1.jpg' className='h-9 w-9 rounded-full' alt='' />
                  <div>
                    <div> Delicious Foods</div>
                    <div className='mt-0.5 text-xs font-medium text-yellow-500'> Page </div>
                  </div>
                  <IonIcon
                    icon='close'
                    className='md hydrated absolute right-3 top-1/2 -translate-y-1/2 text-base'
                    role='img'
                    aria-label='close'
                  />
                </a>
                <a
                  href='#!'
                  className=' relative flex items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
                >
                  <img src='src/assets/images/avatars/avatar-6.jpg' className='h-9 w-9 rounded-full' alt='' />
                  <div>
                    <div> John Welim </div>
                    <div className='mt-0.5 text-xs font-medium text-blue-500'> Friend </div>
                  </div>
                  <IonIcon
                    icon='close'
                    className='md hydrated absolute right-3 top-1/2 -translate-y-1/2 text-base'
                    role='img'
                    aria-label='close'
                  />
                </a>
                <a
                  href='#!'
                  className='relative flex  hidden items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
                >
                  <IonIcon
                    icon='search-outline'
                    className='md hydrated text-2xl'
                    role='img'
                    aria-label='search outline'
                  />
                  Creative ideas about Business
                </a>
                <a
                  href='#!'
                  className='relative flex hidden   items-center gap-4 rounded-lg px-3 py-1.5 hover:bg-secondery dark:hover:bg-white/10'
                >
                  <IonIcon
                    icon='search-outline'
                    className='md hydrated text-2xl'
                    role='img'
                    aria-label='search outline'
                  />
                  8 Facts About Writting
                </a>
              </nav>
              <hr className='-mx-2 mt-2 hidden' />
              <div className='flex hidden justify-end pr-2 text-sm font-medium text-red-500'>
                <a href='#!' className='flex rounded p-1.5 hover:bg-red-50 dark:hover:bg-slate-700'>
                  <IonIcon icon='trash' className='md hydrated mr-2 text-lg' role='img' aria-label='trash' />
                  Clear your history
                </a>
              </div>
            </div>
          </div>
          {/* header icons */}
          <div className='absolute right-5 top-1/2 flex -translate-y-1/2 items-center gap-2 text-black sm:gap-4'>
            {/* create */}
            <button
              type='button'
              className='relative rounded-full p-1 sm:bg-secondery sm:p-2 dark:text-white'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-5 w-5 max-sm:hidden'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
              </svg>
              <IonIcon
                icon='add-circle-outline'
                className='md hydrated text-2xl sm:hidden'
                role='img'
                aria-label='add circle outline'
              />
            </button>
            {/* notification */}
            <button
              type='button'
              className='relative rounded-full p-1 sm:bg-secondery sm:p-2 dark:text-white'
              uk-tooltip='title: Notification; pos: bottom; offset:6'
              title=''
              aria-describedby='uk-tooltip-8'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-6 w-6 max-sm:hidden'
              >
                <path d='M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z' />
                <path
                  fillRule='evenodd'
                  d='M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z'
                  clipRule='evenodd'
                />
              </svg>
              <div className='absolute right-0 top-0 -m-1 rounded-full bg-red-600 px-1 text-xs text-white'>6</div>
              <IonIcon
                icon='notifications-outline'
                className='md hydrated text-2xl sm:hidden'
                role='img'
                aria-label='notifications outline'
              />
            </button>
            {/* messages */}
            <button
              type='button'
              className='relative rounded-full p-1 sm:bg-secondery sm:p-2 dark:text-white'
              uk-tooltip='title: Messages; pos: bottom; offset:6'
              title=''
              aria-describedby='uk-tooltip-13'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-6 w-6 max-sm:hidden'
              >
                <path
                  fillRule='evenodd'
                  d='M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z'
                  clipRule='evenodd'
                />
              </svg>
              <IonIcon
                icon='chatbox-ellipses-outline'
                className='md hydrated text-2xl sm:hidden'
                role='img'
                aria-label='chatbox ellipses outline'
              />
            </button>
            {/* profile */}
            <div
              className='relative shrink-0 cursor-pointer rounded-full bg-secondery'
              tabIndex={0}
              aria-haspopup='true'
              aria-expanded='false'
            >
              <img
                src='https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg'
                alt=''
                className='h-7 w-7 shrink-0 rounded-full shadow sm:h-9 sm:w-9'
              />
            </div>
            {/* fix */}
            <div
              className='border2 uk-drop hidden w-64 rounded-lg bg-white drop-shadow-xl dark:bg-slate-700'
              uk-drop='offset:6;pos: bottom-right;animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right '
            >
              <Link to={'/profile'}>
                <div className='flex items-center gap-4 p-4 py-5'>
                  <img
                    src='https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg'
                    alt=''
                    className='h-10 w-10 rounded-full shadow'
                  />
                  <div className='flex-1'>
                    <h4 className='text-sm font-medium text-black'>Kan Kan</h4>
                    <div className='mt-1 text-sm font-light text-blue-600 dark:text-white/70'>
                      super.admin@gmail.com
                    </div>
                  </div>
                </div>
              </Link>
              <hr className='dark:border-gray-600/60' />
              <nav className='p-2 text-sm font-normal text-black dark:text-white'>
                <a href='upgrade.html'>
                  <div className='flex items-center gap-2.5 rounded-md p-2 px-2.5 text-blue-600 hover:bg-secondery dark:hover:bg-white/10'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'
                      />
                    </svg>
                    Nâng cấp tài khoản
                  </div>
                </a>
                <a href='setting.html'>
                  <div className='flex items-center gap-2.5 rounded-md p-2 px-2.5 hover:bg-secondery dark:hover:bg-white/10'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'
                      />
                    </svg>
                    Ví của tôi
                  </div>
                </a>
                <a href='setting.html'>
                  <div className='flex items-center gap-2.5 rounded-md p-2 px-2.5 hover:bg-secondery dark:hover:bg-white/10'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46'
                      />
                    </svg>
                    Thông báo
                  </div>
                </a>
                <a href='setting.html'>
                  <div className='flex items-center gap-2.5 rounded-md p-2 px-2.5 hover:bg-secondery dark:hover:bg-white/10'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
                      />
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                    Cài đặt
                  </div>
                </a>
                <button type='button' className='w-full'>
                  <div className='flex items-center gap-2.5 rounded-md p-2 px-2.5 hover:bg-secondery dark:hover:bg-white/10'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
                      />
                    </svg>
                    Chế độ sáng
                    <span className='ml-auto w-9 rounded-full bg-slate-200/40 p-0.5 dark:hover:bg-white/20'>
                      <span className='relative block h-4 w-2 w-4 rounded-full bg-white shadow-md dark:bg-blue-600' />
                    </span>
                  </div>
                </button>
                <hr className='-mx-2 my-2 dark:border-gray-600/60' />
                <a className='cursor-pointer'>
                  <div className='flex items-center gap-2.5 rounded-md p-2 px-2.5 hover:bg-secondery dark:hover:bg-white/10'>
                    <svg
                      className='w-6'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                      />
                    </svg>
                    Đăng xuất
                  </div>
                </a>
              </nav>
            </div>
            <div className='flex hidden items-center gap-2'>
              <img
                src='https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg'
                alt=''
                className='h-9 w-9 rounded-full shadow'
              />
              <div className='w-20 font-semibold text-gray-600'> Hamse </div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-5 w-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarAdmin
