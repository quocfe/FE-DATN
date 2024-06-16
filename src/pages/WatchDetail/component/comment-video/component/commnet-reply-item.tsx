import { IonIcon } from '@ionic/react'
import React, { useRef, useState } from 'react'
import { cn } from '~/helpers'
import { useOnClickOutside } from '~/hooks/useOnClickOutside'
import useAuthStore from '~/store/auth.store'
import { calculateTimeAgo } from '~/utils/helpers'
import commentVideoSchema, { CommentVideoFromSchema } from '../utils/comment-reply'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import commentVideoApi from '~/apis/comment-video.api'
import { UseMutateFunction, useMutation } from '@tanstack/react-query'

interface CommnetReplyItemProps {
  item: Omit<CommentVideoItem, 'children_count'>
  handClickReply: (parent_id: string, reply_id: string, reply_name: string) => void
  comment: CommentVideoItem
  getCommentPartent: UseMutateFunction<Omit<CommentVideoItem, 'children_count'>[], Error, void, unknown>
}

const CommnetReplyItem = ({ item, handClickReply, comment, getCommentPartent }: CommnetReplyItemProps) => {
  const { profile } = useAuthStore()
  const [editComment, setEditComment] = useState<boolean>(false)

  const refActionComment = useRef(null)

  const [openActionComment, setOpenActionComment] = useState<boolean>(false)

  useOnClickOutside(refActionComment, () => {
    setOpenActionComment(false)
  })

  const { register, handleSubmit, setValue } = useForm<CommentVideoFromSchema>({
    resolver: yupResolver(commentVideoSchema)
  })

  const { mutate: editCommentPartent } = useMutation({
    mutationFn: async ({ video_id, data }: { video_id: string; data: CommentVideoFromSchema }) => {
      console.log(item.id)
      const res = await commentVideoApi.patchEditCommentVideo(video_id, { ...data, comment_id: item.id })
      return res.data.data
    },
    onSuccess: (data) => {
      getCommentPartent()
      setEditComment(false)
      return data
    }
  })

  const { mutate: deleteCommentPartent } = useMutation({
    mutationFn: async (comment_id: string) => {
      console.log(item.id)
      const res = await commentVideoApi.deleteCommentVideo(comment_id)
      return res.data.data
    },
    onSuccess: (data) => {
      getCommentPartent()
      return data
    }
  })

  const onSubmit = (data: CommentVideoFromSchema) => {
    if (data.content || (data.reply_id && data.reply_name)) {
      console.log('Edit comment data', data)
      return editCommentPartent({ video_id: item.video_id, data })
    }
    return
  }

  return (
    <div className='flex items-start gap-x-1 px-[23px]'>
      <div
        className='mt-2 h-3 w-[32px] border-b-[2px]'
        style={{
          borderBottomLeftRadius: '10px',
          borderLeftStyle: 'solid',
          borderLeftWidth: '2px',
          borderBottomColor: '#F0F2F5'
        }}
      ></div>
      <div className='w-full flex-1'>
        <div className='flex w-full items-start space-x-2 p-1'>
          <div className='w-8'>
            <img src={item?.user?.Profile.cover_photo} alt='profile' className='h-8 w-8 rounded-full' />
          </div>
          <div className='group flex w-full flex-1 gap-x-2'>
            <div className={editComment ? 'w-full' : ''}>
              <div
                className={cn('w-[350px]  rounded-lg  bg-gray-100 px-4 py-1', {
                  'w-full max-w-full bg-transparent px-0': editComment
                })}
              >
                {editComment ? (
                  <>
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
                          {/* <div className='absolute bottom-0 left-0 top-0 z-[99999]  hidden h-full w-full items-center pl-4'>
                            <label htmlFor='content-comment' className='w-full'>
                              {watch('reply_name') && (
                                <span className='bg-[#0866FF33] px-1 font-bold'>{'@' + watch('reply_name')}</span>
                              )}
                              {watch('content')}
                              {refInputContent?.current?.value || ''}
                            </label>
                          </div> */}

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
                        <button type='submit' className='rounded-full bg-secondery px-3.5 py-1.5 text-sm'>
                          Replay
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <span className='text-sm font-medium text-black'>{item?.user?.first_name}</span>
                    <div className='text-sm font-normal text-[#050505]'>{item?.content}</div>
                  </>
                )}
              </div>
              <div className='flex gap-3 px-4 pt-1 text-[12px]'>
                {editComment ? (
                  <>
                    <span>{calculateTimeAgo(item.createdAt)}</span>
                    <button className='hover:text-blue-500' onClick={() => setEditComment(false)}>
                      Hủy
                    </button>
                  </>
                ) : (
                  <>
                    <span>{calculateTimeAgo(item.createdAt)}</span>
                    <button className='hover:text-blue-500'>Thích</button>
                    <button
                      className='hover:text-blue-500'
                      onClick={() => handClickReply(comment.id, item.user_id, item.user.first_name)}
                    >
                      Phản hồi
                    </button>
                  </>
                )}
              </div>
            </div>
            {!editComment && (
              <div
                className={cn('relative hidden items-center pb-4 group-hover:flex', {
                  flex: openActionComment
                })}
              >
                <button
                  type='button'
                  className='grid h-8 w-8 place-items-center rounded-full hover:bg-secondery'
                  onClick={() => setOpenActionComment((prev) => !prev)}
                >
                  <IonIcon className='text-xl' name='ellipsis-horizontal' />
                </button>
                {openActionComment && (
                  <div
                    ref={refActionComment}
                    className='absolute left-1/2 top-[80%] z-50 flex w-[200px] -translate-x-[50%] flex-col gap-y-2 rounded-md bg-white py-2 shadow-md'
                  >
                    {item.user_id === profile?.user_id && !editComment && (
                      <>
                        <div
                          className='w-full cursor-pointer px-3 py-1 font-medium text-black hover:bg-slate-200'
                          onClick={() => {
                            setOpenActionComment(false)
                            setEditComment(true)
                            setValue('content', item?.content)
                          }}
                        >
                          Chinh sửa
                        </div>
                        <div
                          className='w-full cursor-pointer px-3 py-1 font-medium text-black hover:bg-slate-200'
                          onClick={() => deleteCommentPartent(item.id)}
                        >
                          Xóa
                        </div>
                      </>
                    )}
                    {item.user_id !== profile?.user_id && (
                      <>
                        <div className='w-full cursor-pointer px-3 py-1 font-medium text-black hover:bg-slate-200'>
                          Ẩn bình luận
                        </div>
                        <div className='w-full cursor-pointer px-3 py-1 font-medium text-black hover:bg-slate-200'>
                          Báo cáo bình luận
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommnetReplyItem
