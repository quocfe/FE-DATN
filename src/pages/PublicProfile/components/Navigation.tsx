import { IonIcon } from '@ionic/react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useMutationBlockedUser from '~/hooks/mutations/user/useMutationBlockedUser'
import useMutationCancelFriendRequest from '~/hooks/mutations/user/useMutationCancelFriendRequest'

interface Props {
  profile: UserProfile | null
  status: string | null
}

function Navigation({ profile, status }: Props) {
  // Hooks
  const navigate = useNavigate()
  // React Query Hooks
  const queryClient = useQueryClient()
  const blockedUserMutation = useMutationBlockedUser()
  const cancelFriendRequestMutation = useMutationCancelFriendRequest()

  // Hủy kết bạn
  const handleFriendRequest = () => {
    if (window.confirm('Xác nhận hủy kết bạn!')) {
      if (profile) {
        cancelFriendRequestMutation.mutate(profile.user_id, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['public_profile', { user_id: profile.user_id }] })
            toast.success('Hủy kết bạn thành công')
          },
          onError: (error) => {
            toast.error(error.message)
          }
        })
      }
    }
  }

  // Chặn người dùng
  const handleBlockedUser = () => {
    if (window.confirm('Xác nhận chặn người dùng này!')) {
      if (profile) {
        blockedUserMutation.mutate(profile.user_id, {
          onSuccess: () => {
            toast.success('Chặn người dùng thành công')
            navigate('/')
          },
          onError: () => {
            toast.error('Đã có lỗi xảy ra!')
          }
        })
      }
    }
  }

  return (
    <div
      className='mt-3 flex items-center justify-between border-t border-gray-100 px-2 max-lg:flex-col dark:border-slate-700'
      uk-sticky='offset:50; cls-active: bg-white/80 shadow rounded-b-2xl z-50 backdrop-blur-xl dark:!bg-slate-700/80; animation:uk-animation-slide-top ; media: 992'
    >
      <div className='flex items-center gap-2 py-2 pr-1 text-sm max-md:w-full lg:order-2'>
        <button type='submit' className='dark:bg-dark2 flex rounded-lg bg-secondery px-2.5 py-2'>
          <IonIcon icon='search' className='text-xl' />
        </button>
        <div>
          <button type='submit' className='dark:bg-dark3 flex rounded-lg bg-secondery px-2.5 py-2'>
            <IonIcon icon='ellipsis-horizontal' className='text-xl' />
          </button>
          <div
            className='w-[240px]'
            uk-dropdown='pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click;offset:10'
          >
            <nav>
              {status === 'Đã chấp nhận' && (
                <a
                  onClick={handleFriendRequest}
                  className='cursor-pointer text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50'
                >
                  <IonIcon icon='close-circle-outline' className='text-[22px]' />
                  Hủy kết bạn
                </a>
              )}

              {status === 'Chờ chấp nhận' && (
                <>
                  <a href='#'>
                    <IonIcon className='text-xl' icon='pricetags-outline' /> Xác nhận
                  </a>
                  <a className='cursor-pointer text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50'>
                    <IonIcon icon='close-circle-outline' className='text-[22px]' />
                    Xóa lời mời
                  </a>
                </>
              )}

              {status === null && (
                <a href='#'>
                  <IonIcon className='text-xl' icon='pricetags-outline' /> Kết bạn
                </a>
              )}

              <a href='#'>
                <IonIcon className='text-xl' icon='time-outline' /> Mute story
              </a>
              <a href='#'>
                <IonIcon className='text-xl' icon='flag-outline' /> Báo cáo
              </a>
              <a href='#'>
                <IonIcon className='text-xl' icon='share-outline' /> Chia sẻ trang cá nhân
              </a>
              <hr />
              <a
                onClick={handleBlockedUser}
                className='cursor-pointer text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50'
              >
                <IonIcon className='text-xl' icon='stop-circle-outline' /> Chặn người dùng
              </a>
            </nav>
          </div>
        </div>
      </div>
      <nav className='-mb-px flex gap-0.5 rounded-xl text-[15px] font-medium text-gray-600  max-md:w-full max-md:overflow-x-auto dark:text-white'>
        <a href='#' className='inline-block  border-b-2 border-blue-600 px-3.5 py-3 leading-8 text-blue-600'>
          Trang cá nhân
        </a>
        <a href='#' className='inline-block px-3.5 py-3 leading-8'>
          Bạn bè <span className='hidden pl-2 text-xs font-normal lg:inline-block'>2,680</span>
        </a>
        <a href='#' className='inline-block px-3.5 py-3 leading-8'>
          Hình ảnh
        </a>
        <a href='#' className='inline-block px-3.5 py-3 leading-8'>
          Video
        </a>
        <a href='#' className='inline-block px-3.5 py-3 leading-8'>
          Check in
        </a>
        <a href='#' className='inline-block px-3.5 py-3 leading-8'>
          Video
        </a>
        {/* dropdown */}
        <div>
          <a href='#' className='inline-flex items-center gap-2 px-3 py-3 leading-8'>
            Xem thêm <IonIcon icon='chevron-down' />
          </a>
          <div
            className='w-screen md:w-[240px]'
            uk-dropdown='pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click;offset:-4'
          >
            <nav className='text-[15px]'>
              <a href='#'> Likes </a>
              <a href='#'> Music </a>
              <a href='#'> Events </a>
              <a href='#'> Books </a>
              <a href='#'> Reviews given </a>
              <a href='#'> Groups</a>
              <a href='#'> Manage Sections</a>
            </nav>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navigation
