import { useEffect, useState } from 'react'
import { IonIcon } from '@ionic/react'
import { toast } from 'react-toastify'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import useMutationLogin from './hook/useMutationCreate'
import useMutationEdit from './hook/useEditMutation'
import { useQueryClient } from '@tanstack/react-query'
import useFileUpload from '../utils/uploadApi'
import { useDropzone } from 'react-dropzone'
import useQueryStory from './hook/useGetStory'

function CreateStory({ closeStory }: any) {
  const queryClient = useQueryClient()
  const { refetch } = useQueryStory()
  const [dataStory, setDataStory] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [previewImg, setPreviewImg] = useState<string>('')
  const { uploadStory } = useFileUpload()

 
  const [searchParams] = useSearchParams()
  const idSearch: any = searchParams.get('isEdit')
  const idSearch2: any = searchParams.get('id')
  const navigate = useNavigate()
  const mutation = useMutationLogin()
  const mutationEdit = useMutationEdit()
  const [preview, setPreview] = useState<string>('')
  const [isVideo, setIsVideo] = useState<boolean>(false)

  const handelCreate = async (data: any) => {
    if (file) {
      const res = await uploadStory(file)

      data.content = res.url
      mutation.mutate(data, {
        onSuccess: () => {
          refetch()
          toast.success('Tạo tin thành công')
          closeStory()
          queryClient.invalidateQueries()
          resetForm()
        },
        onError: (error) => {
          console.log('Error creating story:', error)
        }
      })
    }
  }

  const handelEdit = (id: any, data: any) => {
    mutationEdit.mutate(
      { id, data },
      {
        onSuccess: () => {
          toast.success('Sửa tin thành công')
          closeStory()
          queryClient.invalidateQueries()
          resetForm()
        },
        onError: (error) => {
          console.log('Error editing story:', error)
        }
      }
    )
  }

  const createStory = () => {
    const test = {
      content: '',
      text: dataStory,
      privacy: '1',
      tag: '1231323',
      music: 'ccc'
    }
    idSearch ? handelEdit(idSearch2, test) : handelCreate(test)
    queryClient.invalidateQueries()
  }

  const reload2 = () => {
    localStorage.removeItem('fileName')

    navigate({
      search: createSearchParams({
        id: ''
      }).toString()
    })
    queryClient.invalidateQueries()
  }

  const resetForm = () => {
    setDataStory('')

    localStorage.removeItem('fileName')
  }

  // useEffect(() => {
  //   setFileName(dataFileok)
  // }, [dataFileok])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log('acceptedFiles', acceptedFiles)
      const file = acceptedFiles[0]
      setFile(file)
      const fileURL = URL.createObjectURL(file)

      // Kiểm tra loại tệp và cập nhật preview
      if (file.type.startsWith('video/')) {
        setIsVideo(true)
        setPreview(fileURL)
      } else if (file.type.startsWith('image/')) {
        setIsVideo(false)
        setPreview(fileURL)
      }
    },
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.mkv']
    }
  })

  return (
    <>
      <div className='absolute '>
        <div className='uk-modal-dialog tt dark:bg-dark2 relative mx-auto w-full overflow-hidden rounded-lg bg-white p-7 shadow-xl  md:w-[600px]'>
          <div className='-m-7 mb-0 border-b py-3 text-center dark:border-slate-700'>
            <h2 className='text-sm font-medium'> {idSearch ? 'Sửa Trạng Thái' : 'Tạo Trạng Thái'} </h2>

            <button
              onClick={() => {
                idSearch ? reload2() : closeStory()
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
              <input
                onChange={(e) => setDataStory(e.target.value)}
                value={dataStory}
                type='text'
                className='mt-3 w-full'
              />
            </div>
           <div
  className='border1 relative h-72 w-full overflow-hidden rounded-lg'
  style={{
    backgroundImage: !isVideo ? `url(${preview})` : 'none'
  }}
>
  <label
    htmlFor='createStatusUrl'
    className='absolute bottom-0 left-1/2 z-10 flex w-full -translate-x-1/2 cursor-pointer flex-col items-center justify-center bg-gradient-to-t from-gray-700/60 pb-6 pt-10'
  >
    <div {...getRootProps()}>
      <input {...getInputProps()} className='hidden' />
      <IonIcon name={isVideo ? 'videocam' : 'image'} className='text-5xl text-teal-600' />
    </div>
  </label>
  {isVideo ? (
    <video
      id='createStatusVideo'
      src={preview}
      controls
      className='absolute h-full w-full object-cover'
    />
  ) : (
    <img
      id='createStatusImage'
      src={preview}
      alt=''
      className='absolute h-full w-full object-cover'
    />
  )}
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
    </>
  )
}

export default CreateStory
