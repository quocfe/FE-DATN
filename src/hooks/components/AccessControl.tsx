import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthStore from '~/store/auth.store'

interface AccessControlProps {
  children: ReactNode
  requiredPermissions?: string[]
  requiredModules?: string[]
}

const AccessControl: React.FC<AccessControlProps> = ({ children, requiredPermissions = [], requiredModules = [] }) => {
  const { profile, isAuthenticated } = useAuthStore()
  const role = profile?.role
  const modules = profile?.modules ?? []

  if (!isAuthenticated) {
    return <Navigate to='/admin' replace />
  }

  // Nếu là Super Admin pass cmnl
  if (role && role.name === 'Super Admin') {
    return <>{children}</>
  }

  // Kiểm tra xem người dùng có quyền truy cập hay không
  const hasAccess = modules.some(
    (module) =>
      requiredModules.includes(module.name) &&
      module.permissions.some((permission) => requiredPermissions.includes(permission.name))
  )

  if (!hasAccess) {
    return <Navigate to='/unauthorized' replace />
  }

  return <>{children}</>
}

export default AccessControl
