/* eslint-disable @typescript-eslint/no-explicit-any */

import { yupResolver } from '@hookform/resolvers/yup'
import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import videoApi from '~/apis/video.api'
import SlateEditor from '~/components/design-systems/slate-editor'
import { cn } from '~/helpers'
import SvgIcon from '~/helpers/SvgIcon'
import useAuthStore from '~/store/auth.store'
import { extractAtAndHashTags, getTextContent } from '~/utils/helpers'
import PRIVACY from '../../utils'
import { FormCreateVideoType, validationFormCreateVideo } from '../../utils/yup.validate'
import SubjectArticle from '../SubjectArticle'
import InputVideo from './InputVideo'

interface FormCreateVideoProps {
  getVideos: (options?: RefetchOptions) => Promise<QueryObserverResult<DataVideoResponse[], Error>>
}

const FormCreateVideo = ({ getVideos }: FormCreateVideoProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openUpload, setOpenUpload] = useState<boolean>(false)

  const { profile } = useAuthStore()

  const { handleSubmit, setValue, watch, control, reset } = useForm<FormCreateVideoType>({
    resolver: yupResolver(validationFormCreateVideo),
    defaultValues: validationFormCreateVideo.getDefault()
  })

  const { mutate } = useMutation({
    mutationFn: async (data: FormCreateVideoType) => {
      const { video, content, privacy } = data
      const { hashTags } = extractAtAndHashTags(content as never)

      const formData = new FormData()
      formData.append('video', video as File)
      formData.append('content', JSON.stringify(content) as never)
      formData.append('hashTags', JSON.stringify(hashTags))
      formData.append('privacy', privacy)
      formData.append('contentText', getTextContent(content as never))

      const res = await videoApi.create(formData)
      return res.data
    },
    onSuccess: (response) => {
      toast.success('Đăng video thành công!')
      reset()
    },
    onError: (error: any) => {
      return toast.error(error.response.data.message)
    }
  })

  const handleSubmitForm: SubmitHandler<FormCreateVideoType> = async (data) => {
    setOpenModal(false)
    return mutate(data)
  }

  const privacy = PRIVACY.find((item) => item.key === watch('privacy'))

  return (
    <>
      <div className='mx-auto my-4 md:max-w-[80%] lg:max-w-[70%]'>
        <div
          className='border1 dark:bg-dark2 space-y-4 rounded-xl bg-white p-2 text-sm font-medium shadow-sm md:p-4'
          onClick={() => setOpenModal(true)}
        >
          <div className='flex items-center gap-1 md:gap-3'>
            <div className='relative shrink-0 cursor-pointer rounded-full'>
              <img className='size-9 shrink-0 rounded-full shadow ' src={profile?.Profile.profile_picture} alt='' />
            </div>
            <div className='dark:bg-dark3 flex-1 cursor-pointer rounded-full bg-slate-100 transition-all hover:bg-opacity-80'>
              <div className='px-5 py-2.5 dark:text-white'>{`${profile?.last_name} ơi, Bạn đang nghĩ gì thế?`}</div>
            </div>

            <button className='cursor-pointer rounded-xl bg-sky-100/60 p-1 px-1.5 transition-all hover:bg-sky-100 hover:bg-opacity-80 dark:bg-white/10 dark:hover:bg-white/20'>
              <SvgIcon name='video-camera' className='h-8 w-8 fill-sky-200/70 stroke-sky-600 ' />
            </button>
          </div>
        </div>
        {openModal && (
          <div
            className='fixed left-0 top-0 z-[99999] flex h-full w-full items-center  justify-center bg-[#f4f4f4cc]'
            style={{
              boxShadow:
                '0 12px 28px 0 rgba(0, 0, 0, 0.2),0 2px 4px 0 rgba(0, 0, 0, 0.1),inset 0 0 0 1px rgba(255, 255, 255, 0.5)'
            }}
          >
            <div className=' w-full rounded-lg bg-white shadow-xl md:w-[520px]'>
              <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className='relative mb-0 border-b py-4 dark:border-slate-700'>
                  <div className='text-center text-lg font-semibold text-black'>Tạo mới video</div>
                  <button
                    type='button'
                    onClick={() => setOpenModal(false)}
                    className='button-icon uk-modal-close absolute right-2 top-1/2 -translate-y-1/2 bg-[#E4E6EB]'
                  >
                    <SvgIcon name='close' className='h-5 w-5' />
                  </button>
                </div>
                {/* h-[400px] max-h-[450px] */}
                <div className='mt-3 space-y-5 p-2'>
                  <div className='flex items-center gap-x-2 px-2'>
                    <div className='relative shrink-0 cursor-pointer rounded-full'>
                      <img
                        className='size-9 shrink-0 rounded-full shadow '
                        src={profile?.Profile.profile_picture}
                        alt=''
                      />
                    </div>
                    <div className=''>
                      <div className='text-sm font-medium text-black'>{profile?.first_name}</div>
                      <div className='flex items-center gap-x-2 rounded-md bg-slate-200 px-2 py-0.5 text-[12px] font-medium text-black'>
                        <img className='size-3' src={privacy?.icon} alt='' />
                        <span>{privacy?.title}</span>
                      </div>
                    </div>
                  </div>
                  <SlateEditor
                    className='!my-5 max-h-[100px] !min-h-[60px] overflow-y-auto overflow-x-hidden px-2 text-sm'
                    placeholder={`${profile?.last_name} ơi, Bạn đang nghĩ gì thế?`}
                    setValue={setValue}
                    watch={watch}
                    name='content'
                  />
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
                  <SubjectArticle setValue={setValue} watch={watch} />
                </div>
                <div className='flex justify-between gap-2 p-4'>
                  <button
                    type='submit'
                    disabled={watch('video') === ''}
                    className={cn('button w-full bg-blue-500 px-12 py-2 text-[14px] text-white', {
                      'bg-[#CFD1D5]': watch('video') === ''
                    })}
                  >
                    Tạo mới
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default FormCreateVideo
