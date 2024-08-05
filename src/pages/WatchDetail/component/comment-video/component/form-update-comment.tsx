import React from 'react'
import { UseFormHandleSubmit, UseFormRegister, UseFormWatch } from 'react-hook-form'
import { cn } from '~/helpers'
import { CommentVideoFromSchema } from '../utils/comment-reply'

interface FormUpdateCommentProps {
  watch: UseFormWatch<CommentVideoFromSchema>
  handleSubmit: UseFormHandleSubmit<CommentVideoFromSchema>
  onSubmit: (data: CommentVideoFromSchema) => void
  register: UseFormRegister<CommentVideoFromSchema>
}

const FormUpdateComment = ({ register, watch, handleSubmit, onSubmit }: FormUpdateCommentProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <div className='flex w-full flex-1 items-center gap-1 gap-x-2 dark:border-slate-700/40'>
        <div className='relative min-h-10 flex-1 overflow-hidden rounded-2xl bg-gray-100'>
          <input
            id='content-comment'
            {...register('content')}
            placeholder='Add Comment....'
            // rows={1}
            // ref={refInputContent}
            className='w-full resize-none border-none !bg-transparent py-2 text-sm focus:!border-transparent focus:pr-20 focus:!ring-transparent'
          />
          <div className='uk-drop uk-open !top-2 pr-2' uk-drop='pos: bottom-right; mode: click'>
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
        <button
          type='submit'
          className={cn('flex items-center justify-center rounded-full bg-secondery px-5 py-3 text-sm', {
            'text-blue-500': watch('content')
          })}
          disabled={!watch('content')}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-4'>
            <path d='M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z' />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default FormUpdateComment
