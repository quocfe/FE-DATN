import useAuthStore from '~/store/auth.store'
import useMutationLogout from '../Header/hooks/useMutationLogout'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import SidebarItem from './components/SidebarItem'

function SidebarAdmin() {
  const { pathname } = useLocation()
  const { profile } = useAuthStore()

  // React Query
  const logoutMutation = useMutationLogout()

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  // Hàm kiểm tra quyền truy cập vào một module
  const hasPermission = (moduleNames: string[], permissionNames: string[]) => {
    const roleName = profile?.role?.name ?? ''

    // Nếu là Super Admin thì có toàn quyền
    if (roleName === 'Super Admin') {
      return true
    }

    const modules = profile?.modules ?? []

    // Kiểm tra nếu có bất kỳ module nào trong danh sách `moduleNames` có quyền tương ứng trong `permissionNames`
    return modules.some(
      (module) =>
        moduleNames.includes(module.name) &&
        module.permissions.some((permission) => permissionNames.includes(permission.name))
    )
  }

  return (
    <div className='fixed left-0 top-0 h-full w-[275px] bg-white shadow-md'>
      {/* Logo */}
      <Link to={'/admin/dashboard'} className='ml-[14px] mr-4 flex h-16 cursor-pointer items-center gap-3 px-2'>
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
      </Link>
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
          <p>Bảng điều khiển</p>
        </Link>
        {hasPermission(['Role Management'], ['view']) && (
          <SidebarItem
            icon='fa-regular fa-folder-open'
            title='Vai trò và quyền'
            links={[
              { to: '/admin/role/list', label: 'Danh sách vai trò' },
              { to: '/admin/permission/list', label: 'Danh sách quyền' }
            ]}
          />
        )}
        {hasPermission(['Customer Support'], []) && (
          <SidebarItem
            icon='fa-solid fa-user-group'
            title='Quản lý tài khoản'
            links={[
              { to: '/admin/account/list', label: 'Danh sách tài khoản' },
              { to: '', label: 'Hạn chế người dùng' }
            ]}
          />
        )}
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
