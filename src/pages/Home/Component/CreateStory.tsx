import { useEffect, useState } from 'react'
import { IonIcon } from '@ionic/react'
import StoryApi from '~/apis/story.api'
import axios from 'axios'
import useMutationLogin from './hook/useMutationCreate'
import { toast } from 'react-toastify'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import useMutationEdit from './hook/useEditMutation'

function CreateStory({ handelCheckToggle }: any) {
  const [dataStory, setDataStory] = useState('')
  const [fileName, setFileName] = useState('')
  const [file, setFile] = useState<any>(null)
  const dataFileok : any= localStorage.getItem('fileName')
  const auth = localStorage.getItem('access_token')
  const closeCreate = () => {
    localStorage.removeItem('fileName')
    handelCheckToggle(false)
  }
  const [searchParams] = useSearchParams()
  const idSearch: any = searchParams.get('isEdit')
  const idSearch2: any = searchParams.get('id')
  const navigate = useNavigate()
  const mutation = useMutationLogin()
  const mutaionEdit = useMutationEdit()
  const handelCreate = (data: any) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success('Story created successfully')
        closeCreate()
      },
      onError: (error) => {
        console.log('Error creating story:', error)
      }
    })
  }
  const handelEdit = (id: any, data: any) => {
    mutaionEdit.mutate(
      { id, data },
      {
        onSuccess: () => {
          toast.success('Story edit successfully')
          window.location.reload()
        },
        onError: (error) => {
          console.log('Error creating story:', error)
        }
      }
    )
  }
  const createStory = () => {
    const test = {
      content: dataFileok,
      text: dataStory,
      privacy: '1',
      tag: '1231323',
      music: 'ccc'
    }
    idSearch ? handelEdit(idSearch2, test) : handelCreate(test)
  }
  const reload2 = () => {
    localStorage.removeItem('fileName')

    navigate({
      search: createSearchParams({
        id: ''
      }).toString()
    })
    window.location.reload()
  }
  useEffect(() => {
    setFileName(dataFileok)
  }, [dataFileok])
  console.log(fileName, 'ok')
  return (
    <div className='absolute '>
      <div className='uk-modal-dialog tt dark:bg-dark2 relative mx-auto w-full overflow-hidden rounded-lg bg-white p-7 shadow-xl md:w-[520px]'>
        <div className='-m-7 mb-0 border-b py-3 text-center dark:border-slate-700'>
          <h2 className='text-sm font-medium'> {idSearch ? 'Sửa Trạng Thái' : 'Tạo Trạng Thái'} </h2>
          {/* nút đóng */}
          <button
            onClick={() => {
              idSearch ? reload2() : closeCreate()
            }}
            type='button'
            className='button__ico uk-modal-close absolute right-0 top-0 m-2.5'
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
        <form className='mt-7 space-y-5'>
          <div>
            <label htmlFor='' className='text-base'>
              Bạn đang nghĩ gì?{' '}
            </label>
            <input onChange={(e) => setDataStory(e.target.value)} type='text' className='mt-3 w-full' />
          </div>
          <div>
            <div
              style={{
                backgroundImage: `url(${'http://localhost:3000/' + fileName})`
              }}
              className='border1 relative h-72 w-full overflow-hidden rounded-lg  bg-repeat'
            >
              <label
                htmlFor='createStatusUrl'
                className='absolute bottom-0 left-1/2 z-10 flex w-full -translate-x-1/2 cursor-pointer flex-col items-center justify-center bg-gradient-to-t from-gray-700/60 pb-6 pt-10'
              >
                <input
                  onChange={(event: any) => {
                    localStorage.removeItem('fileName')
                    const formData = new FormData()
                    console.log(event.target.files[0])
                    formData.append('avatar', event.target.files[0])
                    try {
                      axios
                        .post(`http://localhost:3000/upload-avatar`, formData, {
                          headers: {
                            'Content-Type': 'multipart/form-data'
                          }
                        })
                        .then((respo) => {
                          const { data } = respo
                          if (data) {
                            console.log(data, 'ccc')
                            localStorage.setItem('fileName', data.avatarFileName)
                            setFileName(data.avatarFileName)
                            toast.success('upload image successfully')
                          }
                        })
                    } catch (error) {
                      console.error(error)
                    }
                  }}
                  id='createStatusUrl'
                  type='file'
                  className='hidden'
                  accept='image/png, image/jpeg'
                />
                <IonIcon name='image' className='text-3xl text-teal-600' />
                <span className='mt-2 text-white'>Chọn để tải ảnh lên </span>
              </label>
              <img
                id='createStatusImage'
                src='#'
                alt='Ảnh đã tải lên'
                style={{ display: 'none' }}
                className='absolute h-full w-full object-cover'
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-2'>
              <IonIcon
                name='time-outline'
                className='rounded-full bg-blue-50 text-3xl text-sky-600 dark:bg-transparent'
              />
              <p className='text-sm font-medium text-gray-500'>
                Trạng thái của bạn sẽ có sẵn <br /> trong <span className='text-gray-800'> 24 giờ</span>{' '}
              </p>
            </div>
            <button onClick={createStory} type='button' className='button relative z-50 bg-blue-500 px-8 text-white'>
              {idSearch ? 'Sửa ' : 'Tạo '}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateStory
