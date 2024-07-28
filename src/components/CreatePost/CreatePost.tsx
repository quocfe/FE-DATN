import { IonIcon } from '@ionic/react'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useMutationAddNewPost from '~/hooks/mutations/post/useMutationAddNewPost'
import usePostStore from '~/store/post.store'

function CreatePost() {
  const { setIsCreatePost } = usePostStore()
  const { user_id } = useParams()
  const [privary, setPrivacy] = useState<string>('public')
  const [content, setContent] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const inputFileRef = useRef<HTMLInputElement | null>(null)

  // Location
  const [isShowLocation, setIsShowLocation] = useState<boolean>(false)
  const [searchLocation, setSearchLocation] = useState<string>('')
  const [initialProvinces, setInitialProvinces] = useState<Province[]>([])
  const [provinces, setProvinces] = useState<Province[]>([])

  // React Query
  const queryClient = useQueryClient()
  const addNewPostMutation = useMutationAddNewPost()

  useEffect(() => {
    axios.get('https://vapi.vnappmob.com/api/province/').then((response) => {
      const results: Province[] = response.data.results
      setProvinces(results)
      setInitialProvinces(results)
    })
  }, [])

  useEffect(() => {
    if (searchLocation) {
      // axios.get('https://vapi.vnappmob.com/api/province/district/49')
      const search = initialProvinces.filter((province) =>
        province.province_name.toLowerCase().includes(searchLocation.toLowerCase())
      )
      setProvinces(search)
    } else {
      setProvinces(initialProvinces)
    }
  }, [searchLocation, initialProvinces])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setSelectedFiles(Array.from(files))
    }
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleAddNewPost = () => {
    const images: File[] = []
    const videos: File[] = []

    selectedFiles.forEach((file) => {
      const fileType = file.type.split('/')[0]
      if (fileType === 'image') {
        images.push(file)
      } else if (fileType === 'video') {
        videos.push(file)
      }
    })

    const formData = new FormData()
    formData.append('privary', privary)
    formData.append('location', location)
    formData.append('post_type', 'user')
    formData.append('content', content)
    images.forEach((image) => {
      formData.append('images', image)
    })
    videos.forEach((video) => {
      formData.append('videos', video)
    })

    addNewPostMutation.mutate(formData, {
      onSuccess: () => {
        setSelectedFiles([])
        setContent('')
        setIsCreatePost(false)

        if (user_id) {
          queryClient.invalidateQueries({ queryKey: ['user_posts', { user_id }] })
        } else {
          queryClient.invalidateQueries({ queryKey: ['my_posts'] })
        }

        toast.success('Đăng bài mới thành công')
      }
    })
  }

  const renderLocation = () => {
    return (
      <ul>
        {provinces.map((province) => {
          return (
            <li key={province.province_id} className=''>
              <a
                onClick={() => {
                  setLocation(province.province_name)
                  if (isShowLocation) {
                    setIsShowLocation(false)
                  }
                }}
                className='flex items-center justify-between text-gray-700'
              >
                {province.province_name} <IonIcon icon='location' className='py-2 text-base text-red-600' />
              </a>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <>
      <div
        className='relative mx-auto flex h-full w-full flex-col overflow-x-hidden overflow-y-scroll rounded-lg bg-white shadow-xl'
        style={{ maxHeight: '575px', scrollbarWidth: 'thin' }}
      >
        <div className='sticky left-0 top-0 mb-0 border-b bg-white py-4 text-center dark:border-slate-700'>
          <h2 className='text-sm font-medium text-black'> Đăng tải bài viết </h2>
          {/* close button */}
          <button
            type='button'
            className='button-icon absolute right-0 top-0 m-2.5'
            onClick={() => setIsCreatePost(false)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        <div className='mt-3 space-y-5 p-2'>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            className='w-full !border-transparent !bg-white !text-xl !font-normal !text-black placeholder:!text-black focus:!border-transparent focus:!ring-transparent   dark:!bg-slate-800 dark:!text-white dark:placeholder:!text-white'
            placeholder='Bạn đang suy nghĩ điều gì?'
            rows={selectedFiles.length > 0 ? 1 : 5}
            value={content}
          />
          <div className='grid grid-cols-2 gap-2'>
            {selectedFiles.length > 0 &&
              selectedFiles.map((file, index) => {
                if (file.type.includes('image')) {
                  return (
                    <div key={index} className='relative overflow-hidden rounded-md' style={{ maxHeight: '205px' }}>
                      <img src={URL.createObjectURL(file)} className='h-full w-full object-cover' alt='' />
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className='absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white'
                      >
                        <IonIcon name='close-outline' className='text-2xl'></IonIcon>
                      </button>
                    </div>
                  )
                } else if (file.type.includes('video')) {
                  return (
                    <div key={index} className='relative col-span-2 h-full w-full overflow-hidden rounded-md'>
                      <video
                        className='h-full w-full rounded-md object-cover'
                        src={URL.createObjectURL(file)}
                        controls
                      />
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className='absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white'
                      >
                        <IonIcon name='close-outline' className='text-2xl'></IonIcon>
                      </button>
                    </div>
                  )
                }
              })}
          </div>
        </div>
        <div className='sticky bottom-0 left-0 z-50 w-full bg-white'>
          <div className='flex flex-wrap items-center gap-2 px-4 py-2 text-sm font-medium'>
            <button
              onClick={() => inputFileRef.current?.click()}
              type='button'
              className='z-50 flex items-center gap-1.5 rounded-full border-2 border-sky-100 bg-sky-50 px-2 py-1 text-sky-600 dark:border-sky-900 dark:bg-sky-950'
            >
              <IonIcon icon='image' className='text-base' />
              Hình ảnh
            </button>
            <input type='file' multiple hidden ref={inputFileRef} onChange={handleFileChange} />
            <button
              onClick={() => inputFileRef.current?.click()}
              type='button'
              className='flex items-center gap-1.5 rounded-full border-2 border-teal-100 bg-teal-50 px-2 py-1 text-teal-600 dark:border-teal-900 dark:bg-teal-950'
            >
              <IonIcon icon='videocam' className='text-base' />
              Video
            </button>
            <button
              type='button'
              className='flex items-center gap-1.5 rounded-full border-2 border-orange-100 bg-orange-50 px-2 py-1 text-orange-600 dark:border-yellow-900 dark:bg-yellow-950'
            >
              <IonIcon icon='pricetags-outline' className='text-base' />
              Gắn thẻ
            </button>
            <button
              type='button'
              className='relative flex items-center gap-1.5 rounded-full border-2 border-rose-100 bg-red-50 px-2 py-1 text-red-600 dark:border-rose-900 dark:bg-rose-950'
            >
              {isShowLocation && (
                <div
                  className='absolute bottom-[150%] left-2/4 z-20 h-[250px] -translate-x-2/4 overflow-x-hidden overflow-y-scroll rounded-md border bg-white p-3 shadow-md'
                  style={{ scrollbarWidth: 'thin' }}
                >
                  <input
                    onChange={(e) => setSearchLocation(e.target.value)}
                    type='text'
                    placeholder='Địa điểm cần tìm ?'
                    className='mb-5'
                  />
                  {renderLocation()}
                </div>
              )}
              <IonIcon icon='location' className='text-base' />
              {location !== '' ? (
                <a onClick={() => setIsShowLocation(!isShowLocation)}>{location}</a>
              ) : (
                <a onClick={() => setIsShowLocation(!isShowLocation)}>Địa điểm</a>
              )}
            </button>
            <button type='button' className='grid h-8 w-8 place-items-center rounded-full bg-secondery text-xl'>
              <IonIcon icon='ellipsis-horizontal' />
            </button>
          </div>
          <div className='flex items-center justify-between p-5'>
            <div>
              <button
                className='aria-expanded: group inline-flex items-center gap-1 rounded-full border-2 border-slate-100 bg-slate-50 px-2.5 py-1 text-sm font-medium aria-expanded:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white'
                type='button'
              >
                {privary === 'public' ? 'Công khai' : privary === 'friends' ? 'Bạn bè' : 'Riêng tư'}
                <IonIcon
                  icon='chevron-down-outline'
                  className='text-base duration-500 group-aria-expanded:rotate-180'
                />
              </button>
              <div
                className='w-60 rounded-lg border border-slate-100 bg-white p-2 font-medium text-black shadow-lg dark:bg-slate-700'
                uk-drop='offset:10;pos: bottom-left; reveal-left;animate-out: true; animation: uk-animation-scale-up uk-transform-origin-bottom-left ; mode:click'
              >
                <form>
                  <label onClick={() => setPrivacy('public')}>
                    <input
                      type='radio'
                      name='radio-status'
                      id='monthly1'
                      className='peer hidden appearance-none'
                      checked={privary === 'public'}
                    />
                    <div className=' dark:bg-dark3 relative flex cursor-pointer items-center justify-between rounded-md p-2 px-3 hover:bg-secondery peer-checked:[&_.active]:block'>
                      <div className='text-sm'>Công khai</div>
                      <IonIcon
                        icon='checkmark-circle'
                        className='active uk-animation-scale-up absolute right-2 hidden -translate-y-1/2 text-2xl text-blue-600'
                      />
                    </div>
                  </label>
                  <label onClick={() => setPrivacy('friends')}>
                    <input
                      type='radio'
                      name='radio-status'
                      id='monthly1'
                      className='peer hidden appearance-none'
                      checked={privary === 'friends'}
                    />
                    <div className=' dark:bg-dark3 relative flex cursor-pointer items-center justify-between rounded-md p-2 px-3 hover:bg-secondery peer-checked:[&_.active]:block'>
                      <div className='text-sm'> Bạn bè </div>
                      <IonIcon
                        icon='checkmark-circle'
                        className='active uk-animation-scale-up absolute right-2 hidden -translate-y-1/2 text-2xl text-blue-600'
                      />
                    </div>
                  </label>
                  <label onClick={() => setPrivacy('private')}>
                    <input
                      type='radio'
                      name='radio-status'
                      id='monthly'
                      className='peer hidden appearance-none'
                      checked={privary === 'private'}
                    />
                    <div className=' dark:bg-dark3 relative flex cursor-pointer items-center justify-between rounded-md p-2 px-3 hover:bg-secondery peer-checked:[&_.active]:block'>
                      <div className='text-sm'> Chỉ mình tôi </div>
                      <IonIcon
                        icon='checkmark-circle'
                        className='active uk-animation-scale-up absolute right-2 hidden -translate-y-1/2 text-2xl text-blue-600'
                      />
                    </div>
                  </label>
                </form>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <button
                onClick={handleAddNewPost}
                type='button'
                className='button bg-blue-500 px-12 py-2 text-[14px] text-white'
              >
                Đăng tải
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePost
