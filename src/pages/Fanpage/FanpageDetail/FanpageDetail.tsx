import { IonIcon } from '@ionic/react'
import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import fanpageMemberApi from '~/apis/fanpage-member.api'
import FanpageApi from '~/apis/fanpage.api'
import uploadFileApi from '~/apis/uploadFileApi'
import { getProfileFromLocalStorage } from '~/utils/auth'
import { FanpageNoId, FanpageResponse, Fanpage as FanpageType } from '~/@types/fanpage'
import Modal from '~/components/Modal'
import CreatePost from '~/components/CreatePost'
import usePostStore from '~/store/post.store'
import useQueryListPostFanpage from '~/hooks/queries/post/useQueryListPostFanpage'
import Post from '~/components/Post'
//FanpageMember
function FanpageDetail() {
  const { isCreatePost, setIsCreatePost } = usePostStore()
  const { fanpageId } = useParams<{ fanpageId: any }>()
  const { data } = useQueryListPostFanpage(fanpageId)
  const [fanpage, setFanpage] = React.useState<any | null>(null)
  const [isFollowing, setIsFollowing] = React.useState<boolean>(false)
  const [isJoin, setIsJoin] = React.useState<boolean>(false)
  const location = useLocation()
  const [loading, setLoading] = React.useState<boolean>(true)
  const [inviteUserId, setInviteUserId] = React.useState<string>('')
  const [likesCount, setLikesCount] = React.useState<number>(0)
  const [followsCount, setFollowsCount] = React.useState<number>(0)

  const pages = data?.data.data.pages ?? 0
  const total = data?.data.data.total ?? 0
  const posts = data?.data.data.posts ?? []

  const fetchFanpage = async () => {
    try {
      const response = await FanpageApi.getFanpageDetail(fanpageId)
      console.log(response)
      if (response && response.data) {
        setFanpage(response.data.data.fanpageDetail)
      }
    } catch (error) {
      console.error(`Error fetching fanpage ${fanpageId}:`, error)
    }
  }

  const checkFollowStatus = async () => {
    try {
      const profile = getProfileFromLocalStorage()
      const response = await fanpageMemberApi.getFanpageMembers(fanpageId)
      const members = response.data.data.members
      const currentUser = members.find((member) => member.user_id === profile.user_id && member.is_following != false)
      const exist = members.find((member) => member.user_id === profile.user_id)

      const likes = members.filter((member) => member.is_invited).length
      const follows = members.filter((member) => member.is_following).length

      setLikesCount(likes)
      setFollowsCount(follows)

      console.log('data' + exist)
      if (!exist) {
        setIsJoin(false)
      } else {
        setIsJoin(true)
      }
      setIsJoin(!!exist)
      setIsFollowing(!!currentUser)
    } catch (error) {
      console.error('Error checking follow status:', error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchFanpage()
    checkFollowStatus()
  }, [fanpageId])

  const handleLeaveFanpage = async () => {
    try {
      const response = await fanpageMemberApi.leaveFanpage(fanpageId)
      // Handle success or update UI accordingly
      fetchFanpage()
      checkFollowStatus()
      console.log('Leave fanpage response:', response)
    } catch (error) {
      console.error('Error leaving fanpage:', error)
    }
  }

  const handleFollowFanpage = async () => {
    try {
      const response = await fanpageMemberApi.followFanpage(fanpageId)
      // Handle success or update UI accordingly
      setIsFollowing(true)
      fetchFanpage()
      checkFollowStatus()
      console.log('Follow fanpage response:', response)
    } catch (error) {
      console.error('Error following fanpage:', error)
    }
  }

  const handleUnfollowFanpage = async () => {
    try {
      const response = await fanpageMemberApi.unfollowFanpage(fanpageId)
      // Handle success or update UI accordingly
      setIsFollowing(false)
      fetchFanpage()
      checkFollowStatus()
      console.log('Unfollow fanpage response:', response)
    } catch (error) {
      console.error('Error unfollowing fanpage:', error)
    }
  }

  // upload ảnh
  const handleChangeImage = async (e: any) => {
    alert('Bạn chắn chắn muốn thay đổi')

    setLoading(true)
    try {
      const response = await uploadFileApi.uploadFile(e)
      console.log('response', response)
      if (typeof response === 'string') {
        const updatedFanpage: FanpageNoId = {
          group_name: fanpage.group_name,
          description: fanpage.description,
          followers_count: fanpage.followers_count,
          likes_count: fanpage.likes_count,
          category: fanpage.category,
          address: fanpage.address,
          phone: fanpage.phone,
          is_public: fanpage.is_public,
          role_id: fanpage.role_id,
          image_url: response,
          createdAt: new Date(fanpage.createdAt),
          updatedAt: new Date(fanpage.updatedAt)
        }

        try {
          await FanpageApi.updateFanpage(fanpageId, updatedFanpage)
          fetchFanpage()
        } catch (error) {
          console.error(`Error updating fanpage ${fanpageId}:`, error)
        }
      } else {
        console.error('Invalid response:', response)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!fanpage) {
    return <div>Loading...</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const hasMyFanpages = new URLSearchParams(location.search).has('my-fanpages')

  return (
    <>
      {/* Cover */}
      <div className='dark:bg-dark2 bg-white shadow lg:-mt-10 lg:rounded-b-2xl'>
        {/* Cover image */}
        <div className='relative h-40 w-full overflow-hidden lg:h-60'>
          <img
            src={fanpage.image_url || 'https://i.pinimg.com/originals/b4/4a/ae/b44aae119e1a1334eb416905f2082ad1.jpg'}
            alt='Cover'
            className='inset-0 h-full w-full object-cover'
          />
          {/* Overlay */}
          <div className='absolute bottom-0 left-0 z-10 w-full bg-gradient-to-t from-black/60 pt-10' />
          <div className='absolute bottom-0 right-0 z-50 group-hover:block '>
            <label htmlFor='edit'>
              <IonIcon name='create' style={{ fontSize: '30px', color: 'gray' }}></IonIcon>
            </label>
            <input
              type='file'
              onChange={handleChangeImage}
              hidden
              id='edit'
              name='file'
              accept='image/png, image/jpeg'
            />
          </div>
        </div>
        {/* Profile information */}
        <div className='p-3 md:p-5 lg:px-10'>
          <div className='-mt-20 flex flex-col justify-center'>
            <div className='relative z-10 mb-4 h-20 w-20'>
              <div className='group relative shrink-0 overflow-hidden rounded-full border-gray-100 shadow md:border-[2px] dark:border-slate-900'>
                <img
                  src={fanpage.image_url}
                  // src='https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png'
                  alt='Avatar'
                  className='inset-0 h-[78px] w-[78px] object-cover'
                />
                <div className='z-60 absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform group-hover:block'>
                  <label htmlFor='icons'>
                    <IonIcon name='camera' style={{ fontSize: '30px', color: 'gray' }}></IonIcon>
                  </label>
                  <input
                    type='file'
                    hidden
                    onChange={handleChangeImage}
                    id='icons'
                    name='file'
                    accept='image/png, image/jpeg'
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-between max-md:flex-col max-md:gap-3 lg:items-center'>
              <div className='flex-1'>
                <h3 className='text-lg font-bold text-black md:text-2xl dark:text-white'>{fanpage.group_name}</h3>
                <p className='mt-2 flex gap-2 font-normal text-gray-500 dark:text-white/80'>
                  <span>
                    <b className='font-medium text-black dark:text-white'>{likesCount || 0}</b> Thích
                  </span>
                  <span> • </span>
                  <span>
                    <b className='font-medium text-black dark:text-white'>{followsCount || 0}</b> Theo Dõi
                  </span>
                </p>
              </div>
              <div className='mt-1 flex items-center gap-2'>
                {!hasMyFanpages && (
                  <>
                    {isJoin ? (
                      <button
                        onClick={handleLeaveFanpage}
                        className='button flex items-center gap-2 bg-secondery px-3.5 py-2 max-lg:flex-1'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          className='h-5 w-5'
                        >
                          <path d='M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.725-.55l-.65-.433a6.257 6.257 0 00-3.16-.964H3.25a1.25 1.25 0 110-2.5h3.924a8.758 8.758 0 014.428 1.278l.65.433c.19.126.41.194.634.194h3.193a.682.682 0 00.618-.404 21.37 21.37 0 001.205-5.354.348.348 0 00-.348-.396h-2.52A3 3 0 0111 3zm-5 4.5A1.5 1.5 0 117 9 1.5 1.5 0 016 7.5z' />
                        </svg>
                        <span className='text-sm'>Thích</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleFollowFanpage}
                        className='button flex items-center gap-2 bg-secondery px-3.5 py-2 max-lg:flex-1'
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='#D3D3D3' className='h-5 w-5'>
                          {' '}
                          {/* Lighter color for the SVG */}
                          <path d='M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.725-.55l-.65-.433a6.257 6.257 0 00-3.16-.964H3.25a1.25 1.25 0 110-2.5h3.924a8.758 8.758 0 014.428 1.278l.65.433c.19.126.41.194.634.194h3.193a.682.682 0 00.618-.404 21.37 21.37 0 001.205-5.354.348.348 0 00-.348-.396h-2.52A3 3 0 0111 3zm-5 4.5A1.5 1.5 0 117 9 1.5 1.5 0 016 7.5z' />
                        </svg>
                        <span className='text-sm'>Thích</span>
                      </button>
                    )}
                    {isFollowing ? (
                      <>
                        <button
                          onClick={handleUnfollowFanpage}
                          className='button flex items-center gap-2 bg-red-600 px-3.5 py-2 text-white max-lg:flex-1'
                        >
                          <span className='text-sm'>Hủy theo dõi</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleFollowFanpage}
                          className='button flex items-center gap-2 bg-green-600 px-3.5 py-2 text-white max-lg:flex-1'
                        >
                          <span className='text-sm'>Theo dõi</span>
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8 flex gap-10 max-lg:flex-col 2xl:gap-12' id='js-oversized'>
        {/* feed story */}
        <div className='flex-1 space-y-3 xl:space-y-6'>
          {/* add story */}
          <Modal isVisible={isCreatePost} onClose={() => setIsCreatePost(false)} width='40%'>
            <CreatePost />
          </Modal>

          {/* Thêm mới bài viết */}
          <div className='border1 dark:bg-dark2 space-y-4 rounded-xl bg-white p-4 text-sm font-medium shadow-sm'>
            <div className='flex items-center gap-3'>
              <div
                className='dark:bg-dark3 flex-1 cursor-pointer rounded-lg bg-slate-100 transition-all hover:bg-opacity-80'
                onClick={() => setIsCreatePost(true)}
              >
                <div className='py-2.5 text-center dark:text-white'> Bạn đang suy nghĩ điều gì? </div>
              </div>
              <div className='cursor-pointer rounded-lg bg-pink-100/60 p-1 px-1.5 transition-all hover:bg-pink-100 hover:bg-opacity-80'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 fill-pink-200/70 stroke-pink-600'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='#2c3e50'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M15 8h.01' />
                  <path d='M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z' />
                  <path d='M3.5 15.5l4.5 -4.5c.928 -.893 2.072 -.893 3 0l5 5' />
                  <path d='M14 14l1 -1c.928 -.893 2.072 -.893 3 0l2.5 2.5' />
                </svg>
              </div>
              <div className='cursor-pointer rounded-lg bg-sky-100/60 p-1 px-1.5 transition-all hover:bg-sky-100 hover:bg-opacity-80'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 fill-sky-200/70 stroke-sky-600 '
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='#2c3e50'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z' />
                  <path d='M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z' />
                </svg>
              </div>
            </div>
          </div>

          <Post posts={posts} fanpage={data?.data.data.fanpage} />
        </div>
        <div className='lg:w-[400px]'>
          <div
            className='max-lg:grid max-lg:gap-6 sm:grid-cols-2 lg:space-y-4 lg:pb-8'
            uk-sticky='media: 1024; end: #js-oversized; offset: 80'
          >
            <div className='box p-5 px-6'>
              <div className='items-ce flex justify-between text-black dark:text-white'>
                <h3 className='text-lg font-bold'> Giới Thiệu </h3>
                <a href='#' className='text-sm text-blue-500'>
                  Chỉnh Sửa
                </a>
              </div>
              <ul className='mt-4 space-y-4 text-sm text-gray-700 dark:text-white/80'>
                <li className='flex items-center gap-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122'
                    />
                  </svg>
                  <div>
                    {' '}
                    Trang - <span className='font-semibold text-black dark:text-white'>
                      {' '}
                      Việc kinh doanh , Mua sắm
                    </span>{' '}
                  </div>
                </li>
                <li className='flex items-center gap-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                    />
                  </svg>
                  <div>
                    {' '}
                    Bài viết <span className='font-semibold text-black dark:text-white'> 120 </span>{' '}
                  </div>
                </li>
                <li className='flex items-center gap-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z'
                    />
                  </svg>
                  <div> +123 456 789 </div>
                </li>
                <li className='flex items-center gap-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
                    />
                  </svg>
                  <div> martingray@gmail.com</div>
                </li>
                <li className='flex items-center gap-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                    />
                  </svg>
                  <div>
                    {' '}
                    Đánh giá · <span className='font-semibold text-black dark:text-white'> 4.6</span> (59 reviews){' '}
                  </div>
                </li>
                <li className='flex items-center gap-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>
                  <div>
                    {' '}
                    3,240<span className='font-semibold text-black dark:text-white'> Người Theo Dõi </span>{' '}
                  </div>
                </li>
              </ul>
            </div>
            {/* group media  */}
            <div className='box p-5 px-6'>
              <div className='flex items-baseline justify-between text-black dark:text-white'>
                <h3 className='text-base font-bold'> Truyền thông gần đây </h3>
                <a href='#' className='text-sm text-blue-500'>
                  Xem tất cả
                </a>
              </div>
              <div className='mb-2 mt-4 grid grid-cols-2 gap-1 overflow-hidden rounded-lg text-center text-sm'>
                <div className='relative aspect-[4/3] w-full'>
                  <img
                    src='https://res.cloudinary.com/dswainylr/image/upload/v1717866186/50615f8b24c2879cded3_ykqrnu.jpg'
                    alt=''
                    className='inset-0 h-full w-full object-cover'
                  />
                </div>
                <div className='relative aspect-[4/3] w-full'>
                  <img
                    src='src/assets/images/avatars/avatar-7.jpg'
                    alt=''
                    className='inset-0 h-full w-full object-cover'
                  />
                </div>
                <div className='relative aspect-[4/3] w-full'>
                  <img
                    src='src/assets/images/avatars/avatar-4.jpg'
                    alt=''
                    className='inset-0 h-full w-full object-cover'
                  />
                </div>
                <div className='relative aspect-[4/3] w-full'>
                  <img
                    src='src/assets/images/avatars/avatar-6.jpg'
                    alt=''
                    className='inset-0 h-full w-full object-cover'
                  />
                </div>
              </div>
            </div>
            {/* related pages  */}
            <div className='box p-5 px-6'>
              <div className='flex items-baseline justify-between text-black dark:text-white'>
                <h3 className='text-base font-bold'> Trang bạn quản lý </h3>
                <a href='#' className='text-sm text-blue-500'>
                  Xem tất cả
                </a>
              </div>
              <div className='side-list'>
                <div className='side-list-item'>
                  <a href='timeline-page.html'>
                    <img src='src/assets/images/avatars/avatar-4.jpg' alt='' className='side-list-image rounded-full' />
                  </a>
                  <div className='flex-1'>
                    <a href='timeline-page.html'>
                      <h4 className='side-list-title'> Martin Gray</h4>
                    </a>
                    <div className='side-list-info'> 320k Following </div>
                  </div>
                  <button className='button bg-secondery'>Chỉnh sửa</button>
                  <button className='button bg-secondery'>Xóa</button>
                </div>
                <div className='side-list-item'>
                  <a href='timeline-page.html'>
                    <img src='src/assets/images/avatars/avatar-3.jpg' alt='' className='side-list-image rounded-full' />
                  </a>
                  <div className='flex-1'>
                    <a href='timeline-page.html'>
                      <h4 className='side-list-title'> Monroe Parker</h4>
                    </a>
                    <div className='side-list-info'> 125k Following</div>
                  </div>
                  <button className='button bg-secondery'>Chỉnh sửa</button>
                  <button className='button bg-secondery'>Xóa</button>
                </div>
                <div className='side-list-item'>
                  <a href='timeline-page.html'>
                    <img src='src/assets/images/avatars/avatar-2.jpg' alt='' className='side-list-image rounded-full' />
                  </a>
                  <div className='flex-1'>
                    <a href='timeline-page.html'>
                      <h4 className='side-list-title'> John Michael</h4>
                    </a>
                    <div className='side-list-info'> 320k Following </div>
                  </div>
                  <button className='button bg-secondery'>Chỉnh sửa</button>
                  <button className='button bg-secondery'>Xóa</button>
                </div>
              </div>
            </div>
            {/* related pages  */}
            {/* <div className='box p-5 px-6'>
              <div className='flex items-baseline justify-between text-black dark:text-white'>
                <h3 className='text-base font-bold'> Trang được đề xuất </h3>
                <a href='#' className='text-sm text-blue-500'>
                  Xem tất cả
                </a>
              </div>
              <div className='side-list'>
                <div className='side-list-item'>
                  <a href='timeline-page.html'>
                    <img src='src/assets/images/avatars/avatar-5.jpg' alt='' className='side-list-image rounded-full' />
                  </a>
                  <div className='flex-1'>
                    <a href='timeline-page.html'>
                      <h4 className='side-list-title'> James Lewis</h4>
                    </a>
                    <div className='side-list-info'> 192k Following </div>
                  </div>
                  <button className='button border'>Theo dõi</button>
                </div>
                <div className='side-list-item'>
                  <a href='timeline-page.html'>
                    <img src='src/assets/images/avatars/avatar-4.jpg' alt='' className='side-list-image rounded-full' />
                  </a>
                  <div className='flex-1'>
                    <a href='timeline-page.html'>
                      <h4 className='side-list-title'> Martin Gray</h4>
                    </a>
                    <div className='side-list-info'> 320k Following </div>
                  </div>
                  <button className='button border'>Theo dõi</button>
                </div>
                <div className='side-list-item'>
                  <a href='timeline-page.html'>
                    <img src='src/assets/images/avatars/avatar-2.jpg' alt='' className='side-list-image rounded-full' />
                  </a>
                  <div className='flex-1'>
                    <a href='timeline-page.html'>
                      <h4 className='side-list-title'> John Michael</h4>
                    </a>
                    <div className='side-list-info'> 260k Following </div>
                  </div>
                  <button className='button border'>Theo dõi</button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default FanpageDetail
function setUploadFile(response: string) {
  throw new Error('Function not implemented.')
}
