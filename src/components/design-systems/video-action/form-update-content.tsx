/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import SvgIcon from '~/helpers/SvgIcon'
import SubjectArticle from '~/pages/Watch/components/SubjectArticle'
import { FormUpdateVideo, FormUpdateVideoType } from './utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import PRIVACY from '~/pages/Watch/utils'
import useAuthStore from '~/store/auth.store'
import SlateEditor from '../slate-editor'
import { cn } from '~/helpers'
import { useMutation } from '@tanstack/react-query'
import videoApi from '~/apis/video.api'
import { extractAtAndHashTags, getTextContent } from '~/utils/helpers'
import { toast } from 'react-toastify'

interface FormUpdateContentProps {
  setIsOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>
  dataVideo: DataVideoResponse
  setVideoData?: React.Dispatch<React.SetStateAction<DataVideoResponse[]>>
}

const FormUpdateContent = ({ setIsOpenUpdate, dataVideo, setVideoData }: FormUpdateContentProps) => {
  const { profile } = useAuthStore()

  const { handleSubmit, watch, setValue, reset } = useForm<FormUpdateVideoType>({
    resolver: yupResolver(FormUpdateVideo),
    defaultValues: FormUpdateVideo.getDefault()
  })

  const { mutate } = useMutation({
    mutationFn: (data: FormUpdateVideoType) => {
      const { hashTags } = extractAtAndHashTags(data.content as never)

      return videoApi.updateVideo('__UPDATE__', dataVideo.id, {
        ...data,
        content: JSON.stringify(data.content),
        hashTags: JSON.stringify(hashTags),
        contentText: getTextContent(data.content as never)
      })
    },
    onSuccess: (response: any) => {
      toast.success(response.message)
      setVideoData &&
        setVideoData((prev) =>
          prev.map((video) => (video.id === dataVideo.id ? { ...video, ...response.data } : video))
        )
      return reset()
    },
    onError: (error: any) => {
      return toast.success(error.response.data.message)
    }
  })

  const privacy = PRIVACY.find((item) => item.key === watch('privacy'))

  useEffect(() => {
    setValue('content', JSON.parse(dataVideo.content))
    setValue('privacy', dataVideo.privacy)
  }, [dataVideo])

  const onSubmitForm = (data: FormUpdateVideoType) => mutate(data)

  return (
    <div
      className='fixed left-0 top-0 z-[99999] flex h-full w-full items-center  justify-center bg-[#f4f4f4cc]'
      style={{
        boxShadow:
          '0 12px 28px 0 rgba(0, 0, 0, 0.2),0 2px 4px 0 rgba(0, 0, 0, 0.1),inset 0 0 0 1px rgba(255, 255, 255, 0.5)'
      }}
    >
      <div className=' w-full rounded-lg bg-white shadow-xl md:w-[520px]'>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className='relative mb-0 border-b py-4 dark:border-slate-700'>
            <div className='text-center text-lg font-semibold text-black'>Tạo mới video</div>
            <button
              type='button'
              onClick={() => setIsOpenUpdate(false)}
              className='button-icon uk-modal-close absolute right-2 top-1/2 -translate-y-1/2 bg-[#E4E6EB]'
            >
              <SvgIcon name='close' className='h-5 w-5' />
            </button>
          </div>
          {/* h-[400px] max-h-[450px] */}
          <div className='mt-3 space-y-5  p-2'>
            <div className='flex items-center gap-x-2 px-2'>
              <div className='relative shrink-0 cursor-pointer rounded-full'>
                <img className='size-9 shrink-0 rounded-full shadow ' src={profile?.Profile.profile_picture} alt='' />
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
              valueSaleRender={JSON.parse(dataVideo.content)}
            />
            {/* {openUpload && <InputVideo setOpenUpload={setOpenUpload} control={control as never} />} */}
          </div>
          <div className='flex flex-wrap items-center gap-2 px-4 py-2 text-sm font-medium'>
            {/* <button
              type='button'
              className='flex items-center gap-1.5 rounded-full border-2 border-teal-100 bg-teal-50 px-2 py-1 text-teal-600 dark:border-teal-900 dark:bg-teal-950'
              onClick={() => setOpenUpload(true)}
            >
              <SvgIcon name='video-camera' className='h-4 w-4 text-teal-600' />
              Video
            </button> */}

            <button
              type='button'
              className='flex items-center gap-1.5 rounded-full border-2 border-orange-100 bg-orange-50 px-2 py-1 text-orange-600 dark:border-yellow-900 dark:bg-yellow-950'
            ></button>
            <button
              type='button'
              className='flex items-center gap-1.5 rounded-full border-2 border-rose-100 bg-red-50 px-2 py-1 text-red-600 dark:border-rose-900 dark:bg-rose-950'
            >
              <SvgIcon name='location' className='h-4 w-4 text-red-600' />
              Check in
            </button>
            <SubjectArticle setValue={setValue} watch={watch} />
          </div>
          <div className='flex justify-between gap-2 p-4'>
            <button type='submit' className={cn('button w-full bg-blue-500 px-12 py-2 text-[14px] text-white')}>
              Tạo mới
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormUpdateContent
