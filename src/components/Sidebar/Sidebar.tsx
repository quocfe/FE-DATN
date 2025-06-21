import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { ROUTE_PATH } from '~/constants'

function Sidebar() {
  const { pathname } = useLocation()

  return (
    <div
      id='site__sidebar'
      className='fixed left-0 top-0 z-[40] overflow-hidden pt-[--m-top] transition-transform max-xl:w-full max-xl:-translate-x-full xl:duration-500'
    >
      {/* sidebar inner */}
      <div className='relative z-30 h-[calc(100vh-64px)] w-[80%] p-2 shadow-sm max-xl:bg-white max-lg:border-r sm:w-64 2xl:w-72 dark:border-slate-700 dark:max-xl:!bg-slate-700'>
        <div className='pr-4' data-simplebar='init'>
          <div className='simplebar-wrapper' style={{ margin: '0px -16px 0px 0px' }}>
            <div className='simplebar-height-auto-observer-wrapper'>
              <div className='simplebar-height-auto-observer' />
            </div>
            <div className='simplebar-mask'>
              <div className='simplebar-offset' style={{ right: '-15px', bottom: 0 }}>
                <div
                  className='simplebar-content'
                  style={{
                    padding: '0px 16px 0px 0px',
                    height: '100%',
                    overflow: 'hidden scroll'
                  }}
                >
                  <nav id='side'>
                    <ul>
                      <li
                        className={classNames('', {
                          active: pathname === '/'
                        })}
                      >
                        <Link to={'/'}>
                          <img src='/src/assets/images/icons/home.png' alt='feeds' className='w-6' />
                          <span> Bảng tin </span>
                        </Link>
                      </li>
                      <li
                        className={classNames('', {
                          active: pathname === '/friend/suggests'
                        })}
                      >
                        <Link to={'/friend/suggests'}>
                          <img src='/src/assets/images/icons/group.png' alt='groups' className='w-6' />
                          <span> Bạn bè </span>
                        </Link>
                      </li>
                      <li
                        className={classNames('', {
                          active: pathname === '/message'
                        })}
                      >
                        <Link to={'/message'}>
                          <img
                            src='http://localhost:8080/src/assets/images/icons/message.png'
                            alt='messages'
                            className='w-5'
                          />
                          <span> Trò chuyện </span>
                        </Link>
                      </li>
                      <li
                        className={classNames('', {
                          active: pathname === ROUTE_PATH.WATCH
                        })}
                      >
                        <Link to={ROUTE_PATH.WATCH}>
                          <img src='/src/assets/images/icons/video.png' alt='messages' className='w-6' />
                          <span> Video </span>
                        </Link>
                      </li>
                      <li>
                        <a>
                          <img src='/src/assets/images/icons/event.png' alt='messages' className='w-6' />
                          <span> Sự kiện </span>
                        </a>
                      </li>
                      <li
                        className={classNames('', {
                          active: pathname === 'fanpage'
                        })}
                      >
                        <Link to={'/fanpage'}>
                          <img src='/src/assets/images/icons/page.png' alt='pages' className='w-6' />
                          <span> Trang </span>
                        </Link>
                      </li>
                      <li>
                        <a>
                          <img src='/src/assets/images/icons/blog.png' alt='blog' className='w-6' />
                          <span> Blog </span>
                        </a>
                      </li>
                      <li className='!hidden' id='show__more'>
                        <a href='games.html'>
                          <img src='/src/assets/images/icons/game.png' alt='games' className='w-6' />
                          <span> Trò chơi </span>
                        </a>
                      </li>
                    </ul>
                    <button
                      type='button'
                      className='flex w-full items-center gap-4 px-4 py-2 text-sm font-medium text-black dark:text-white'
                      uk-toggle='target: #show__more; cls: !hidden uk-animation-fade'
                      aria-expanded='true'
                    >
                      <svg
                        className='h-6 w-6 rounded-full bg-gray-200 dark:bg-slate-700'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span id='show__more'> Xem thêm </span>
                      <span className='!hidden' id='show__more'>
                        See Less
                      </span>
                    </button>
                  </nav>
                  <nav
                    id='side'
                    className='mt-2 border-t pt-3 text-sm font-medium text-black dark:border-slate-800 dark:text-white'
                  >
                    <div className='px-3 pb-2 text-sm font-medium'>
                      <div className='text-black dark:text-white'>Trang</div>
                    </div>
                    <ul className='uk-nav mt-2 -space-y-2' uk-nav='multiple: true'>
                      <li>
                        <a>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-4 w-4'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
                            />
                            <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                          </svg>
                          <span> Cài đặt </span>
                        </a>
                      </li>

                      <li>
                        <a href='form-login.html'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-4 w-4'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
                            />
                          </svg>
                          <span> Đăng xuất</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className='simplebar-placeholder' style={{ width: 240, height: 896 }} />
          </div>
          <div className='simplebar-track simplebar-horizontal' style={{ visibility: 'hidden' }}>
            <div
              className='simplebar-scrollbar'
              style={{
                transform: 'translate3d(0px, 0px, 0px)',
                visibility: 'hidden'
              }}
            />
          </div>
          <div className='simplebar-track simplebar-vertical' style={{ visibility: 'visible' }}>
            <div
              className='simplebar-scrollbar'
              style={{
                height: 188,
                transform: 'translate3d(0px, 0px, 0px)',
                visibility: 'visible'
              }}
            />
          </div>
        </div>
      </div>
      {/* sidebar overly */}
      <div
        id='site__sidebar__overly'
        className='absolute left-0 top-0 z-20 h-screen w-screen backdrop-blur-sm xl:hidden'
        uk-toggle='target: #site__sidebar ; cls :!-translate-x-0'
        tabIndex={0}
        aria-expanded='false'
      ></div>
    </div>
  )
}

export default Sidebar
