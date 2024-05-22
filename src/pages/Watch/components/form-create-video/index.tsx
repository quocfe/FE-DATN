/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react'
import SvgIcon from '~/helpers/SvgIcon'
import { useOnClickOutside } from '~/hooks/useOnClickOutside'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import InputVideo from './InputVideo'
import { FormCreateVideoType, validationFormCreateVideo } from '../../utils/yup.validate'
import SubjectArticle from '../SubjectArticle'

// Loads the UIkit icons

const FormCreateVideo = () => {
  const [open, setOpen] = useState(false)

  const { handleSubmit, setValue, watch, register } = useForm<FormCreateVideoType>({
    resolver: yupResolver(validationFormCreateVideo),
    defaultValues: validationFormCreateVideo.getDefault()
  })

  const ref = useRef(null)

  const fileVideo = watch('video') as File | ''

  useOnClickOutside(ref, () => setOpen(false))

  const handleSubmitForm: SubmitHandler<FormCreateVideoType> = async (data) => {
    const { video, content, privacy } = data

    const formData = new FormData()
    formData.append('video', video as File)
    formData.append('content', content)
    formData.append('privacy', privacy)

    await axios
      .post('http://localhost:3000/api/v1/videos/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-rapidapi-host': 'file-upload8.p.rapidapi.com'
          // 'x-rapidapi-key': 'your-rapidapi-key-here'
        }
      })
      .then((response) => {
        // handle the response
        console.log(response)
      })
      .catch((error) => {
        // handle errors
        console.log(error)
      })
  }

  return (
    <div className='my-4'>
      <div
        className='border1 dark:bg-dark2 space-y-4 rounded-xl bg-white p-2 text-sm font-medium shadow-sm md:p-4'
        onClick={() => setOpen(true)}
      >
        <div className='flex items-center gap-1 md:gap-3'>
          <div className='dark:bg-dark3 flex-1 cursor-pointer rounded-lg bg-slate-100 transition-all hover:bg-opacity-80'>
            <div className='py-2.5 text-center dark:text-white'> Share your videos </div>
          </div>

          <div className='cursor-pointer rounded-xl bg-sky-100/60 p-1 px-1.5 transition-all hover:bg-sky-100 hover:bg-opacity-80 dark:bg-white/10 dark:hover:bg-white/20'>
            <SvgIcon name='video-camera' className='h-8 w-8 fill-sky-200/70 stroke-sky-600 ' />
          </div>
        </div>
      </div>
      {open && (
        <div className='fixed left-0 top-10 z-50 flex h-full w-full items-center  justify-center bg-[#fcfdfd80]'>
          <div className=' w-full rounded-lg bg-white shadow-xl md:w-[520px]' ref={ref}>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <div className='relative mb-0 border-b py-4 dark:border-slate-700'>
                <div className='text-center text-sm font-medium text-black'>Create Video</div>
                <button
                  onClick={() => setOpen(false)}
                  className='button-icon uk-modal-close absolute right-0 top-0 m-2.5'
                >
                  <SvgIcon name='close' className='h-5 w-5' />
                </button>
              </div>
              <div className='mt-3 space-y-5 p-2'>
                <textarea
                  className='w-full !border-transparent !bg-white !text-xl !font-normal !text-black placeholder:!text-black focus:!border-transparent focus:!ring-transparent   dark:!bg-slate-800 dark:!text-white dark:placeholder:!text-white'
                  rows={6}
                  placeholder='What do you have in mind?'
                  style={{ overscrollBehavior: 'contain' }}
                  {...register('content')}
                ></textarea>
                {fileVideo !== '' && (
                  <video className='max-h-[200px] max-w-[150px]' controls>
                    <source
                      key={fileVideo ? URL.createObjectURL(fileVideo) : ''}
                      src={fileVideo ? URL.createObjectURL(fileVideo) : ''}
                      type={fileVideo ? fileVideo.type : ''}
                    />
                    Trình duyệt của bạn không hỗ trợ video.
                  </video>
                )}
              </div>
              <div className='flex flex-wrap items-center gap-2 px-4 py-2 text-sm font-medium'>
                {/* <button
                  type='button'
                  className='flex items-center gap-1.5 rounded-full border-2 border-teal-100 bg-teal-50 px-2 py-1 text-teal-600 dark:border-teal-900 dark:bg-teal-950'
                >
                  <SvgIcon name='video-camera' className='h-4 w-4 text-teal-600' />
                  Video
                </button> */}
                <InputVideo setValue={setValue} />
                <button
                  type='button'
                  className='flex items-center gap-1.5 rounded-full border-2 border-orange-100 bg-orange-50 px-2 py-1 text-orange-600 dark:border-yellow-900 dark:bg-yellow-950'
                >
                  {/* <ion-icon name='happy' class='md hydrated text-base' role='img' aria-label='happy'></ion-icon> */}
                  <SvgIcon name='happy' className='h-4 w-4 ' />
                  Feeling
                </button>
                <button
                  type='button'
                  className='flex items-center gap-1.5 rounded-full border-2 border-rose-100 bg-red-50 px-2 py-1 text-red-600 dark:border-rose-900 dark:bg-rose-950'
                >
                  {/* <ion-icon name='location' class='md hydrated text-base' role='img' aria-label='location'></ion-icon> */}
                  <SvgIcon name='location' className='h-4 w-4 text-red-600' />
                  Check in
                </button>
              </div>
              <div className='flex justify-between gap-2 p-4'>
                <SubjectArticle setValue={setValue} watch={watch} />
                <div>
                  <button type='submit' className='button bg-blue-500 px-12 py-2 text-[14px] text-white'>
                    Tạo mới
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormCreateVideo
