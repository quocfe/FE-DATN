import { IonIcon } from '@ionic/react'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='min-h-screen bg-[#f8f7fa]'>
      {/* Sidebar */}
      <div className='fixed left-0 top-0 h-full w-[275px] bg-white shadow-md'>
        {/* Logo */}
        <div className='ml-[14px] mr-4 flex h-16 cursor-pointer items-center gap-3 px-2'>
          <svg width='32' height='22' viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
              fill='#7367F0'
            ></path>
            <path
              opacity='0.06'
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
              fill='#161616'
            ></path>
            <path
              opacity='0.06'
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
              fill='#161616'
            ></path>
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
              fill='#7367F0'
            ></path>
          </svg>
          <span className='text-xl font-semibold text-[#5d596c]'>DevBook</span>
        </div>
        {/* List */}
        <ul
          className='overflow-y-scroll py-4 text-sm'
          uk-nav='multiple: true'
          style={{
            height: 'calc(100vh - (60px + 60.8px))',
            scrollbarWidth: 'none'
          }}
        >
          <li className='mx-[14px] flex items-center gap-3 rounded-md px-3 py-2.5 hover:bg-slate-100'>
            <i className='fa-solid fa-house text-base'></i>
            <a href=''>Bảng điều khiển</a>
          </li>
          <li className='uk-parent mx-[14px] mt-1'>
            <a href='#' className='group flex items-center gap-3 rounded-md bg-[#7367f0] py-2.5 pl-3 pr-2 text-white'>
              <i className='fa-solid fa-user-group text-base'></i>
              Quản lý người dùng
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='ml-auto h-5 w-5 duration-200 group-aria-expanded:rotate-180'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
              </svg>
            </a>
            <ul>
              <li>
                <a
                  href='#'
                  className='mt-1 flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Danh sách người dùng
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Thêm người dùng mới
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Ủy quyền truy cập
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Hạn chế người dùng
                </a>
              </li>
            </ul>
          </li>
          <li className='uk-parent mx-[14px] mt-1'>
            <a href='#' className='group flex items-center gap-3 rounded-md py-2.5 pl-3 pr-2  hover:bg-slate-100'>
              <i className='fa-solid fa-book text-base'></i>
              Quản lý bài viết
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='ml-auto h-5 w-5 duration-200 group-aria-expanded:rotate-180'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
              </svg>
            </a>
            <ul>
              <li>
                <a
                  href='#'
                  className='mt-1 flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Danh sách người dùng
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Thêm người dùng mới
                </a>
              </li>
            </ul>
          </li>
          <li className='uk-parent mx-[14px] mt-1'>
            <a href='#' className='group flex items-center gap-3 rounded-md py-2.5 pl-3 pr-2  hover:bg-slate-100'>
              <i className='fa-brands fa-facebook-messenger text-base'></i>
              Quản lý tin nhắn
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='ml-auto h-5 w-5 duration-200 group-aria-expanded:rotate-180'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
              </svg>
            </a>
            <ul>
              <li>
                <a
                  href='#'
                  className='mt-1 flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Danh sách người dùng
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Thêm người dùng mới
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Ủy quyền truy cập
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Hạn chế người dùng
                </a>
              </li>
            </ul>
          </li>
          <li className='uk-parent mx-[14px] mt-1'>
            <a href='#' className='group flex items-center gap-3 rounded-md py-2.5 pl-3 pr-2  hover:bg-slate-100'>
              <i className='fa-solid fa-folder-open text-base'></i>
              Quản lý danh mục
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='ml-auto h-5 w-5 duration-200 group-aria-expanded:rotate-180'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
              </svg>
            </a>
            <ul>
              <li>
                <a
                  href='#'
                  className='mt-1 flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Danh sách người dùng
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Thêm người dùng mới
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Ủy quyền truy cập
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Hạn chế người dùng
                </a>
              </li>
            </ul>
          </li>
          <li className='uk-parent mx-[14px] mt-1'>
            <a href='#' className='group flex items-center gap-3 rounded-md py-2.5 pl-3 pr-2  hover:bg-slate-100'>
              <i className='fa-solid fa-shop text-base'></i>
              Quản lý sản phẩm
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='ml-auto h-5 w-5 duration-200 group-aria-expanded:rotate-180'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
              </svg>
            </a>
            <ul>
              <li>
                <a
                  href='#'
                  className='mt-1 flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Danh sách người dùng
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Thêm người dùng mới
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Ủy quyền truy cập
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Hạn chế người dùng
                </a>
              </li>
            </ul>
          </li>
          <li className='uk-parent mx-[14px] mt-1'>
            <a href='#' className='group flex items-center gap-3 rounded-md py-2.5 pl-3 pr-2  hover:bg-slate-100'>
              <i className='fa-solid fa-cart-shopping text-base'></i>
              Quản lý đơn hàng
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='ml-auto h-5 w-5 duration-200 group-aria-expanded:rotate-180'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
              </svg>
            </a>
            <ul>
              <li>
                <a
                  href='#'
                  className='mt-1 flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Danh sách người dùng
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Thêm người dùng mới
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Ủy quyền truy cập
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Hạn chế người dùng
                </a>
              </li>
            </ul>
          </li>
          <li className='uk-parent mx-[14px] mt-1'>
            <a href='#' className='group flex items-center gap-3 rounded-md py-2.5 pl-3 pr-2  hover:bg-slate-100'>
              <i className='fa-solid fa-truck-fast text-base'></i>
              Quản lý giao hàng
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='ml-auto h-5 w-5 duration-200 group-aria-expanded:rotate-180'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
              </svg>
            </a>
            <ul>
              <li>
                <a
                  href='#'
                  className='mt-1 flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Danh sách người dùng
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Thêm người dùng mới
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Ủy quyền truy cập
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Hạn chế người dùng
                </a>
              </li>
            </ul>
          </li>
          <li className='uk-parent mx-[14px] mt-1'>
            <a href='#' className='group flex items-center gap-3 rounded-md py-2.5 pl-3 pr-2  hover:bg-slate-100'>
              <i className='fa-solid fa-comments text-base'></i>
              Quản lý bình luận
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='ml-auto h-5 w-5 duration-200 group-aria-expanded:rotate-180'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
              </svg>
            </a>
            <ul>
              <li>
                <a
                  href='#'
                  className='mt-1 flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Danh sách người dùng
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Thêm người dùng mới
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Ủy quyền truy cập
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Hạn chế người dùng
                </a>
              </li>
            </ul>
          </li>
          <li className='uk-parent mx-[14px] mt-1'>
            <a href='#' className='group flex items-center gap-3 rounded-md py-2.5 pl-3 pr-2  hover:bg-slate-100'>
              <i className='fa-solid fa-video text-base'></i>
              Quản lý video
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='ml-auto h-5 w-5 duration-200 group-aria-expanded:rotate-180'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
              </svg>
            </a>
            <ul>
              <li>
                <a
                  href='#'
                  className='mt-1 flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Danh sách người dùng
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Thêm người dùng mới
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Ủy quyền truy cập
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
                >
                  <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                  Hạn chế người dùng
                </a>
              </li>
            </ul>
          </li>
          <li className='mx-[14px] flex items-center gap-3 rounded-md px-3 py-2.5 hover:bg-slate-100'>
            <i className='fa-solid fa-paper-plane text-base'></i>
            <a href=''>Yêu cầu người dùng</a>
          </li>
        </ul>
        {/* Info */}
        <div
          className='absolute  bottom-0 z-50 flex w-full items-center justify-between bg-white px-6 py-2.5'
          style={{
            borderTop: '1px solid #eee'
          }}
        >
          <div className='flex gap-3'>
            <div className='h-10 w-10'>
              <img
                src='https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg'
                className='h-full w-full rounded-full object-cover'
                alt=''
              />
            </div>
            <div className='flex flex-col'>
              <div className='text-sm font-semibold text-gray-800'>Kan Kan</div>
              <span className='text-xs'>Super Admin</span>
            </div>
          </div>
          <svg className='w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
            />
          </svg>
        </div>
      </div>
      {/* Body */}
      <div className='ml-[275px] overflow-x-hidden'>
        {/* Navbar */}
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
        {/* Breakpoint */}
        <div className='mx-6 mb-6 flex gap-2 text-sm text-gray-500'>
          <span>Admin</span>
          <span>/</span>
          <span>Quản lý người dùng</span>
          <span>/</span>
          <span className='text-gray-800'>Danh sách người dùng</span>
        </div>
        {/* Content */}
        <div className=''>
          {/* Table Users */}
          <section className='container mx-auto px-4'>
            <div className='flex flex-col'>
              <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                  <div className='overflow-hidden border border-gray-200 md:rounded-lg dark:border-gray-700'>
                    <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                      <thead className='bg-gray-50 dark:bg-gray-800'>
                        <tr>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400'
                          >
                            <div className='flex items-center gap-x-3'>
                              <input
                                type='checkbox'
                                className='rounded border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:ring-offset-gray-900'
                              />
                              <button className='flex items-center gap-x-2'>
                                <span>ID</span>
                                <svg className='h-3' viewBox='0 0 10 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                  <path
                                    d='M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z'
                                    fill='currentColor'
                                    stroke='currentColor'
                                    strokeWidth='0.1'
                                  />
                                  <path
                                    d='M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z'
                                    fill='currentColor'
                                    stroke='currentColor'
                                    strokeWidth='0.1'
                                  />
                                  <path
                                    d='M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z'
                                    fill='currentColor'
                                    stroke='currentColor'
                                    strokeWidth='0.3'
                                  />
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400'
                          >
                            Ngày tạo
                          </th>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400'
                          >
                            Trạng thái
                          </th>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400'
                          >
                            Người dùng
                          </th>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400'
                          >
                            Vai trò
                          </th>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400'
                          >
                            Mô tả
                          </th>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400'
                          >
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900'>
                        <tr>
                          <td className='whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200'>
                            <div className='inline-flex items-center gap-x-3'>
                              <input
                                type='checkbox'
                                className='rounded border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:ring-offset-gray-900'
                              />
                              <span>#01</span>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
                            2024/05/30
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700'>
                            <div className='inline-flex items-center gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-emerald-500 dark:bg-gray-800'>
                              <svg
                                width={12}
                                height={12}
                                viewBox='0 0 12 12'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M10 3L4.5 8.5L2 6'
                                  stroke='currentColor'
                                  strokeWidth='1.5'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                              <h2 className='text-sm font-normal'>Hoạt động</h2>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
                            <div className='flex items-center gap-x-2'>
                              <img
                                className='h-8 w-8 rounded-full object-cover'
                                src='https://inkythuatso.com/uploads/thumbnails/800/2022/03/4a7f73035bb4743ee57c0e351b3c8bed-29-13-53-17.jpg'
                                alt=''
                              />
                              <div>
                                <h2 className='text-sm font-medium text-gray-800 dark:text-white '>Nguyễn Phú Quốc</h2>
                                <p className='text-xs font-normal text-gray-600 dark:text-gray-400'>
                                  phuquoc.admin@gmail.com
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
                            Admin Content
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
                            Quản lý nội dung
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm'>
                            <div className='flex items-center gap-x-4'>
                              <i className='fa-solid fa-ban text-base text-red-400'></i>
                              <i className='fa-solid fa-pen-to-square text-base text-blue-400'></i>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200'>
                            <div className='inline-flex items-center gap-x-3'>
                              <input
                                type='checkbox'
                                className='rounded border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:ring-offset-gray-900'
                              />
                              <span>#02</span>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
                            2024/05/30
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700'>
                            <div className='inline-flex items-center gap-x-2 rounded-full bg-red-100/60 px-3 py-1 text-red-500 dark:bg-gray-800'>
                              <svg
                                width={12}
                                height={12}
                                viewBox='0 0 12 12'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M10 3L4.5 8.5L2 6'
                                  stroke='currentColor'
                                  strokeWidth='1.5'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                              <h2 className='text-sm font-normal'>Hạn chế</h2>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
                            <div className='flex items-center gap-x-2'>
                              <img
                                className='h-8 w-8 rounded-full object-cover'
                                src='https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg'
                                alt=''
                              />
                              <div>
                                <h2 className='text-sm font-medium text-gray-800 dark:text-white '>
                                  Nguyễn Quang Linh
                                </h2>
                                <p className='text-xs font-normal text-gray-600 dark:text-gray-400'>
                                  quanglinh.admin@gmail.com
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
                            Admin Sales
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
                            Quản lý bán hàng
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm'>
                            <div className='flex items-center gap-x-4'>
                              <i className='fa-solid fa-ban text-base text-red-400'></i>
                              <i className='fa-solid fa-pen-to-square text-base text-blue-400'></i>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200'>
                            <div className='inline-flex items-center gap-x-3'>
                              <input
                                type='checkbox'
                                className='rounded border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:ring-offset-gray-900'
                              />
                              <span>#03</span>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
                            2024/05/30
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700'>
                            <div className='inline-flex items-center gap-x-2 rounded-full bg-blue-100/60 px-3 py-1 text-blue-500 dark:bg-gray-800'>
                              <svg
                                width={12}
                                height={12}
                                viewBox='0 0 12 12'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M10 3L4.5 8.5L2 6'
                                  stroke='currentColor'
                                  strokeWidth='1.5'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                              <h2 className='text-sm font-normal'>Đóng băng</h2>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
                            <div className='flex items-center gap-x-2'>
                              <img
                                className='h-8 w-8 rounded-full object-cover'
                                src='https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-hai-huoc-cam-dep-duoi-ai-do.jpg?1704789789335'
                                alt=''
                              />
                              <div>
                                <h2 className='text-sm font-medium text-gray-800 dark:text-white '>
                                  Nguyễn Hiếu Trung
                                </h2>
                                <p className='text-xs font-normal text-gray-600 dark:text-gray-400'>
                                  hieutrung.admin@gmail.com
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
                            Admin Sales
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
                            Quản lý bán hàng
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm'>
                            <div className='flex items-center gap-x-4'>
                              <i className='fa-solid fa-ban text-base text-red-400'></i>
                              <i className='fa-solid fa-pen-to-square text-base text-blue-400'></i>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200'>
                            <div className='inline-flex items-center gap-x-3'>
                              <input
                                type='checkbox'
                                className='rounded border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:ring-offset-gray-900'
                              />
                              <span>#04</span>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
                            2024/05/30
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700'>
                            <div className='inline-flex items-center gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-emerald-500 dark:bg-gray-800'>
                              <svg
                                width={12}
                                height={12}
                                viewBox='0 0 12 12'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M10 3L4.5 8.5L2 6'
                                  stroke='currentColor'
                                  strokeWidth='1.5'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                              <h2 className='text-sm font-normal'>Hoạt động</h2>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
                            <div className='flex items-center gap-x-2'>
                              <img
                                className='h-8 w-8 rounded-full object-cover'
                                src='https://demoda.vn/wp-content/uploads/2022/01/anh-avatar-hai-chu-vit-bit-tai.jpg'
                                alt=''
                              />
                              <div>
                                <h2 className='text-sm font-medium text-gray-800 dark:text-white '>Trịnh Quang Ba</h2>
                                <p className='text-xs font-normal text-gray-600 dark:text-gray-400'>
                                  quangba.admin@gmail.com
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
                            Admin User
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300'>
                            Quản lý người dùng
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm'>
                            <div className='flex items-center gap-x-4'>
                              <i className='fa-solid fa-ban text-base text-red-400'></i>
                              <i className='fa-solid fa-pen-to-square text-base text-blue-400'></i>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-6 flex items-center justify-between'>
              <a
                href='#'
                className='flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='h-5 w-5 rtl:-scale-x-100'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
                </svg>
                <span>Trang đầu</span>
              </a>
              <div className='hidden items-center gap-x-3 md:flex'>
                <a href='#' className='rounded-md bg-blue-100/60 px-2 py-1 text-sm text-blue-500 dark:bg-gray-800'>
                  1
                </a>
                <a
                  href='#'
                  className='rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                >
                  2
                </a>
                <a
                  href='#'
                  className='rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                >
                  3
                </a>
                <a
                  href='#'
                  className='rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                >
                  ...
                </a>
                <a
                  href='#'
                  className='rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                >
                  12
                </a>
                <a
                  href='#'
                  className='rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                >
                  13
                </a>
                <a
                  href='#'
                  className='rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                >
                  14
                </a>
              </div>
              <a
                href='#'
                className='flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800'
              >
                <span>Trang cuối</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='h-5 w-5 rtl:-scale-x-100'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3' />
                </svg>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
