/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import SvgIcon from '~/helpers/SvgIcon'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputVideo from './InputVideo'
import { FormCreateVideoType, validationFormCreateVideo } from '../../utils/yup.validate'
import SubjectArticle from '../SubjectArticle'
import useAuthStore from '~/store/auth.store'
import { cn } from '~/helpers'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import videoApi from '~/apis/video.api'

// Loads the UIkit icons

const FormCreateVideo = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openUpload, setOpenUpload] = useState<boolean>(false)

  const { profile } = useAuthStore()

  const { handleSubmit, setValue, watch, register, control, reset } = useForm<FormCreateVideoType>({
    resolver: yupResolver(validationFormCreateVideo),
    defaultValues: validationFormCreateVideo.getDefault()
  })

  const { mutate } = useMutation({
    mutationFn: async (data: FormCreateVideoType) => {
      const { video, content, privacy } = data

      const formData = new FormData()
      formData.append('video', video as File)
      formData.append('content', content)
      formData.append('privacy', privacy)

      const res = await videoApi.create(data)
      return res.data
    },
    onSuccess: (response) => {
      toast.success(response.data.message)
      return reset()
    },
    onError: (error: any) => {
      return toast.success(error.response.data.message)
    }
  })

  const handleSubmitForm: SubmitHandler<FormCreateVideoType> = async (data) => {
    setOpenModal(false)

    return mutate(data)
  }

  return (
    <div className='mx-auto my-4 md:max-w-[80%] lg:max-w-[70%]'>
      <div
        className='border1 dark:bg-dark2 space-y-4 rounded-xl bg-white p-2 text-sm font-medium shadow-sm md:p-4'
        onClick={() => setOpenModal(true)}
      >
        <div className='flex items-center gap-1 md:gap-3'>
          <div className='dark:bg-dark3 flex-1 cursor-pointer rounded-lg bg-slate-100 transition-all hover:bg-opacity-80'>
            <div className='py-2.5 text-center dark:text-white'>
              {`${profile?.last_name} ơi, Bạn đang nghĩ gì thế?`}{' '}
            </div>
          </div>

          <button className='cursor-pointer rounded-xl bg-sky-100/60 p-1 px-1.5 transition-all hover:bg-sky-100 hover:bg-opacity-80 dark:bg-white/10 dark:hover:bg-white/20'>
            <SvgIcon name='video-camera' className='h-8 w-8 fill-sky-200/70 stroke-sky-600 ' />
          </button>
        </div>
      </div>
      {openModal && (
        <div
          className='fixed left-0 top-0 z-[9999] flex h-full w-full items-center  justify-center bg-[#f4f4f4cc]'
          style={{
            boxShadow:
              '0 12px 28px 0 rgba(0, 0, 0, 0.2),0 2px 4px 0 rgba(0, 0, 0, 0.1),inset 0 0 0 1px rgba(255, 255, 255, 0.5)'
          }}
        >
          <div className=' w-full rounded-lg bg-white shadow-xl md:w-[520px]'>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <div className='relative mb-0 border-b py-4 dark:border-slate-700'>
                <div className='text-center text-sm font-medium text-black'>Create Video</div>
                <button
                  onClick={() => setOpenModal(false)}
                  className='button-icon uk-modal-close absolute right-0 top-0 m-2.5 bg-[#E4E6EB]'
                >
                  <SvgIcon name='close' className='h-5 w-5' />
                </button>
              </div>
              <div className='mt-3 max-h-[450px] space-y-5 overflow-y-auto p-2'>
                <textarea
                  className='w-full !border-transparent !bg-white p-0 !text-sm !font-normal !text-black placeholder:!text-[#65676B] focus:!border-transparent focus:!ring-transparent dark:!bg-slate-800 dark:!text-white dark:placeholder:!text-white'
                  rows={3}
                  placeholder={`${profile?.last_name} ơi, Bạn đang nghĩ gì thế?`}
                  style={{ overscrollBehavior: 'contain' }}
                  {...register('content')}
                ></textarea>

                {openUpload && <InputVideo setOpenUpload={setOpenUpload} control={control as never} />}
              </div>
              <div className='flex flex-wrap items-center gap-2 px-4 py-2 text-sm font-medium'>
                <button
                  type='button'
                  className='flex items-center gap-1.5 rounded-full border-2 border-teal-100 bg-teal-50 px-2 py-1 text-teal-600 dark:border-teal-900 dark:bg-teal-950'
                  onClick={() => setOpenUpload(true)}
                >
                  <SvgIcon name='video-camera' className='h-4 w-4 text-teal-600' />
                  Video
                </button>
                {/* <InputVideo setValue={setValue} /> */}
                <button
                  type='button'
                  className='flex items-center gap-1.5 rounded-full border-2 border-orange-100 bg-orange-50 px-2 py-1 text-orange-600 dark:border-yellow-900 dark:bg-yellow-950'
                >
                  <SvgIcon name='happy' className='h-4 w-4 ' />
                  Feeling
                </button>
                <button
                  type='button'
                  className='flex items-center gap-1.5 rounded-full border-2 border-rose-100 bg-red-50 px-2 py-1 text-red-600 dark:border-rose-900 dark:bg-rose-950'
                >
                  <SvgIcon name='location' className='h-4 w-4 text-red-600' />
                  Check in
                </button>
              </div>
              <div className='flex justify-between gap-2 p-4'>
                <SubjectArticle setValue={setValue} watch={watch} />
                <div>
                  <button
                    type='submit'
                    disabled={watch('video') === ''}
                    className={cn('button bg-blue-500 px-12 py-2 text-[14px] text-white', {
                      'bg-[#CFD1D5]': watch('video') === ''
                    })}
                  >
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
