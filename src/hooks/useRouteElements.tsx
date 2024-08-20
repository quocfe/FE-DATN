import { Navigate, useRoutes } from 'react-router-dom'
import MainLayout from '~/layouts/MainLayout'
import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import { ProtectedRoute, AdminProtectedRoute } from './components/ProtectedRoute'
import RejectedRoute from './components/RejectedRoute'
import ConfirmOTP from '~/pages/ConfirmOTP'
import NotFound from '~/pages/NotFound/NotFound'
<<<<<<< HEAD
import Fanpage from '~/pages/Fanpage'
=======
>>>>>>> 7077d3f21008e4d09dd239ed6ad4da308f8307c7
import DStory from '~/pages/Story'
import ArchiveStory from '~/pages/Story/Component/Archive'
import Message from '~/pages/Message'
import Dashboard from '~/pages/admin/Dashboard'
import PublicProfile from '~/pages/PublicProfile'
import Setting from '~/pages/Setting'
import BasicInfo from '~/pages/Setting/BasicInfo'
import ChangePassword from '~/pages/Setting/ChangePassword'
import ListBlocks from '~/pages/Setting/ListBlocks'
import RoomCall from '~/pages/RoomCall'
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
import Fanpage from '~/pages/Fanpage'
import FanpageDetail from '~/pages/Fanpage/FanpageDetail/FanpageDetail'
import FanpageCreate from '~/pages/Fanpage/FanpageCreate/FanpageCreate'
import FanpageEdit from '~/pages/Fanpage/FanpageEdit/FanpageEdit'
import VideoLayout from '~/layouts/video-layout'
import WatchSave from '~/pages/WatchSave'
import { ROUTE_PATH } from '~/constants'
import Watch from '~/pages/Watch'
import WatchDetail from '~/pages/WatchDetail'
import Profile from '~/pages/Profile'
import Game from '~/pages/Game/Game'
import GamePlay from '~/pages/Game/GamePlay'
<<<<<<< HEAD
=======
import WatchSearch from '~/pages/WatchSearch'
>>>>>>> 7077d3f21008e4d09dd239ed6ad4da308f8307c7

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
        },
        {
          path: 'message/list',
          element: (
            <AccessControl requiredModules={['Message Management']} requiredPermissions={['view']}>
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
          path: '/message',
          element: (
            <MainLayout>
              <Message />
            </MainLayout>
          )
        },
        {
          path: '/fanpage',
          element: (
            <MainLayout>
              <Fanpage />
            </MainLayout>
          )
        },
        {
          path: '/story',
<<<<<<< HEAD
          element: (
              <DStory />
          )
        },
        {
          path: '/story/archive',
          element: (
              <ArchiveStory />
          )
        },
        
        
{
=======
          element: <DStory />
        },
        {
          path: '/story/archive',
          element: <ArchiveStory />
        },

        {
>>>>>>> 7077d3f21008e4d09dd239ed6ad4da308f8307c7
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
          path: '/fanpage',
          element: (
            <MainLayout>
              <Fanpage />
            </MainLayout>
          )
        },
        {
          path: '/fanpage-create',
          element: <FanpageCreate />
        },
        {
          path: '/fanpage-edit/:fanpageId',
          element: <FanpageEdit />
        },
        {
          path: '/fanpage/:fanpageId',
          element: (
            <MainLayout>
              <FanpageDetail />
            </MainLayout>
          )
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
        },
        {
          path: '/videocall/:roomId/:userId/:groupId/:senderId',
          element: <RoomCall />
        },
        {
          path: ROUTE_PATH.WATCH,
          element: (
            <VideoLayout>
              <Watch />
            </VideoLayout>
          )
        },
        {
          path: ROUTE_PATH.WATCH_SAVE,
          element: (
            <VideoLayout>
              <WatchSave />
            </VideoLayout>
          )
        },
        {
          path: ROUTE_PATH.WATCH_DETAIL,
          element: (
            <VideoLayout>
              <WatchDetail />
            </VideoLayout>
          )
        },
        {
          path: ROUTE_PATH.WATCH_SEARCH,
          element: (
            <VideoLayout>
              <WatchSearch />
            </VideoLayout>
          )
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
