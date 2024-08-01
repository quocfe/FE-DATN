import useAuthStore from '~/store/auth.store'
import useMutationLogout from '../Header/hooks/useMutationLogout'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'

function SidebarAdmin() {
  const { pathname } = useLocation()
  const { profile } = useAuthStore()

  // React Query
  const logoutMutation = useMutationLogout()

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const setActiveMenu = () => {}

  return (
    <div className='fixed left-0 top-0 h-full w-[275px] bg-white shadow-md'>
      {/* Logo */}
      <div className='ml-[14px] mr-4 flex h-16 cursor-pointer items-center gap-3 px-2'>
        <svg width='32' height='22' viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
            fill='#7367F0'
          ></path>
          <path
            opacity='0.06'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
            fill='#161616'
          ></path>
          <path
            opacity='0.06'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
            fill='#161616'
          ></path>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
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
        <Link
          to={'/'}
          className={classNames('mx-[14px] flex items-center gap-3 rounded-md px-3 py-2.5 ', {
            'bg-[#7367f0] text-white hover:bg-[#7367f0]': pathname === '/admin/dashboard',
            'hover:bg-slate-100': pathname !== '/admin/dashboard'
          })}
        >
          <i className='fa-solid fa-house text-base'></i>
          <a href=''>Bảng điều khiển</a>
        </Link>
        <li className='uk-parent mx-[14px] mt-1'>
          <a href='#' className='group flex items-center gap-3 rounded-md py-2.5 pl-3 pr-2  hover:bg-slate-100'>
            <i className='fa-solid fa-book text-base'></i>
            Quản lý vai trò
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
                Thêm mới vai trò
              </a>
            </li>
            <li>
              <a
                href='#'
                className='flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700'
              >
                <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                Danh sách vai trò
              </a>
            </li>
          </ul>
        </li>
        <li className='uk-parent mx-[14px] mt-1'>
          <a
            href='#'
            className={classNames('group flex items-center gap-3 rounded-md py-2.5 pl-3 pr-2  ', {
              'bg-[#7367f0] text-white hover:bg-[#7367f0]': pathname === '/admin/user/list',
              'hover:bg-slate-100': pathname !== '/admin/user/list'
            })}
          >
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
              <Link
                to={'/admin/user/list'}
                className={classNames(
                  'mt-1 flex items-center gap-5 rounded-md px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700',
                  {
                    'font-medium text-[#7367f0]': pathname === '/admin/user/list'
                  }
                )}
              >
                <i className='fa-regular fa-circle ml-2 text-[8px]'></i>
                Danh sách người dùng
              </Link>
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
            <img src={profile?.profile_picture} className='h-full w-full rounded-full object-cover' alt='' />
          </div>
          <div className='flex flex-col'>
            <div className='text-sm font-semibold text-gray-800'>{profile?.username}</div>
            <span className='text-xs'>{profile?.role?.name}</span>
          </div>
        </div>
        <svg
          onClick={handleLogout}
          className='w-6 cursor-pointer'
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
      </div>
    </div>
  )
}

export default SidebarAdmin
