import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '~/store/auth.store'

function RejectedRoute() {
  const { isAuthenticated } = useAuthStore()
  return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
}

export default RejectedRoute
