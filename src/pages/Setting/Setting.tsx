import { IonIcon } from '@ionic/react'
import { useRef } from 'react'
import useUpdateImage from '~/hooks/queries/user/useUpdateImage'
import useAuthStore from '~/store/auth.store'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'

interface Props {
  children: React.ReactNode
}

function Setting({ children }: Props) {
  // Hooks
  const { pathname } = useLocation()
  const { profile } = useAuthStore()
  const { updateImage } = useUpdateImage()
  const inputFileProfilePictureRef = useRef<HTMLInputElement | null>(null)

  // Thay đổi ảnh đại diện
  const handleUpdateImage = (type: 'profile_picture' | 'cover_photo') => {
    let file: File | null = null
    if (type === 'profile_picture' && inputFileProfilePictureRef.current && inputFileProfilePictureRef.current.files) {
      file = inputFileProfilePictureRef.current.files[0]
    }

    if (file) {
      updateImage(type, file)
    }
  }

  return (
    <div className='mx-auto max-w-3xl'>
      <div className='box relative rounded-lg shadow-md'>
        {/* Head */}
        <div className='flex items-center gap-4 p-6 md:gap-8 md:p-8 md:pb-4'>
          <div className='relative h-12 w-12 shrink-0 md:h-20 md:w-20'>
            <label htmlFor='file' className='cursor-pointer'>
              <img
                id='img'
                src={profile?.Profile.profile_picture}
                className='h-full w-full rounded-full object-cover'
                alt=''
              />
              <input
                type='file'
                id='file'
                className='hidden'
                ref={inputFileProfilePictureRef}
                onChange={() => handleUpdateImage('profile_picture')}
              />
            </label>
            <label
              htmlFor='file'
              className='absolute -bottom-2 -right-2 cursor-pointer rounded-full border-white bg-slate-600 p-0.5 md:border-4 md:p-1 dark:border-slate-700'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-3 w-3 fill-white md:h-4 md:w-4'
              >
                <path d='M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z' />
                <path
                  fillRule='evenodd'
                  d='M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z'
                  clipRule='evenodd'
                />
              </svg>
              <input id='file' type='file' className='hidden' />
            </label>
          </div>
          <div className='flex-1'>
            <h3 className='text-base font-semibold text-black md:text-xl dark:text-white'>
              {' '}
              {profile?.last_name} {profile?.first_name}{' '}
            </h3>
            <p className='mt-1 text-sm font-normal text-blue-600'>{profile?.email}</p>
          </div>
          <Link
            to={'/profile'}
            className='inline-flex items-center gap-1 rounded-full border-2 border-slate-100 bg-slate-50 py-1 pl-2.5 pr-3 dark:bg-slate-700 dark:text-white'
            type='button'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <IonIcon
              icon='flash-outline'
              className='md hydrated text-base duration-500 group-aria-expanded:rotate-180'
              role='img'
              aria-label='chevron down outline'
            />
            <span className='text-sm font-medium'> Trang cá nhân</span>
          </Link>
        </div>
        {/* Nav Tabs */}
        <div className='relative border-b' tabIndex={-1} uk-slider='finite: true'>
          <nav className='uk-slider-container nav__underline -mb-px overflow-hidden border-transparent p-0 px-6'>
            <ul className='uk-slider-items w-[calc(100%+10px)] !overflow-hidden'>
              <li
                className={classNames('w-auto pr-2.5', {
                  'border-b-2 border-gray-600': pathname === '/setting'
                })}
              >
                <Link to={'/setting'}> Cài đặt chung </Link>
              </li>
              <li
                className={classNames('w-auto pr-2.5', {
                  'border-b-2 border-gray-600': pathname === '/setting/password'
                })}
              >
                <Link to={'/setting/password'}> Đổi mật khẩu</Link>
              </li>
              <li
                className={classNames('w-auto pr-2.5', {
                  'border-b-2 border-gray-600': pathname === '/setting/blocks'
                })}
              >
                <Link to={'/setting/blocks'}> Chặn</Link>
              </li>
              <li className='w-auto pr-2.5'>
                <a href='#'> Cover Photo</a>
              </li>
              <li className='w-auto pr-2.5'>
                <a href='#'> Invites</a>
              </li>
              <li className='w-auto pr-2.5'>
                <a href='#'> Finish</a>
              </li>
              <li className='w-auto pr-2.5'>
                <a href='#'> Description </a>
              </li>
              <li className='w-auto pr-2.5'>
                <a href='#'> Setting</a>
              </li>
            </ul>
          </nav>
          <a
            className='absolute left-0 top-1/2 flex h-full w-20 -translate-y-1/2 items-center justify-start bg-gradient-to-r from-white via-white p-2 py-1 dark:from-slate-800 dark:via-slate-800'
            href='#'
            uk-slider-item='previous'
          >
            <IonIcon icon='chevron-back' className='ml-1 text-2xl' />
          </a>
          <a
            className='absolute right-0 top-1/2 flex h-full w-20 -translate-y-1/2 items-center justify-end bg-gradient-to-l from-white via-white p-2 py-1 dark:from-slate-800 dark:via-slate-800'
            href='#'
            uk-slider-item='next'
          >
            <IonIcon icon='chevron-forward' className='mr-1 text-2xl' />
          </a>
        </div>
        {/* Contents */}
        <div className='overflow-hidden p-6 text-sm text-black md:px-20 md:py-8'>{children}</div>
      </div>
    </div>
  )
}

export default Setting
