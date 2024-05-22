import React, { ChangeEvent } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import SvgIcon from '~/helpers/SvgIcon'
import { FormCreateVideoType } from '../../utils/yup.validate'

interface InputVideoProps {
  setValue: UseFormSetValue<FormCreateVideoType>
}

const InputVideo = ({ setValue }: InputVideoProps) => {
  const handleChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      // onChange(file)

      console.log(file)
      console.log(URL.createObjectURL(file))

      //   if (!ACCEPTED_IMAGE_TYPES.includes(file?.type as string)) {
      //     onChange('')
      //     setError &&
      //       setError(name, {
      //         type: 'check-type-file',
      //         message: t('company.schemaCompany.file.type')
      //       })

      //     return
      //   }

      return setValue('video', file)
    }
  }

  return (
    <div className='relative'>
      <label
        htmlFor='video'
        className='flex items-center gap-1.5 rounded-full border-2 border-teal-100 bg-teal-50 px-2 py-1 text-teal-600 dark:border-teal-900 dark:bg-teal-950'
      >
        {/* <ion-icon name='videocam' class='md hydrated text-base' role='img' aria-label='videocam'></ion-icon> */}
        <SvgIcon name='video-camera' className='h-4 w-4 text-teal-600' />
        Video
      </label>
      <input
        onChange={handleChangeFileInput}
        type='file'
        id='video'
        accept='video/mp4,video/x-m4v,video/*'
        className='absolute top-0 hidden'
      />
    </div>
  )
}

export default InputVideo
