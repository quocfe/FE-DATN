import { Navigate, useRoutes } from 'react-router-dom'
import MainLayout from '~/layouts/MainLayout'
import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import { ProtectedRoute, AdminProtectedRoute } from './components/ProtectedRoute'
import RejectedRoute from './components/RejectedRoute'
import Profile from '~/pages/Profile/Profile'
import ConfirmOTP from '~/pages/ConfirmOTP'
import NotFound from '~/pages/NotFound/NotFound'
import Dashboard from '~/pages/admin/Dashboard'
import PublicProfile from '~/pages/PublicProfile'
import { Game, GamePlay } from '~/pages/Game'
import Setting from '~/pages/Setting'
import BasicInfo from '~/pages/Setting/BasicInfo'
import ChangePassword from '~/pages/Setting/ChangePassword'
import ListBlocks from '~/pages/Setting/ListBlocks'
import MyFriends from '~/pages/Profile/MyFriends'
import FriendRequest from '~/pages/Friend/FriendRequest'
import FriendSuggest from '~/pages/Friend/FriendSuggest'
import FriendLayout from '~/pages/Friend/FriendLayout'
import SentFriendRequests from '~/pages/Friend/SentFriendRequests'
import PersonalPublic from '~/pages/PublicProfile/PersonalPublic'
import PersonalPrivate from '~/pages/Profile/PersonalPrivate'
import FriendInfoDisplay from '~/pages/PublicProfile/FriendInfoDisplay/FriendInfoDisplay'
import MediaResources from '~/pages/Profile/MediaResources'
import LoginAdmin from '~/pages/admin/LoginAdmin'
import AdminLayout from '~/layouts/AdminLayout'
import ListRole from '~/pages/admin/Role/ListRole'
import PermissionList from '~/pages/admin/Permission/PermissionList'
import AccountList from '~/pages/admin/User/AccountList'
import AccessControl from './components/AccessControl'
import Unauthorized from '~/pages/Unauthorized'

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/admin',
      element: <AdminProtectedRoute />,
      children: [
        {
          path: 'login',
          element: <LoginAdmin />
        },
        {
          path: 'dashboard',
          element: (
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          )
        },
        {
          path: 'role',
          children: [
            {
              path: 'list',
              element: (
                <AccessControl requiredModules={['Role Management']} requiredPermissions={['view']}>
                  <AdminLayout>
                    <ListRole />
                  </AdminLayout>
                </AccessControl>
              )
            }
          ]
        },
        {
          path: 'permission',
          children: [
            {
              path: 'list',
              element: (
                <AccessControl requiredModules={['Super Admin']}>
                  <AdminLayout>
                    <PermissionList />
                  </AdminLayout>
                </AccessControl>
              )
            }
          ]
        },
        {
          path: 'account/list',
          element: (
            <AccessControl requiredModules={['Super Admin']}>
              <AdminLayout>
                <AccountList />
              </AdminLayout>
            </AccessControl>
          )
        }
      ]
    },
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
          path: 'profile',
          children: [
            {
              path: '',
              element: (
                <MainLayout>
                  <Profile>
                    <PersonalPrivate />
                  </Profile>
                </MainLayout>
              )
            },
            {
              path: 'my_friends',
              element: (
                <MainLayout>
                  <Profile>
                    <MyFriends />
                  </Profile>
                </MainLayout>
              )
            },
            {
              path: 'media_resource',
              element: (
                <MainLayout>
                  <Profile>
                    <MediaResources />
                  </Profile>
                </MainLayout>
              )
            },
            {
              path: ':user_id',
              children: [
                {
                  path: '',
                  element: (
                    <MainLayout>
                      <PublicProfile>
                        <PersonalPublic />
                      </PublicProfile>
                    </MainLayout>
                  )
                },
                {
                  path: 'friends',
                  element: (
                    <MainLayout>
                      <PublicProfile>
                        <FriendInfoDisplay />
                      </PublicProfile>
                    </MainLayout>
                  )
                }
              ]
            }
          ]
        },
        {
          path: 'friend',
          children: [
            {
              path: '',
              element: <Navigate to='/profile/my_friends' replace />
            },
            {
              path: 'requests',
              element: (
                <MainLayout>
                  <FriendLayout>
                    <FriendRequest />
                  </FriendLayout>
                </MainLayout>
              )
            },
            {
              path: 'suggests',
              element: (
                <MainLayout>
                  <FriendLayout>
                    <FriendSuggest />
                  </FriendLayout>
                </MainLayout>
              )
            },
            {
              path: 'sent_requests',
              element: (
                <MainLayout>
                  <FriendLayout>
                    <SentFriendRequests />
                  </FriendLayout>
                </MainLayout>
              )
            }
          ]
        },
        {
          path: 'game',
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
          path: 'setting',
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
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        }
      ]
    },
    {
      path: 'confirm_otp/:email',
      element: <ConfirmOTP />
    },
    {
      path: 'not_found',
      element: <NotFound />
    },
    {
      path: 'unauthorized',
      element: <Unauthorized />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return routeElements
}

export default useRouteElements
