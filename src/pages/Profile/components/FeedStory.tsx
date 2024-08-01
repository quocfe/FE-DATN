import React, { useCallback, useEffect, useState } from 'react'
import useQueryListMyPosts from '~/hooks/queries/post/useQueryListMyPosts'
import Post from '~/components/Post'
import Modal from '~/components/Modal'
import CreatePost from '~/components/CreatePost'
import usePostStore from '~/store/post.store'
import http from '~/utils/http'
import { debounce } from 'lodash'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

function FeedStory() {
  const { isCreatePost, setIsCreatePost } = usePostStore()
  const [page, setPage] = useState<number>(1)

  // React Query
  const queryClient = useQueryClient()
  const { data } = useQueryListMyPosts()
  const pages = data?.data.data.pages ?? 0
  const total = data?.data.data.total ?? 0

  useEffect(() => {
    if (page > pages) {
      return
    } else if (page === 1 && data) {
      queryClient.setQueryData(['my_posts'], data)
    } else if (page > 1) {
      async function getPost() {
        const response = await http.get('post/my_post', {
          params: {
            _limit: 2,
            _page: page
          }
        })

        const newPosts = response.data.data.posts
        queryClient.setQueryData(['my_posts'], (oldData: AxiosResponse<PostResponse, any> | undefined) => {
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
        })
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
    <div className='flex-1 space-y-3 xl:space-y-6'>
      <Modal isVisible={isCreatePost} onClose={() => setIsCreatePost(false)} width='40%'>
        <CreatePost />
      </Modal>
      {/* Thêm mới bài viết */}
      <div className='border1 dark:bg-dark2 space-y-4 rounded-xl bg-white p-4 text-sm font-medium shadow-sm'>
        <div className='flex items-center gap-3'>
          <div
            className='dark:bg-dark3 flex-1 cursor-pointer rounded-lg bg-slate-100 transition-all hover:bg-opacity-80'
            onClick={() => setIsCreatePost(true)}
          >
            <div className='py-2.5 text-center dark:text-white'> Bạn đang suy nghĩ điều gì? </div>
          </div>
          <div className='cursor-pointer rounded-lg bg-pink-100/60 p-1 px-1.5 transition-all hover:bg-pink-100 hover:bg-opacity-80'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 fill-pink-200/70 stroke-pink-600'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#2c3e50'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M15 8h.01' />
              <path d='M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z' />
              <path d='M3.5 15.5l4.5 -4.5c.928 -.893 2.072 -.893 3 0l5 5' />
              <path d='M14 14l1 -1c.928 -.893 2.072 -.893 3 0l2.5 2.5' />
            </svg>
          </div>
          <div className='cursor-pointer rounded-lg bg-sky-100/60 p-1 px-1.5 transition-all hover:bg-sky-100 hover:bg-opacity-80'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 fill-sky-200/70 stroke-sky-600 '
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#2c3e50'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z' />
              <path d='M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z' />
            </svg>
          </div>
        </div>
      </div>

      {/* Danh sách bài viết  */}
      <Post posts={posts} />
      {pages > 1 && page < pages && posts.length < total && (
        <div className='pagination flex justify-center pb-5'>
          <a
            className='inline-block cursor-pointer text-center text-sm hover:text-primary'
            onClick={handlePanigationPage}
          >
            Đang tải dữ liệu ...
          </a>
        </div>
      )}
    </div>
  )
}

export default React.memo(FeedStory)
