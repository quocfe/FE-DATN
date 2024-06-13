import { Navigate, useRoutes } from 'react-router-dom'
import MainLayout from '~/layouts/MainLayout'
import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import RejectedRoute from './components/RejectedRoute'
import Profile from '~/pages/Profile/Profile'
import ConfirmOTP from '~/pages/ConfirmOTP'
import NotFound from '~/pages/NotFound/NotFound'
import Dashboard from '~/pages/admin/Dashboard'
import LoginAdmin from '~/pages/admin/LoginAdmin'
import PublicProfile from '~/pages/PublicProfile'
import { FriendList, FriendRequest, FriendSuggest } from '~/pages/Friend'
import Setting from '~/pages/Setting'
import BasicInfo from '~/pages/Setting/BasicInfo'
import ChangePassword from '~/pages/Setting/ChangePassword'
import ListBlocks from '~/pages/Setting/ListBlocks'
import Game from '~/pages/Game'
import GamePlay from '~/pages/GamePlay'

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
          path: '/profile/:user_id',
          element: (
            <MainLayout>
              <PublicProfile />
            </MainLayout>
          )
        },
        {
          path: '/friend',
          children: [
            {
              path: '',
              element: <Navigate to={'/friend/list'} replace />
            },
            {
              path: 'list',
              element: (
                <MainLayout>
                  <FriendList />
                </MainLayout>
              )
            },
            {
              path: 'requests',
              element: (
                <MainLayout>
                  <FriendRequest />
                </MainLayout>
              )
            },
            {
              path: 'suggests',
              element: (
                <MainLayout>
                  <FriendSuggest />
                </MainLayout>
              )
            }
          ]
        },
        {
          path: '/game',
          children: [
            {
              path: '',
              element: (
                <MainLayout>
                  <Game />
                </MainLayout>
              )
            },
            {
              path: 'play/:id',
              element: (
                <MainLayout>
                  <GamePlay />
                </MainLayout>
              )
            }
          ]
        },
        {
          path: '/setting',
          children: [
            {
              path: '',
              element: (
                <MainLayout>
                  <Setting>
                    <BasicInfo />
                  </Setting>
                </MainLayout>
              )
            },
            {
              path: 'password',
              element: (
                <MainLayout>
                  <Setting>
                    <ChangePassword />
                  </Setting>
                </MainLayout>
              )
            },
            {
              path: 'blocks',
              element: (
                <MainLayout>
                  <Setting>
                    <ListBlocks />
                  </Setting>
                </MainLayout>
              )
            }
          ]
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
      path: '/admin',
      children: [
        {
          path: '',
          element: <Navigate to={'/admin/dashboard'} replace />
        },
        {
          path: 'login',
          element: <LoginAdmin />
        },
        {
          path: 'dashboard',
          element: <Dashboard />
        }
      ]
    },
    {
      path: '/not_found',
      element: <NotFound />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return routeElements
}

export default useRouteElements
