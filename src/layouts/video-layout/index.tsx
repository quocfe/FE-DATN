/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import Header from '~/components/Header'
import { ROUTE_PATH } from '~/constants'
import { cn } from '~/helpers'
import video from '../../assets/images/icons/video.png'
interface VideoLayoutProps {
  children: React.ReactNode
}

const KEY_SEARCH = 'q'

const VideoLayout = ({ children }: VideoLayoutProps) => {
  const navigate = useNavigate()
  const currentPath = location.pathname
  const [value, setValue] = useState<string>('')
  const [searchParams] = useSearchParams()

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      // Ngăn gửi form nếu muốn xử lý bằng cách khác
      event.preventDefault()
      if (value.trim().length === 0) {
        return navigate('/watch')
      }

      if (value.trim() !== '' && currentPath !== `watch/search?q=${value}`) {
        return navigate(`/watch/search?q=${value}`)
      }

      return searchParams.set(KEY_SEARCH, value)
    }
  }

  const onClickSearch = () => {
    if (value.trim().length === 0) {
      return navigate('/watch')
    }

    if (value.trim() !== '' && currentPath !== `watch/search?q=${value}`) {
      return navigate(`/watch/search?q=${value}`)
    }

    return searchParams.set(KEY_SEARCH, value)
  }

  return (
    <React.Fragment>
      <Header />
      <div
        id='site__sidebar'
        className='fixed left-0 top-0 z-[99] overflow-hidden pt-[--m-top] transition-transform max-xl:w-full max-xl:-translate-x-full xl:duration-500'
      >
        {/* sidebar inner */}
        <div className='z-[9] h-[calc(100vh-64px)] w-[300px] bg-white p-2 shadow-lg max-lg:border-r dark:border-slate-700 dark:max-xl:!bg-slate-700'>
          <div className='pr-4' data-simplebar='init'>
            <div className='simplebar-wrapper' style={{ margin: '0px -16px 0px 0px' }}>
              <div className='simplebar-height-auto-observer-wrapper'>
                <div className='simplebar-height-auto-observer' />
              </div>
              <div className='simplebar-mask'>
                <div className='simplebar-offset' style={{ right: '-15px', bottom: 0 }}>
                  <div className='simplebar-content'>
                    <div className='mb-3 flex items-center justify-between '>
                      <h4 className='text-2xl font-bold'>Video</h4>
                      <button className='text-black'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='size-6'
                        >
                          <path
                            fillRule='evenodd'
                            d='M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </button>
                    </div>
                    <div className='mb-3 '>
                      <div className='flex items-center !rounded-full bg-[#F0F2F5] pl-4'>
                        <div className='cursor-pointer' onClick={onClickSearch}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                            className='size-4'
                          >
                            <path
                              fillRule='evenodd'
                              d='M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </div>
                        <input
                          type='text'
                          value={value}
                          className='h-10 w-full !rounded-full bg-transparent !pl-2 focus:border-none focus:outline-none focus:ring-0'
                          placeholder='Tìm kiếm video'
                          onChange={(e) => setValue(e.target.value.trim())}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                    </div>
                    <nav id='side'>
                      <ul>
                        <li className='mb-0.5'>
                          <NavLink
                            to={ROUTE_PATH.WATCH}
                            className={({ isActive }) =>
                              cn({
                                'bg-slate-100': isActive
                              })
                            }
                            end
                          >
                            <button className='rounded-full bg-slate-200 p-2'>
                              <img src={video} alt='messages' className='w-6' />
                            </button>
                            <span>Trang chủ</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to={ROUTE_PATH.WATCH_SAVE}
                            className={({ isActive }) =>
                              cn({
                                'bg-slate-100 text-yellow-300': isActive
                              })
                            }
                            end
                          >
                            <button className='rounded-full bg-slate-200 p-2'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='currentColor'
                                className='size-6'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </button>

                            <span className='text-black'> Video đã lưu </span>
                          </NavLink>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <div className='simplebar-placeholder' style={{ width: 240, height: 896 }} />
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <main id='site__main' className='mt-[--m-top] h-[calc(100vh-var(--m-top))] p-2.5 xl:ml-[300px]'>
        {children}
      </main>
    </React.Fragment>
  )
}

export default VideoLayout
