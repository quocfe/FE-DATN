import React, { useState, useEffect } from 'react'
import { FanpageNoId, FanpageResponse, Fanpage as FanpageType, FanpageMember } from '~/@types/fanpage'
import FanpageApi from '~/apis/fanpage.api'
import { Link } from 'react-router-dom'
import { getProfileFromLocalStorage } from '~/utils/auth'
import fanpageMemberApi from '~/apis/fanpage-member.api'
import uploadFileApi from '~/apis/uploadFileApi'

function Fanpage() {
  const [fanpages, setFanpages] = useState<FanpageType[]>([])
  const [fanpagesDifferent, setFanpagesDifferent] = useState<FanpageType[]>([])
  const [fanpageMembers, setFanpageMembers] = useState<FanpageMember[]>([])
  const [showModal, setShowModal] = useState(false)
  const [newFanpageData, setNewFanpageData] = useState<FanpageNoId>({
    group_name: '',
    description: '',
    followers_count: null,
    likes_count: null,
    category: null,
    address: null,
    image_url: null,
    phone: null,
    is_public: true,
    role_id: 'role-id-1',
    createdAt: new Date(),
    updatedAt: new Date()
  })
  const [editFanpageId, setEditFanpageId] = useState<string>('')
  const [canCreateFanpage, setCanCreateFanpage] = useState(true)
  const [loading, setLoading] = useState(false)
  const [file, setUploadFile] = useState<string>('')

  useEffect(() => {
    fetchFanpages()
  }, [])

  useEffect(() => {
    setCanCreateFanpage(fanpages.length === 0)
  }, [fanpages])

  useEffect(() => {
    if (fanpages.length > 0) {
      checkFollowStatus()
    }
  }, [fanpages])

  const fetchFanpages = async () => {
    try {
      const profile = getProfileFromLocalStorage()
      const response = await FanpageApi.getFanpagesByUserId(profile.user_id)

      if (response && response.data && response.data.data.fanpages) {
        const fetchedFanpages: FanpageType[] = response.data.data.fanpages
        setFanpages(fetchedFanpages)
        fetchFanpagesDifferent(fetchedFanpages)
      }
    } catch (error) {
      console.error('Error fetching fanpages:', error)
    }
  }

  const fetchFanpagesDifferent = async (fanpagesToRemove: FanpageType[]) => {
    try {
      const response = await FanpageApi.fetchAllFanpages()

      if (response && response.data && response.data.data.fanpages) {
        const fetchedFanpages: FanpageType[] = response.data.data.fanpages

        // Loại bỏ các fanpage đã fetch được từ fetchFanpages
        const filteredFanpages = fetchedFanpages.filter((fanpage) => {
          return !fanpagesToRemove.some((f) => f.fanpage_id === fanpage.fanpage_id)
        })

        setFanpagesDifferent(filteredFanpages)
      }
    } catch (error) {
      console.error('Error fetching fanpages:', error)
    }
  }

  const handleDeleteFanpage = async () => {
    try {
      await FanpageApi.deleteFanpage(deleteFanpageId)
      setShowDeleteModal(false)
      fetchFanpages()
    } catch (error) {
      console.error(`Error deleting fanpage ${deleteFanpageId}:`, error)
    }
  }

  const openModal = (fanpageId: string) => {
    const fanpageToUpdate = fanpages.find((fanpage) => fanpage.fanpage_id === fanpageId)
    if (fanpageToUpdate) {
      setEditFanpageId(fanpageId)
      setNewFanpageData({
        group_name: fanpageToUpdate.group_name,
        description: fanpageToUpdate.description,
        followers_count: fanpageToUpdate.followers_count,
        likes_count: fanpageToUpdate.likes_count,
        category: fanpageToUpdate.category,
        address: fanpageToUpdate.address,
        phone: fanpageToUpdate.phone,
        is_public: fanpageToUpdate.is_public,
        role_id: fanpageToUpdate.role_id,
        image_url: fanpageToUpdate.image_url,
        createdAt: new Date(fanpageToUpdate.createdAt),
        updatedAt: new Date(fanpageToUpdate.updatedAt)
      })
      setShowModal(true)
    }
  }

  const checkFollowStatus = async () => {
    try {
      const profile = getProfileFromLocalStorage()
      const response = await fanpageMemberApi.getAllFanpageMembers()
      const members = response.data.data.members
      const invitedMembers = members.filter(
        (member) => member.is_invited === false && member.user_id === profile.user_id
      )
      setFanpageMembers(invitedMembers)
    } catch (error) {
      console.error('Error checking follow status:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFollowFanpage = async (fanpageId: any) => {
    try {
      const response = await fanpageMemberApi.followFanpage(fanpageId)
      checkFollowStatus()
      console.log('Follow fanpage response:', response)
    } catch (error) {
      console.error('Error following fanpage:', error)
    }
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteFanpageId, setDeleteFanpageId] = useState<string>('')

  const openDeleteModal = (fanpageId: string) => {
    setDeleteFanpageId(fanpageId)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setDeleteFanpageId('')
  }

  return (
    <div className='mx-auto flex max-w-[1065px] gap-10 max-lg:flex-col 2xl:max-w-[1220px] 2xl:gap-12' id='js-oversized'>
      <div className='flex-1'>
        <div className='mx-auto w-full max-w-[680px]'>
          <div className='page-heading'>
            <h1 className='page-title'> Trang </h1>
            <nav className='nav__underline'>
              <ul
                className='group'
                uk-switcher='connect: #page-tabs ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium'
              >
                <li>
                  <a href='#'>Trang Gợi ý</a>
                </li>
                <li>
                  <a href='#'> Trang của tôi </a>
                </li>
              </ul>
            </nav>
          </div>

          <div id='page-tabs' className='uk-switcher mt-10'>
            <div
              className='grid grid-cols-2 gap-3 sm:grid-cols-3'
              uk-scrollspy='target: > div; cls: uk-animation-scale-up; delay: 100 ;repeat: true'
            >
              {fanpagesDifferent.map((fanpage) => (
                <div className='card' key={fanpage.fanpage_id}>
                  <Link to={`/fanpage/${fanpage.fanpage_id}`}>
                    <div className='card-media h-40 sm:aspect-[2/1.7]'>
                      <img src={fanpage.image_url || 'default_image_url.jpg'} alt={fanpage.group_name} />
                      <div className='card-overly' />
                    </div>
                  </Link>
                  <div className='card-body'>
                    <Link to={`/fanpage/${fanpage.fanpage_id}`}>
                      <h4 className='card-title'>{fanpage.group_name}</h4>
                    </Link>
                    {/* <p className='card-text'>{fanpage.followers_count} Following</p>
                    <button type='button' className='button bg-primary text-white' onClick={() => handleFollowFanpage(fanpage.fanpage_id)}>
                      Follow
                    </button> */}
                  </div>
                </div>
              ))}

              {/* <div className='col-span-2 my-6 flex justify-center lg:col-span-3'>
                <button type='button' className='dark:bg-dark2 rounded-full bg-white px-5 py-2 text-sm font-semibold shadow-md'>
                  Load more...
                </button>
              </div> */}
            </div>

            <div
              className='grid grid-cols-2 gap-3 sm:grid-cols-3'
              uk-scrollspy='target: > div; cls: uk-animation-scale-up; delay: 100 ;repeat: true'
            >
              {fanpages.map((fanpage) => (
                <div className='card' key={fanpage.fanpage_id}>
                  <Link to={`/fanpage/${fanpage.fanpage_id}?my-fanpages`}>
                    <div className='card-media h-40 sm:aspect-[2/1.7]'>
                      <img src={fanpage.image_url || 'default_image_url.jpg'} alt={fanpage.group_name} />
                      <div className='card-overly' />
                    </div>
                  </Link>
                  <div className='card-body'>
                    <Link to={`/fanpage/${fanpage.fanpage_id}?my-fanpages`}>
                      <h4 className='card-title'>{fanpage.group_name}</h4>
                    </Link>
                    {/* <p className='card-text'>{fanpage.followers_count} Following</p> */}
                    {/* <button type='button' className='button bg-primary text-white' onClick={() => handleFollowFanpage(fanpage.fanpage_id)}>
                      Follow
                    </button> */}
                  </div>
                </div>
              ))}

              {/* <div className='col-span-2 my-6 flex justify-center lg:col-span-3'>
                <button type='button' className='dark:bg-dark2 rounded-full bg-white px-5 py-2 text-sm font-semibold shadow-md'>
                  Load more...
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className='w-full lg:w-[330px] 2xl:w-[380px]'>
        <div
          className='mt-20 space-y-4 max-lg:grid max-lg:gap-6 sm:grid-cols-2 lg:space-y-6 lg:pb-8'
          uk-sticky='media: 1024; end: #js-oversized; offset: 80'
        >
          <div className='box p-5 px-6'>
            <div className='flex items-baseline justify-between text-black dark:text-white'>
              <h3 className='text-base font-bold'> Trang bạn quản lý </h3>
            </div>
            <div className='side-list'>
              {fanpages.map((fanpage) => (
                <div className='side-list-item' key={fanpage.fanpage_id}>
                  <Link to={`/fanpage/${fanpage.fanpage_id}?my-fanpages`}>
                    <img
                      src={fanpage.image_url || 'default_image_url.jpg'}
                      className='side-list-image rounded-full'
                      alt={fanpage.group_name}
                    />
                  </Link>
                  <div className='flex-1'>
                    <Link to={`/fanpage/${fanpage.fanpage_id}?my-fanpages`}>
                      <h4 className='side-list-title'>{fanpage.group_name}</h4>
                    </Link>
                    <div className='side-list-info'>
                      Cập nhật{' '}
                      {Math.floor(
                        (new Date().getTime() - new Date(fanpage.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
                      )}{' '}
                      ngày trước
                    </div>
                  </div>
                  <Link to={`/fanpage-edit/${fanpage.fanpage_id}`}>
                    <button className='button bg-secondery'>Chỉnh sửa</button>
                  </Link>

                  <button className='button bg-secondery' onClick={() => openDeleteModal(fanpage.fanpage_id)}>
                    Xóa
                  </button>
                </div>
              ))}
              <button className='mt-3 w-full rounded-md bg-secondery px-3.5 py-1.5 text-sm font-medium text-black dark:text-white'>
                Xem tất cả
              </button>
            </div>
          </div>

          <div className='border1 dark:bg-dark2 rounded-xl bg-white p-5 px-6 shadow'>
            <div className='flex items-baseline justify-between text-black dark:text-white'>
              <h3 className='text-base font-bold'> Đề xuất Trang </h3>
            </div>
            <div className='side-list'>
              {fanpagesDifferent.map((fanpage) => (
                <div className='side-list-item' key={fanpage.fanpage_id}>
                  <Link to={`/fanpage/${fanpage.fanpage_id}`}>
                    <img
                      src={fanpage.image_url || 'default_image_url.jpg'}
                      className='side-list-image rounded-full'
                      alt={fanpage.group_name}
                    />
                  </Link>
                  <div className='flex-1'>
                    <Link to={`/fanpage/${fanpage.fanpage_id}`}>
                      <h4 className='side-list-title'>{fanpage.group_name}</h4>
                    </Link>
                    <div className='side-list-info'>
                      Cập nhật{' '}
                      {Math.floor(
                        (new Date().getTime() - new Date(fanpage.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
                      )}{' '}
                      Ngày trước
                    </div>
                  </div>
                  <button
                    className='button bg-primary-soft text-primary dark:text-white'
                    onClick={() => handleFollowFanpage(fanpage.fanpage_id)}
                  >
                    Thích
                  </button>
                </div>
              ))}
            </div>
            <button className='mt-3 w-full rounded-md bg-secondery px-3.5 py-1.5 text-sm font-medium text-black dark:text-white'>
              Xem tất cả
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
          <div className='w-1/3 rounded-lg bg-white p-6 shadow-lg'>
            <h2 className='mb-4 text-xl font-semibold'>Xóa Trang</h2>
            <p className='mb-6'>Bạn có chắc chắn muốn xóa trang này không ?</p>
            <div className='flex justify-end'>
              <button
                onClick={handleDeleteFanpage}
                className='mr-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700'
              >
                Xóa
              </button>
              <button onClick={closeDeleteModal} className='rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400'>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Fanpage
