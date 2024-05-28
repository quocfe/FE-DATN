import React, { useRef, useState } from 'react'
import SvgIcon from '~/helpers/SvgIcon'
import PRIVACY from '../utils'
import { useOnClickOutside } from '~/hooks/useOnClickOutside'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { cn } from '~/helpers'
import { FormCreateVideoType } from '../utils/yup.validate'

interface SubjectArticlePropsTypes {
  setValue: UseFormSetValue<FormCreateVideoType>
  watch: UseFormWatch<FormCreateVideoType>
}

const SubjectArticle = ({ setValue, watch }: SubjectArticlePropsTypes) => {
  const [open, setOpen] = useState<boolean>(false)

  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  const privacy = watch('privacy')
  return (
    <div className='group relative'>
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='flex items-center gap-1 rounded-full border-2 border-slate-100 bg-slate-50 px-2.5 py-1 text-sm font-medium aria-expanded:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white'
      >
        {PRIVACY.find((item) => item.key === privacy)?.title}
        <div className='h-6 w-6'>
          <SvgIcon name='drop-down' className='text-black' />
        </div>
      </button>
      {open && (
        <div
          ref={ref}
          className='absolute top-0 z-50 w-[240px] -translate-y-[105%] rounded-lg border border-slate-100 bg-white shadow-lg '
        >
          <div className='flex w-full flex-col p-2'>
            {PRIVACY.map((item, index) => {
              return (
                <button
                  type='button'
                  className={cn(
                    'dark:bg-dark3 relative  flex  w-full cursor-pointer items-center justify-between rounded-md p-2 px-3 hover:bg-secondery',
                    {
                      'font-medium text-black': item.key === privacy
                    }
                  )}
                  onClick={() => setValue('privacy', item.key)}
                  key={index}
                >
                  <p>{item.title}</p>
                  <SvgIcon
                    name='checkmark-circle'
                    className={cn('h-4 w-4 text-blue-600', {
                      hidden: item.key !== privacy
                    })}
                  />
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default SubjectArticle
