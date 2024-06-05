import { IonIcon } from '@ionic/react'
import { useRef } from 'react'
import useUpdateImage from '~/hooks/user/useUpdateImage'
import useAuthStore from '~/store/auth.store'
import ChangePassword from './components/ChangePassword'
import BasicInfo from './components/BasicInfo'

function Setting() {
  // Hooks
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
          <button
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
            <span className='text-sm font-medium'> Nâng cấp</span>
          </button>
        </div>
        {/* nav tabs */}
        <div className='relative border-b' tabIndex={-1} uk-slider='finite: true'>
          <nav className='uk-slider-container nav__underline -mb-px overflow-hidden border-transparent p-0 px-6'>
            <ul
              className='uk-slider-items w-[calc(100%+10px)] !overflow-hidden'
              uk-switcher='connect: #setting_tab ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium'
            >
              <li className='w-auto pr-2.5'>
                <a href='#'> Cài đặt chung </a>
              </li>
              <li className='w-auto pr-2.5'>
                <a href='#'> Đổi mật khẩu</a>
              </li>
              <li className='w-auto pr-2.5'>
                <a href='#'> Avatare</a>
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
              <li className='w-auto pr-2.5'>
                <a href='#'> anothers</a>
              </li>
              <li className='w-auto pr-2.5'>
                <a href='#'> anothers</a>
              </li>
              <li className='w-auto pr-2.5'>
                <a href='#'> anothers44</a>
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
        <div id='setting_tab' className='uk-switcher overflow-hidden p-6 text-sm text-black md:px-20 md:py-12'>
          {/* basic info */}
          <BasicInfo profile={profile} />
          {/* change password*/}
          <ChangePassword />
          {/* tab socialinks */}
          <div>
            <div className='mx-auto max-w-md'>
              <div className='font-normal text-gray-400'>
                <div>
                  <h4 className='text-xl font-medium text-black dark:text-white'> Social Links </h4>
                  <p className='mt-3 font-normal text-gray-600 dark:text-white'>
                    We may still send you important notifications about your account and content outside of you
                    preferred notivications settings
                  </p>
                </div>
                <div className='mt-8 space-y-6'>
                  <div className='flex items-center gap-3'>
                    <div className='flex rounded-full bg-blue-50 p-2 '>
                      <IonIcon icon='logo-facebook' className='text-2xl text-blue-600' />
                    </div>
                    <div className='flex-1'>
                      <input type='text' className='w-full' placeholder='http://www.facebook.com/myname' />
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='flex rounded-full bg-pink-50 p-2 '>
                      <IonIcon icon='logo-instagram' className='text-2xl text-pink-600' />
                    </div>
                    <div className='flex-1'>
                      <input type='text' className='w-full' placeholder='http://www.instagram.com/myname' />
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='flex rounded-full bg-sky-50 p-2 '>
                      <IonIcon icon='logo-twitter' className='text-2xl text-sky-600' />
                    </div>
                    <div className='flex-1'>
                      <input type='text' className='w-full' placeholder='http://www.twitter.com/myname' />
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='flex rounded-full bg-red-50 p-2 '>
                      <IonIcon icon='logo-youtube' className='text-2xl text-red-600' />
                    </div>
                    <div className='flex-1'>
                      <input type='text' className='w-full' placeholder='http://www.youtube.com/myname' />
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='flex rounded-full bg-slate-50 p-2 '>
                      <IonIcon icon='logo-github' className='text-2xl text-black' />
                    </div>
                    <div className='flex-1'>
                      <input type='text' className='w-full' placeholder='http://www.github.com/myname' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-16 flex items-center justify-center gap-4'>
                <button type='submit' className='button bg-secondery max-md:flex-1 lg:px-6'>
                  Cancle
                </button>
                <button type='submit' className='button bg-primary text-white max-md:flex-1 lg:px-10'>
                  Save
                </button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className='items-start gap-16 md:flex'>
                <label className='text-right font-semibold md:w-32'> Notify me when </label>
                <div className='interactive-effect flex-1 space-y-4 max-md:mt-5'>
                  <div>
                    <label className='inline-flex items-center'>
                      <input className='rounded' type='checkbox' name='checkbox1' defaultValue={3} />
                      <span className='ml-3'> Someone send me message </span>
                    </label>
                  </div>
                  <div>
                    <label className='inline-flex items-center'>
                      <input className='rounded' type='checkbox' name='checkbox1' defaultValue={3} />
                      <span className='ml-3'> Someone liked my photo </span>
                    </label>
                  </div>
                  <div>
                    <label className='inline-flex items-center'>
                      <input className='rounded' type='checkbox' name='checkbox2' defaultValue={3} />
                      <span className='ml-3'> Someone shared on my photo </span>
                    </label>
                  </div>
                  <div>
                    <label className='inline-flex items-center'>
                      <input className='rounded' type='checkbox' name='checkbox2' defaultValue={3} />
                      <span className='ml-3'> Someone followed me </span>
                    </label>
                  </div>
                  <div>
                    <label className='inline-flex items-center'>
                      <input className='rounded' type='checkbox' name='checkbox2' defaultValue={3} />
                      <span className='ml-3'> Someone liked my posts</span>
                    </label>
                  </div>
                  <div>
                    <label className='inline-flex items-center'>
                      <input className='rounded' type='checkbox' name='checkbox2' defaultValue={3} />
                      <span className='ml-3'> Someone mentioned me</span>
                    </label>
                  </div>
                  <div>
                    <label className='inline-flex items-center'>
                      <input className='rounded' type='checkbox' name='checkbox2' defaultValue={3} />
                      <span className='ml-3'> Someone sent me follow requset</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className='mt-16 flex items-center justify-center gap-4'>
                <button type='submit' className='button bg-secondery max-md:flex-1 lg:px-6'>
                  Cancle
                </button>
                <button type='submit' className='button bg-primary text-white max-md:flex-1 lg:px-10'>
                  Save
                </button>
              </div>
            </div>
          </div>
          {/* tab toggle options*/}
          <div>
            <div>
              <div className='space-y-6'>
                <div className='items-start gap-10 md:flex'>
                  <label className='w-40 text-right font-semibold'> Who can follow me ? </label>
                  <div className='interactive-effect flex-1 space-y-2 max-md:mt-3'>
                    <div>
                      <label className='inline-flex items-center'>
                        <input type='radio' name='radio-s1' defaultValue={1} />
                        <span className='ml-3'> Everyone</span>
                      </label>
                    </div>
                    <div>
                      <label className='inline-flex items-center'>
                        <input type='radio' name='radio-s1' defaultValue={2} />
                        <span className='ml-3'> The People I Follow</span>
                      </label>
                    </div>
                    <div>
                      <label className='inline-flex items-center'>
                        <input type='radio' name='radio-s1' defaultValue={3} />
                        <span className='ml-3'> No body</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className='items-start gap-10 md:flex'>
                  <label className='text-right font-semibold md:w-40'> Who can message me ? </label>
                  <div className='interactive-effect flex-1 space-y-2 max-md:mt-3'>
                    <div>
                      <label className='inline-flex items-center'>
                        <input type='radio' name='radio-s2' defaultValue={1} />
                        <span className='ml-3'> Everyone</span>
                      </label>
                    </div>
                    <div>
                      <label className='inline-flex items-center'>
                        <input type='radio' name='radio-s2' defaultValue={2} />
                        <span className='ml-3'> The People I Follow</span>
                      </label>
                    </div>
                    <div>
                      <label className='inline-flex items-center'>
                        <input type='radio' name='radio-s2' defaultValue={3} />
                        <span className='ml-3'> No body</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className='items-start gap-10 md:flex'>
                  <label className='text-right font-semibold md:w-40'>Status</label>
                  <div className='interactive-effect flex-1 space-y-2 max-md:mt-3'>
                    <div>
                      <label className='inline-flex items-center'>
                        <input type='radio' name='radio-s3' defaultValue={3} />
                        <span className='ml-3'> Yes</span>
                      </label>
                    </div>
                    <div>
                      <label className='inline-flex items-center'>
                        <input type='radio' name='radio-s3' defaultValue={3} />
                        <span className='ml-3'> No</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className='items-start gap-10 md:flex'>
                  <label className='text-right font-semibold md:w-40'>Show my activities ?</label>
                  <div className='interactive-effect flex-1 space-y-2 max-md:mt-3'>
                    <div>
                      <label className='inline-flex items-center'>
                        <input type='radio' name='radio-s4' defaultValue={3} />
                        <span className='ml-3'> Public</span>
                      </label>
                    </div>
                    <div>
                      <label className='inline-flex items-center'>
                        <input type='radio' name='radio-s4' defaultValue={3} />
                        <span className='ml-3'> Hide</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-16 flex items-center justify-center gap-4'>
                <button type='submit' className='button bg-secondery max-md:flex-1 lg:px-6'>
                  Cancle
                </button>
                <button type='submit' className='button bg-primary text-white max-md:flex-1 lg:px-10'>
                  Save
                </button>
              </div>
            </div>
          </div>
          {/* tab select dropdown*/}
          <div>
            <div>
              <div className='mx-auto max-w-lg space-y-6 font-medium'>
                <div className='items-center justify-between gap-16 md:flex'>
                  <label className='text-right md:w-40'> Who can follow me ? </label>
                  <div className='flex-1 max-md:mt-4'>
                    <select className='w-full !rounded-md !border-0'>
                      <option value={1}>Everyone</option>
                      <option value={2}>People I Follow</option>
                    </select>
                  </div>
                </div>
                <div className='items-center justify-between gap-16 md:flex'>
                  <label className='text-right md:w-40'> Who can message me ? </label>
                  <div className='flex-1 max-md:mt-4'>
                    <select className='w-full !rounded-md !border-0'>
                      <option value={1}>Everyone</option>
                      <option value={2}>People I Follow</option>
                      <option value={2}>No body</option>
                    </select>
                  </div>
                </div>
                <div className='items-center justify-between gap-16 md:flex'>
                  <label className='text-right md:w-40'> Show my activities ?</label>
                  <div className='flex-1 max-md:mt-4'>
                    <select className='w-full !rounded-md !border-0'>
                      <option value={1}>Yes</option>
                      <option value={2}>Now</option>
                    </select>
                  </div>
                </div>
                <div className='items-center justify-between gap-16 md:flex'>
                  <label className='text-right md:w-40'> Status </label>
                  <div className='flex-1 max-md:mt-4'>
                    <select className='w-full !rounded-md !border-0'>
                      <option value={1}>Online</option>
                      <option value={2}>Offline</option>
                    </select>
                  </div>
                </div>
                <div className='items-center justify-between gap-16 md:flex'>
                  <label className='text-right md:w-40'> Who can see my tags? </label>
                  <div className='flex-1 max-md:mt-4'>
                    <select className='w-full !rounded-md !border-0'>
                      <option value={1}>Everyone</option>
                      <option value={2}>People I Follow</option>
                      <option value={2}>No body</option>
                    </select>
                  </div>
                </div>
                <div className='items-center justify-between gap-16 md:flex'>
                  <label className='text-right md:w-40'> Allow search engines </label>
                  <div className='flex-1 max-md:mt-4'>
                    <select className='w-full !rounded-md !border-0'>
                      <option value={1}>Yes</option>
                      <option value={2}>Now</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='mt-16 flex items-center justify-center gap-4'>
                <button type='submit' className='button bg-secondery max-md:flex-1 lg:px-6'>
                  Cancle
                </button>
                <button type='submit' className='button bg-primary text-white max-md:flex-1 lg:px-10'>
                  Save
                </button>
              </div>
            </div>
          </div>
          {/* tab Premision */}
          <div>
            <div>
              <div className='mx-auto max-w-lg text-sm font-normal text-gray-400'>
                <div>
                  <h4 className='text-lg font-semibold text-black dark:text-white'> Alerts preferences </h4>
                  <p className=' mt-3'>
                    We may still send you important notifications about your account and content outside of you
                    preferred notivications settings
                  </p>
                </div>
                <div
                  className='mt-8 space-y-4 md:space-y-8'
                  uk-scrollspy='target: > div; cls: uk-animation-slide-bottom-medium; delay: 100 ;repeat: true'
                >
                  <div className='w-full'>
                    <label className='switch flex cursor-pointer items-center justify-between gap-4'>
                      <div className='hidden shrink-0 rounded-full bg-sky-100 p-2 text-sky-500 md:flex'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='h-6 w-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
                          />
                        </svg>
                      </div>
                      <div className='flex-1 md:pr-8'>
                        <h4 className='mb-1.5 text-base font-medium text-black dark:text-white'>Email notifications</h4>
                        <p className=''>
                          You can receive notifications about important updates and content directly to your email
                          inbox.
                        </p>
                      </div>
                      <input type='checkbox' />
                      <span className='switch-button !relative' />
                    </label>
                  </div>
                  <div className='w-full'>
                    <label className='switch flex cursor-pointer items-center justify-between gap-4'>
                      <div className='hidden shrink-0 rounded-full bg-purple-100 p-2 text-purple-500 md:flex'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='h-6 w-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3'
                          />
                        </svg>
                      </div>
                      <div className='flex-1 md:pr-8'>
                        <h4 className='mb-1.5 text-base font-medium text-black dark:text-white'> web notifications</h4>
                        <p className=''> You can receive notifications through your notifications center </p>
                      </div>
                      <input type='checkbox' />
                      <span className='switch-button !relative' />
                    </label>
                  </div>
                  <div className='w-full'>
                    <label className='switch flex cursor-pointer items-center justify-between gap-4'>
                      <div className='hidden shrink-0 rounded-full bg-teal-100 p-2 text-teal-500 md:flex'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='h-6 w-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3'
                          />
                        </svg>
                      </div>
                      <div className='flex-1 md:pr-8'>
                        <h4 className='mb-1.5 text-base font-medium text-black dark:text-white'>Phone notifications</h4>
                        <p className=''>
                          You can receive notifications on your phone, so you can stay up-to-date even when you’re on
                          the go
                        </p>
                      </div>
                      <input type='checkbox' />
                      <span className='switch-button !relative' />
                    </label>
                  </div>
                </div>
              </div>
              <div className='mt-16 flex items-center justify-center gap-4'>
                <button type='submit' className='button bg-secondery max-md:flex-1 lg:px-6'>
                  Cancle
                </button>
                <button type='submit' className='button bg-primary text-white max-md:flex-1 lg:px-10'>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting
