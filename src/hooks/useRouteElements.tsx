import { Outlet, useRoutes } from 'react-router-dom'
import { ROUTE_PATH } from '~/constants'
import MainLayout from '~/layouts/MainLayout'
import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import Watch from '~/pages/Watch'
import WatchDetail from '~/pages/WatchDetail'

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: '/login',
      index: true,
      element: <Login />
    },
    {
      path: '/register',
      index: true,
      element: <Register />
    },
    {
      path: ROUTE_PATH.WATCH,
      element: (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ),
      children: [
        {
          index: true,
          element: <Watch />
        },
        {
          path: ROUTE_PATH.WATCH_DETAIL,
          index: true,
          element: <WatchDetail />
        }
      ]
    }
  ])

  return routeElements
}

export default useRouteElements
