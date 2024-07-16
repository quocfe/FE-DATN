/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable quotes */
import React, { ChangeEvent } from 'react'
import { Control, Controller } from 'react-hook-form'
import { FormCreateVideoType } from '../../utils/yup.validate'
import SvgIcon from '~/helpers/SvgIcon'
// import { Video } from '~/components/design-systems'

interface InputVideoProps {
  // setValue: UseFormSetValue<FormCreateVideoType>
  setOpenUpload: React.Dispatch<React.SetStateAction<boolean>>
  control: Control<FormCreateVideoType>
}

const InputVideo = ({ setOpenUpload, control }: InputVideoProps) => {
  const handleChangeFileInput = (e: ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
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

      return onChange(file)
    }
  }

  return (
    <Controller
      render={({ field: { onChange, value } }) => {
        console.log(value)
        return (
          <div className='relative'>
            {value ? (
              // <div className=''>{/* <video poster='' src={value ?? URL.createObjectURL(value)} /> */}</div>
              <div className='h-full max-h-[500px] w-full rounded-md border border-[#CED0D4] p-2'>
                {/* <Video link={value && URL.createObjectURL(value as File)} className='rounded-md' /> */}
                <button
                  type='button'
                  onClick={() => {
                    onChange('')
                  }}
                  className='absolute right-2 top-2  m-2.5 rounded-full bg-[#E4E6EB] p-1'
                >
                  <SvgIcon name='close' className='h-4 w-4' />
                </button>
              </div>
            ) : (
              <>
                <label
                  htmlFor='video'
                  className='relative block w-full cursor-pointer rounded-md border border-[#CED0D4] p-2'
                >
                  <ContentInputVideo setOpenUpload={setOpenUpload} />
                </label>
                <input
                  onChange={(e) => handleChangeFileInput(e, onChange)}
                  type='file'
                  id='video'
                  accept='video/mp4,video/x-m4v,video/*'
                  className='absolute top-0 hidden'
                />
              </>
            )}
          </div>
        )
      }}
      name='video'
      control={control}
    />
  )
}

const ContentInputVideo = ({ setOpenUpload }: Pick<InputVideoProps, 'setOpenUpload'>) => {
  return (
    <>
      <div className='absolute right-2 top-2'>
        <button
          type='button'
          onClick={() => setOpenUpload(false)}
          className='button-icon uk-modal-close absolute right-0 top-0 m-2.5 rounded-full border border-[#CED0D4] bg-white'
        >
          <SvgIcon name='close' className='h-5 w-5' />
        </button>
      </div>
      <div className='flex min-h-[200px] w-full flex-col items-center justify-center gap-y-2 rounded-md bg-[#F7F8FA] hover:bg-[#EBEDF0]'>
        <div className='flex items-center justify-center rounded-[50%] bg-[#E4E6EB] p-2'>
          <i
            data-visualcompletion='css-img'
            className='x1b0d499 xep6ejk'
            style={{
              backgroundImage:
                "url('https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/hnYJwtcMFVV.png?_nc_eui2=AeEuFazYQGHnq91CtPhtbAnmwhg5DgQVGCfCGDkOBBUYJ3_5yofrO6BCFQ0Q30LKnKKl018HRZ5is5c6GiYaXt0u')",
              backgroundPosition: '0px -254px',
              backgroundSize: 'auto',
              width: '20px',
              height: '20px',
              backgroundRepeat: 'no-repeat',
              display: 'inline-block'
            }}
          ></i>
        </div>
        <div className='text-xl font-bold'>Thêm Video</div>
      </div>
    </>
  )
}

export default InputVideo
