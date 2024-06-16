/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useAuthStore from '~/store/auth.store'
import commentVideoSchema, { CommentVideoFromSchema } from './utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import commentVideoApi from '~/apis/comment-video.api'
import { useMutation } from '@tanstack/react-query'

interface AddCommentVideoProps {
  reply_id?: string
  reply_name?: string
  video_id: string
  reply?: {
    reply_id: string
    reply_name: string
  }
  setRefetchComment?: React.Dispatch<React.SetStateAction<boolean>>
}

const AddCommentVideo = ({ reply, video_id, setRefetchComment }: AddCommentVideoProps) => {
  const { profile } = useAuthStore()

  const { register, setValue, handleSubmit, reset } = useForm<CommentVideoFromSchema>({
    resolver: yupResolver(commentVideoSchema)
  })

  useEffect(() => {
    reply && setValue('reply_id', reply.reply_id)
    reply && setValue('reply_name', reply.reply_name)

    setValue('content', reply ? reply.reply_name : '')
  }, [reply])

  const { mutate: handleAddComment } = useMutation({
    mutationFn: async (data: CommentVideoFromSchema) => {
      const res = await commentVideoApi.postCommentVideo(video_id, data)
      return res
    },
    onSuccess: (data) => {
      setRefetchComment && setRefetchComment((prev) => !prev)
      reset()
      return data
    }
  })

  const onSubmit = (data: CommentVideoFromSchema) => {
    if (data.content || (data.reply_id && data.reply_name)) {
      console.log(data)
      handleAddComment(data)
    }

    return
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-3 flex items-center gap-1 p-2.5 sm:px-4 sm:py-3 dark:border-slate-700/40'>
        <img src={profile?.Profile.cover_photo} alt='' className='h-8 w-8 rounded-full' />
        <div className='relative min-h-10 flex-1 overflow-hidden rounded-2xl bg-gray-100 px-2'>
          <input
            {...register('content')}
            placeholder='Add Comment....'
            // rows={1}
            className='w-full resize-none border-none !bg-transparent px-2 py-2 outline-none focus:!border-transparent focus:pr-20 focus:!ring-transparent'
            defaultValue={''}
          />

          <div className='!top-2 pr-2' uk-drop='pos: bottom-right; mode: click'>
            <div
              className='flex items-center gap-2'
              uk-scrollspy='target: > svg; cls: uk-animation-slide-right-small; delay: 100 ;repeat: true'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-6 w-6 fill-sky-600'
              >
                <path
                  fillRule='evenodd'
                  d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
                  clipRule='evenodd'
                />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='h-5 w-5 fill-pink-600'
              >
                <path d='M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z' />
              </svg>
            </div>
          </div>
        </div>
        <button type='submit' className='rounded-full bg-secondery px-3.5 py-1.5 text-sm'>
          Replay
        </button>
      </div>
    </form>
  )
}

export default AddCommentVideo
