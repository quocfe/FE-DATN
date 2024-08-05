import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '~/store/auth.store'

export function ProtectedRoute() {
  const { isAuthenticated, type } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  if (type === 'admin') {
    return <Navigate to='/admin/dashboard' replace />
  }

  return <Outlet />
}

export function AdminProtectedRoute() {
  const { isAuthenticated, type } = useAuthStore()

  // Điều hướng từ /admin tới /admin/login
  if (window.location.pathname === '/admin') {
    return <Navigate to='/admin/login' replace />
  }

  // Nếu admin đã đăng nhập và cố gắng truy cập /admin/login, điều hướng tới /admin/dashboard
  if (isAuthenticated && type === 'admin' && window.location.pathname === '/admin/login') {
    return <Navigate to='/admin/dashboard' replace />
  }

  // Cho phép truy cập vào /admin/login cho tất cả mọi người
  if (window.location.pathname === '/admin/login') {
    return <Outlet />
  }

  // Nếu chưa đăng nhập, điều hướng tới /admin/login
  if (!isAuthenticated) {
    return <Navigate to='/admin/login' />
  }

  // Nếu đã đăng nhập nhưng không phải admin, điều hướng tới trang chủ
  if (isAuthenticated && type !== 'admin') {
    return <Navigate to='/' replace />
  }

  // Cho phép admin truy cập vào các trang admin khác
  return <Outlet />
}
