import React, { useState, useEffect } from 'react'
import { FanpageNoId, FanpageResponse, Fanpage as FanpageType } from '~/@types/fanpage'
import FanpageApi from '~/apis/fanpage.api'
import { Link } from 'react-router-dom'
import uploadFileApi from '~/apis/uploadFileApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function FanpageCreate() {
  const [loading, setLoading] = useState(false)
  const [file, setUploadFile] = useState<string>('')
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

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

  const handleCreateFanpage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent the default form submission behavior
    try {
      newFanpageData.image_url = file
      const response = await FanpageApi.createFanpage(newFanpageData)

      if (response) {
        setNewFanpageData({
          group_name: '',
          description: '',
          followers_count: null,
          likes_count: null,
          category: null,
          address: null,
          phone: null,
          image_url: null,
          is_public: true,
          role_id: 'role-id-1',
          createdAt: new Date(),
          updatedAt: new Date()
        }) // Reset dữ liệu nhập cho lần sau

        toast.success('Tạo trang thành công!')
        navigate('/fanpage')
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi tạo fanpage.')
      console.error('Error creating fanpage:', error)
    }
  }

  const handleChangeImage = async (e: any) => {
    setLoading(true)
    try {
      const response = await uploadFileApi.uploadFile(e)
      if (typeof response === 'string') {
        setUploadFile(response)
      } else {
        console.error('Invalid response:', response)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setNewFanpageData({ ...newFanpageData, [name]: value })
  }

  return (
    <div className='flex h-screen flex-row'>
      {/* column 1 */}
      <div className='me-4 flex h-full items-start justify-start'>
        <div className='h-screen rounded-lg bg-white p-8 shadow-lg'>
          <h2 className='mb-4 text-2xl font-semibold'>{'Tạo Trang Mới'}</h2>
          <form onSubmit={handleCreateFanpage}>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Tên Trang:</label>
              <input
                type='text'
                name='group_name'
                value={newFanpageData.group_name}
                onChange={handleChange}
                className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Miêu tả:</label>
              <textarea
                name='description'
                value={newFanpageData.description}
                onChange={handleChange}
                className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Ảnh:</label>
              <input type='file' onChange={handleChangeImage} id='avatar' name='file' accept='image/png, image/jpeg' />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Loại:</label>
              <select
                name='category'
                value={newFanpageData.category || ''}
                onChange={handleChange}
                className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2'
                required
              >
                <option value=''>Chọn danh mục</option>
                <option value='Social Network'>Mạng xã hội</option>
                <option value='News Feed'>Bảng tin</option>
                <option value='Community'>Cộng đồng</option>
                <option value='Photo Sharing'>Chia sẻ ảnh</option>
                <option value='Video Sharing'>Chia sẻ video</option>
                <option value='Microblogging'>Âm nhạc </option>
                <option value='Business Networking'>Tin kinh doanh</option>
                <option value='Review Platforms'>Fan Idol</option>
              </select>
            </div>
            <div className='flex justify-end'>
              <button
                type='submit'
                onClick={() => handleCreateFanpage}
                className='mr-2 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
              >
                Tạo Trang
              </button>

              <Link to='/fanpage'>
                <button type='button' className='rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600'>
                  Hủy
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      {/* column 2 */}
      <div className='dark:bg-dark2 flex flex-1 bg-white shadow lg:-mt-10 lg:rounded-b-2xl'>
        <div className='w-full'>
          {/* Cover image */}
          <div className='relative h-40 w-full overflow-hidden lg:h-60'>
            <img
              src={file || 'https://i.pinimg.com/originals/b4/4a/ae/b44aae119e1a1334eb416905f2082ad1.jpg'}
              alt='Cover'
              className='inset-0 h-full w-full object-cover'
            />
            {/* Overlay */}
            <div className='absolute bottom-0 left-0 z-10 w-full bg-gradient-to-t from-black/60 pt-10' />
          </div>
          {/* Profile information */}
          <div className='p-3 md:p-5 lg:px-10'>
            <div className='-mt-20 flex flex-col justify-center'>
              <div className='relative z-10 mb-4 h-20 w-20'>
                <div className='relative shrink-0 overflow-hidden rounded-full border-gray-100 shadow md:border-[2px] dark:border-slate-900'>
                  <img
                    // src='https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png'
                    src={file || 'https://i.pinimg.com/originals/b4/4a/ae/b44aae119e1a1334eb416905f2082ad1.jpg'}
                    alt='Avatar'
                    className='inset-0 h-[78px] w-full object-cover'
                  />
                </div>
              </div>
              <div className='flex justify-between max-md:flex-col max-md:gap-3 lg:items-center'>
                <div className='flex-1'>
                  <h3 className='text-lg font-bold text-black md:text-2xl dark:text-white'>
                    {newFanpageData.group_name}
                  </h3>
                  <p>{newFanpageData.description}</p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FanpageCreate
