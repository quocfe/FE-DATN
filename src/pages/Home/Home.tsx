import { IonIcon } from '@ionic/react'
import Sidebar from './components/Sidebar'
import Post from '~/components/Post'
import useQueryPostsFromFriendsAndPendingRequests from '~/hooks/queries/post/useQueryListPostFriendAndPending'
import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import http from '~/utils/http'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

function Home() {
  const [page, setPage] = useState<number>(1)
  const queryClient = useQueryClient()
  const { data } = useQueryPostsFromFriendsAndPendingRequests()
  const pages = data?.data.data.pages ?? 0
  const total = data?.data.data.total ?? 0

  useEffect(() => {
    if (page > pages) {
      return
    } else if (page === 1 && data) {
      queryClient.setQueryData(['posts_from_friends_and_pending_requests'], data)
    } else if (page > 1) {
      async function getPost() {
        const response = await http.get('post/post_friend_and_pending', {
          params: {
            _limit: 4,
            _page: page
          }
        })

        const newPosts = response.data.data.posts
        queryClient.setQueryData(
          ['posts_from_friends_and_pending_requests'],
          (oldData: AxiosResponse<PostResponse, any> | undefined) => {
            return {
              ...oldData,
              data: {
                ...oldData?.data,
                data: {
                  ...oldData?.data.data,
                  posts: [...(oldData?.data.data.posts ?? []), ...newPosts]
                }
              }
            }
          }
        )
      }
      getPost()
    }
  }, [page, pages])

  const handlePanigationPage = () => {
    if (page < pages) {
      setPage(page + 1)
    }
  }

  const handleScroll = useCallback(
    debounce(() => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight * 0.9) {
        handlePanigationPage()
      }
    }, 850),
    [page, pages]
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const posts = data?.data.data.posts ?? []

  return (
    <div className='mx-auto max-w-[1075px] gap-12 lg:flex 2xl:gap-16' id='js-oversized'>
      <div className='mx-auto max-w-[680px]'>
        {/* stories */}
        <div className='mb-8'>
          <h3 className='hidden text-2xl  font-extrabold text-black dark:text-white'> Stories</h3>
          <div className='relative' tabIndex={-1} uk-slider='auto play: true;finite: true' uk-lightbox=''>
            <div className='uk-slider-container py-5'>
              <ul
                className='uk-slider-items w-[calc(100%+14px)]'
                uk-scrollspy='target: > li; cls: uk-animation-scale-up; delay: 20;repeat:true'
              >
                <li className='md:pr-3' uk-scrollspy-class='uk-animation-fade'>
                  <div
                    className='dark:bg-dark2 relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-dashed border-slate-300 bg-slate-200 md:h-16 md:w-16 dark:border-slate-700'
                    uk-toggle='target: #create-story'
                  >
                    <IonIcon icon='camera' className='text-2xl' />
                  </div>
                </li>
                <li className='pr-2 duration-300 hover:-rotate-2 hover:scale-[1.15] md:pr-3'>
                  <a href='/src/assets/images/avatars/avatar-lg-1.jpg' data-caption='Caption 1'>
                    <div className='relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow md:h-16 md:w-16 md:border-4 dark:border-slate-700'>
                      <img
                        src='/src/assets/images/avatars/avatar-5.jpg'
                        alt=''
                        className='absolute h-full w-full object-cover'
                      />
                    </div>
                  </a>
                </li>
                <li className='pr-2 duration-300 hover:-rotate-2 hover:scale-[1.15] md:pr-3'>
                  <a href='/src/assets/images/avatars/avatar-lg-2.jpg' data-caption='Caption 1'>
                    <div className='relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow md:h-16 md:w-16 md:border-4 dark:border-slate-700'>
                      <img
                        src='/src/assets/images/avatars/avatar-5.jpg'
                        alt=''
                        className='absolute h-full w-full object-cover'
                      />
                    </div>
                  </a>
                </li>
                <li className='pr-2 duration-300 hover:-rotate-2 hover:scale-[1.15] md:pr-3'>
                  <a href='/src/assets/images/avatars/avatar-lg-4.jpg' data-caption='Caption 1'>
                    <div className='relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow md:h-16 md:w-16 md:border-4 dark:border-slate-700'>
                      <img
                        src='/src/assets/images/avatars/avatar-5.jpg'
                        alt=''
                        className='absolute h-full w-full object-cover'
                      />
                    </div>
                  </a>
                </li>
                <li className='pr-2 duration-300 hover:-rotate-2 hover:scale-[1.15] md:pr-3'>
                  <a href='/src/assets/images/avatars/avatar-lg-5.jpg' data-caption='Caption 1'>
                    <div className='relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow md:h-16 md:w-16 md:border-4 dark:border-slate-700'>
                      <img
                        src='/src/assets/images/avatars/avatar-5.jpg'
                        alt=''
                        className='absolute h-full w-full object-cover'
                      />
                    </div>
                  </a>
                </li>
                <li className='pr-2 duration-300 hover:-rotate-2 hover:scale-[1.15] md:pr-3'>
                  <a href='/src/assets/images/avatars/avatar-lg-1.jpg' data-caption='Caption 1'>
                    <div className='relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow md:h-16 md:w-16 md:border-4 dark:border-slate-700'>
                      <img
                        src='/src/assets/images/avatars/avatar-5.jpg'
                        alt=''
                        className='absolute h-full w-full object-cover'
                      />
                    </div>
                  </a>
                </li>
                <li className='pr-2 duration-300 hover:-rotate-2 hover:scale-[1.15] md:pr-3'>
                  <a href='/src/assets/images/avatars/avatar-lg-1.jpg' data-caption='Caption 1'>
                    <div className='relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow md:h-16 md:w-16 md:border-4 dark:border-slate-700'>
                      <img
                        src='/src/assets/images/avatars/avatar-5.jpg'
                        alt=''
                        className='absolute h-full w-full object-cover'
                      />
                    </div>
                  </a>
                </li>
                <li className='pr-2 duration-300 hover:-rotate-2 hover:scale-[1.15] md:pr-3'>
                  <a href='/src/assets/images/avatars/avatar-lg-2.jpg' data-caption='Caption 1'>
                    <div className='relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow md:h-16 md:w-16 md:border-4 dark:border-slate-700'>
                      <img
                        src='/src/assets/images/avatars/avatar-5.jpg'
                        alt=''
                        className='absolute h-full w-full object-cover'
                      />
                    </div>
                  </a>
                </li>
                <li className='pr-2 duration-300 hover:-rotate-2 hover:scale-[1.15] md:pr-3'>
                  <a href='/src/assets/images/avatars/avatar-lg-4.jpg' data-caption='Caption 1'>
                    <div className='relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow md:h-16 md:w-16 md:border-4 dark:border-slate-700'>
                      <img
                        src='/src/assets/images/avatars/avatar-5.jpg'
                        alt=''
                        className='absolute h-full w-full object-cover'
                      />
                    </div>
                  </a>
                </li>
                <li className='pr-2 duration-300 hover:-rotate-2 hover:scale-[1.15] md:pr-3'>
                  <a href='/src/assets/images/avatars/avatar-lg-5.jpg' data-caption='Caption 1'>
                    <div className='relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow md:h-16 md:w-16 md:border-4 dark:border-slate-700'>
                      <img
                        src='/src/assets/images/avatars/avatar-5.jpg'
                        alt=''
                        className='absolute h-full w-full object-cover'
                      />
                    </div>
                  </a>
                </li>
                <li className='pr-2 duration-300 hover:-rotate-2 hover:scale-[1.15] md:pr-3'>
                  <a href='/src/assets/images/avatars/avatar-lg-1.jpg' data-caption='Caption 1'>
                    <div className='relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow md:h-16 md:w-16 md:border-4 dark:border-slate-700'>
                      <img
                        src='/src/assets/images/avatars/avatar-5.jpg'
                        alt=''
                        className='absolute h-full w-full object-cover'
                      />
                    </div>
                  </a>
                </li>
                <li className='pr-2 md:pr-3'>
                  <div className='dark:bg-dark2 h-12 w-12 animate-pulse rounded-full bg-slate-200/60 md:h-16 md:w-16' />
                </li>
              </ul>
            </div>
            <div className='max-md:hidden'>
              <button
                type='button'
                className='dark:bg-dark3 absolute -left-3.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white shadow'
                uk-slider-item='previous'
              >
                <IonIcon icon='chevron-back' className='text-2xl' />
              </button>
              <button
                type='button'
                className='dark:bg-dark3 absolute -right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white shadow'
                uk-slider-item='next'
              >
                <IonIcon icon='chevron-forward' className='text-2xl' />
              </button>
            </div>
          </div>
        </div>
        {/* Bài đăng */}
        <Post posts={posts} />
        {pages > 1 && page < pages && posts.length < total && (
          <div className='pagination mt-5 flex justify-center pb-5'>
            <a
              className='inline-block cursor-pointer text-center text-sm hover:text-primary'
              onClick={handlePanigationPage}
            >
              Đang tải dữ liệu ...
            </a>
          </div>
        )}
      </div>
      {/* sidebar */}
      <Sidebar />
    </div>
  )
}

export default Home
