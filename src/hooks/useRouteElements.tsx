import { useRoutes } from 'react-router-dom'
import { ROUTE_PATH } from '~/constants'
import MainLayout from '~/layouts/MainLayout'
import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import Watch from '~/pages/Watch'
import WatchDetail from '~/pages/WatchDetail'
import ProtectedRoute from './components/ProtectedRoute'
import RejectedRoute from './components/RejectedRoute'
import Profile from '~/pages/Profile/Profile'
import ConfirmOTP from '~/pages/ConfirmOTP'
import NotFound from '~/pages/NotFound/NotFound'

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: (
            <MainLayout>
              <Home />
            </MainLayout>
          )
        },
        {
          path: '/profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },
        {
          path: ROUTE_PATH.WATCH,
          element: (
            <MainLayout>
              <Watch />
            </MainLayout>
          )
        },
        {
          path: ROUTE_PATH.WATCH_DETAIL,
          element: (
            <MainLayout>
              <WatchDetail />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        }
      ]
    },
    {
      path: '/confirm_otp/:email',
      element: <ConfirmOTP />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return routeElements
}

export default useRouteElements
