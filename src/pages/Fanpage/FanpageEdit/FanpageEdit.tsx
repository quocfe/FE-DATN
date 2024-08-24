import { IonIcon } from '@ionic/react'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import FanpageApi from '~/apis/fanpage.api'
import Spinner from '~/pages/Message/components/Skelaton/Spinner'
import useFileUpload from '~/pages/Message/utils/uploadApi'

function FanpageEdit() {
  const { fanpageId } = useParams<{ fanpageId: any }>()
  const [loading, setLoading] = useState(false)
  const [file, setUploadFile] = useState<string>('')
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const [fanpage, setFanpage] = React.useState<any | null>(null)
  const { upload } = useFileUpload()

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

  const handleEditFanpage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (file) {
        fanpage.image_url = file
        console.log(' fanpage.image_url ', fanpage.image_url)
      }
      const response = await FanpageApi.updateFanpage(fanpageId, fanpage)
      if (response) {
        toast.success('Lưu chỉnh sửa thành công!')
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
      const response = await upload(e.target.files[0])
      if (typeof response.url === 'string') {
        setUploadFile(response.url)
      } else {
        console.error('Invalid response:', response.url)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchFanpage()
  }, [fanpageId])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFanpage({ ...fanpage, [name]: value })
  }

  return (
    <div className='flex h-screen flex-row'>
      {/* column 1 */}
      <div className='me-4 flex h-full items-start justify-start'>
        <div className='h-screen rounded-lg bg-white p-8 shadow-lg'>
          <h2 className='mb-4 text-2xl font-semibold'>{'Tạo Fanpage Mới'}</h2>
          <form onSubmit={handleEditFanpage}>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Tên nhóm:</label>
              <input
                type='text'
                name='group_name'
                value={fanpage?.group_name}
                onChange={handleChange}
                className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Miêu tả:</label>
              <textarea
                name='description'
                value={fanpage?.description}
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
                value={fanpage?.category || ''}
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
                <option value='Business Networking'>Mạng lưới kinh doanh</option>
                <option value='Review Platforms'>Fan Idol</option>
              </select>
            </div>
            <div className='flex justify-end'>
              <button
                type='submit'
                onClick={() => handleEditFanpage}
                className='mr-2 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
              >
                Lưu
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
              src={'https://i.pinimg.com/originals/b4/4a/ae/b44aae119e1a1334eb416905f2082ad1.jpg'}
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
                <div className='group relative shrink-0 overflow-hidden rounded-full border-gray-100 shadow md:border-[2px] dark:border-slate-900'>
                  <img
                    src={file || fanpage?.image_url}
                    // src='https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png'
                    alt='Avatar'
                    className='inset-0 h-[78px] w-[78px] object-cover'
                  />
                </div>
              </div>
              <div className='flex justify-between max-md:flex-col max-md:gap-3 lg:items-center'>
                <div className='flex-1'>
                  <h3 className='text-lg font-bold text-black md:text-2xl dark:text-white'>{fanpage?.group_name}</h3>
                  <p>{fanpage?.description}</p>
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

export default FanpageEdit
