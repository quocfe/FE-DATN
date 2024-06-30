import { IonIcon } from '@ionic/react'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import Dialog from '~/components/Dialog'
import { ENDPOINT } from '~/constants/endpoint.constant'
import useMutationAcceptFriendRequest from '~/hooks/mutations/user/useMutationAcceptFriendRequest'
import useMutationCancelFriendRequest from '~/hooks/mutations/user/useMutationCancelFriendRequest'
import useMutationSenderFriendRequest from '~/hooks/mutations/user/useMutationSenderFriendRequest'
import useBlockedUser from '~/hooks/user/useBlockedUser'

interface Props {
  profile: UserProfile | null
  relationship: {
    user_id: string
    friend_id: string
    status: string
  } | null
}

function Navigation({ profile, relationship }: Props) {
  // Hooks
  const [showDialogBlockUser, setShowDialogBlockUser] = useState<boolean>(false)
  const [showDialogCancelFriendRequest, setShowDialogCancelFriendRequest] = useState<boolean>(false)
  const { pathname } = useLocation()

  // React Query
  const queryClient = useQueryClient()
  const senderFriendRequestMutation = useMutationSenderFriendRequest()
  const acceptFriendRequestMutation = useMutationAcceptFriendRequest()
  const cancelFriendRequestMutation = useMutationCancelFriendRequest()

  // Custom Hooks React Query
  const { handleBlockedUser } = useBlockedUser(profile?.user_id)

  // Gửi lời mời kết bạn
  const handleSenderFriendRequest = (friend_id: string) => () => {
    if (profile) {
      senderFriendRequestMutation.mutate(friend_id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['public_profile', { user_id: profile.user_id }] })
          toast.success('Gửi lời mời kết bạn thành công')
        },
        onError: (error) => {
          toast.error('Đã có lỗi xảy ra')
          console.log(error)
        }
      })
    }
  }

  // Chấp nhận lời mời kết bạn
  const handleAcceptFriendRequest = () => {
    if (profile) {
      acceptFriendRequestMutation.mutate(profile.user_id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['public_profile', { user_id: profile.user_id }] })
          toast.success('Đã chấp nhận lời mời kết bạn')
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
    }
  }

  // Hủy kết bạn + lời mời
  const handleCancelFriendRequest = (notifi: string) => () => {
    if (profile) {
      cancelFriendRequestMutation.mutate(profile.user_id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['public_profile', { user_id: profile.user_id }] })
          if (showDialogCancelFriendRequest) {
            setShowDialogCancelFriendRequest(false)
          }
          toast.success(notifi)
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
    }
  }

  return (
    <>
      <Dialog
        isVisible={showDialogBlockUser}
        onClose={() => setShowDialogBlockUser(false)}
        type='warning'
        title={`Chắc chắn chặn ${profile?.last_name} ${profile?.first_name}!`}
        description='Khi được chặn, người dùng sẽ không thể thực hiện các hoạt động như gửi tin nhắn, bình luận, hoặc xem nội dung, bảo vệ cộng đồng khỏi hành vi không phù hợp hoặc spam.'
        textBtn='Chặn người dùng'
        callback={handleBlockedUser}
      />
      <Dialog
        isVisible={showDialogCancelFriendRequest}
        onClose={() => setShowDialogCancelFriendRequest(false)}
        type='warning'
        title={`Chắc chắn hủy kết bạn ${profile?.last_name} ${profile?.first_name}!`}
        description=' Khi hủy kết bạn, mối quan hệ trực tiếp giữa hai tài khoản sẽ được chấm dứt, và họ sẽ không còn nhìn thấy bài viết hay thông tin cá nhân của nhau trong nguồn cấp dữ liệu hoặc danh sách bạn bè, giúp người dùng có thêm quyền kiểm soát về mối quan hệ và thông tin cá nhân họ muốn chia sẻ.'
        textBtn='Hủy kết bạn'
        callback={handleCancelFriendRequest(`Đã hủy kết bạn với ${profile?.last_name} ${profile?.first_name}`)}
      />
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
                {/* không có bản ghi nào */}
                {relationship === null && (
                  <a onClick={handleSenderFriendRequest(profile?.user_id ?? '')} className='cursor-pointer'>
                    <IonIcon className='text-xl' icon='pricetags-outline' /> Kết bạn
                  </a>
                )}

                {/* Đã là bạn bè */}
                {relationship?.status === 'Đã chấp nhận' && (
                  <a
                    onClick={() => setShowDialogCancelFriendRequest(true)}
                    className='cursor-pointer text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50'
                  >
                    <IonIcon icon='close-circle-outline' className='text-[22px]' />
                    Hủy kết bạn
                  </a>
                )}

                {/* status:  chờ chấp nhận &&  người gửi chính là tôi */}
                {relationship?.status === 'Chờ chấp nhận' && relationship.user_id !== profile?.user_id && (
                  <>
                    <a
                      onClick={handleCancelFriendRequest(
                        `Đã hủy lời mời kết bạn ${profile?.last_name} ${profile?.first_name}`
                      )}
                      className='cursor-pointer text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50'
                    >
                      <IonIcon icon='close-circle-outline' className='text-[22px]' />
                      Hủy lời mời
                    </a>
                  </>
                )}

                {relationship?.status === 'Chờ chấp nhận' && relationship.friend_id !== profile?.user_id && (
                  <>
                    <a
                      onClick={handleAcceptFriendRequest}
                      style={{ color: 'rgb(57 190 106)' }}
                      className='cursor-pointer'
                    >
                      <IonIcon name='checkmark-done-outline' className='text-xl' /> Chấp nhận
                    </a>
                    <a className='cursor-pointer text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50'>
                      <IonIcon icon='close-circle-outline' className='text-[22px]' />
                      Xóa lời mời
                    </a>
                  </>
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
                  onClick={() => setShowDialogBlockUser(true)}
                  className='cursor-pointer text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50'
                >
                  <IonIcon className='text-xl' icon='stop-circle-outline' /> Chặn người dùng
                </a>
              </nav>
            </div>
          </div>
        </div>
        <nav className='-mb-px flex gap-0.5 rounded-xl text-[15px] font-medium text-gray-600  max-md:w-full max-md:overflow-x-auto dark:text-white'>
          <Link
            to={`${ENDPOINT.PROFILE}/${profile?.user_id}`}
            className={classNames('inline-block px-3.5 py-3 leading-8 ', {
              'border-b-2 border-blue-600 text-blue-600': pathname === `${ENDPOINT.PROFILE}/${profile?.user_id}`
            })}
          >
            Trang cá nhân
          </Link>
          <Link
            to={`${ENDPOINT.PROFILE}/${profile?.user_id}/friends`}
            className={classNames('inline-block px-3.5 py-3 leading-8 ', {
              'border-b-2 border-blue-600 text-blue-600': pathname === `${ENDPOINT.PROFILE}/${profile?.user_id}/friends`
            })}
          >
            Bạn bè
          </Link>
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
    </>
  )
}

export default Navigation
