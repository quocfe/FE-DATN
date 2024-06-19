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
import { useConfirm } from '~/components/design-systems/comfirm/confirm-provider'
import likeVideoApi from '~/apis/like-video.api'

interface CommnetReplyItemProps {
  comment_reply: Omit<CommentVideoItem, 'children_count'>
  handClickReply: (parent_id: string, reply_id: string, reply_name: string) => void
  comment: CommentVideoItem
  getCommentPartent: UseMutateFunction<Omit<CommentVideoItem, 'children_count'>[], Error, void, unknown>
}

const CommnetReplyItem = ({ comment_reply, handClickReply, comment, getCommentPartent }: CommnetReplyItemProps) => {
  const { profile } = useAuthStore()
  const [editComment, setEditComment] = useState<boolean>(false)

  const coreConfirm = useConfirm()

  const refActionComment = useRef(null)

  const [openActionComment, setOpenActionComment] = useState<boolean>(false)

  useOnClickOutside(refActionComment, () => {
    setOpenActionComment(false)
  })

  const { register, handleSubmit, setValue } = useForm<CommentVideoFromSchema>({
    resolver: yupResolver(commentVideoSchema)
  })

  // Chỉnh sửa comment reply
  const { mutate: editCommentPartent } = useMutation({
    mutationFn: async ({ video_id, data }: { video_id: string; data: CommentVideoFromSchema }) => {
      console.log(comment_reply.id)
      const res = await commentVideoApi.patchEditCommentVideo(video_id, { ...data, comment_id: comment_reply.id })
      return res.data.data
    },
    onSuccess: (data) => {
      getCommentPartent()
      setEditComment(false)
      return data
    }
  })

  // Xóa comment reply
  const { mutate: deleteCommentPartent } = useMutation({
    mutationFn: async (comment_id: string) => {
      console.log(comment_reply.id)
      const res = await commentVideoApi.deleteCommentVideo(comment_id)
      return res.data.data
    },
    onSuccess: (data) => {
      getCommentPartent()
      return data
    }
  })

  // Hàm Like hoặc bỏ like comment
  const { mutate: handlePatchLikeVideo } = useMutation({
    mutationFn: async ({ video_id, comment_id }: { video_id: string; comment_id: string }) => {
      const res = await likeVideoApi.pathLikeVideo(video_id, comment_id)
      return res.data
    },
    onSuccess: (data) => {
      getCommentPartent()
      return data
    }
  })

  // Hàm submit update comment reply
  const onSubmit = (data: CommentVideoFromSchema) => {
    if (data.content || (data.reply_id && data.reply_name)) {
      console.log('Edit comment data', data)
      return editCommentPartent({ video_id: comment_reply.video_id, data })
    }
    return
  }

  // Confirm xác nhận xóa comment reply
  const handleClickDeleteComment = (comment_id: string) => {
    coreConfirm({
      title: 'Xóa bình luận?',
      confirmOk: 'Xóa',
      confirmCancel: 'Không',
      content: 'Bạn có chắc chắn muốn xóa bình luận này không?',
      callbackOK: () => {
        deleteCommentPartent(comment_id)
      }
    })
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
            <img src={comment_reply?.user?.Profile.cover_photo} alt='profile' className='h-8 w-8 rounded-full' />
          </div>
          <div className='group flex w-full flex-1 items-center gap-x-2'>
            <div className={editComment ? 'mb-2 w-full' : ''}>
              <div
                className={cn('w-[350px] rounded-lg bg-gray-100 px-3 py-2', {
                  'w-full max-w-full bg-transparent px-0 py-0': editComment
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
                    <span className='text-[13px] font-bold text-black'>{comment_reply?.user?.first_name}</span>
                    <div className='text-sm font-normal text-[#050505]'>{comment_reply?.content}</div>
                  </>
                )}
              </div>
              <div className='flex items-center justify-between'>
                <div
                  className={cn('flex items-center gap-1 px-4 pt-1 text-[12px]', {
                    'gap-3': editComment
                  })}
                >
                  {editComment ? (
                    <>
                      <span>{calculateTimeAgo(comment_reply.createdAt)}</span>
                      <button className='font-bold hover:underline' onClick={() => setEditComment(false)}>
                        Hủy
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{calculateTimeAgo(comment_reply.createdAt)}</span>
                      <button
                        className={cn(
                          'relative flex items-center gap-x-2 rounded-md px-3 py-[6px] font-bold hover:underline dark:text-white',
                          {
                            'text-blue-500': Boolean(comment_reply.isLike)
                          }
                        )}
                        onClick={() =>
                          handlePatchLikeVideo({
                            comment_id: comment_reply.id,
                            video_id: comment_reply.video_id
                          })
                        }
                      >
                        Thích
                      </button>
                      <button
                        className='font-bold hover:underline'
                        onClick={() => handClickReply(comment.id, comment_reply.user_id, comment_reply.user.first_name)}
                      >
                        Phản hồi
                      </button>
                    </>
                  )}
                </div>
                <div className='flex gap-2 px-4 pt-1 text-[12px]'>
                  {!editComment && comment_reply?.like_count > 0 && (
                    <>
                      <img
                        src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"
                        alt=''
                        className='w-4'
                      />
                      {comment_reply.like_count}
                    </>
                  )}
                </div>
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
                    {comment_reply.user_id === profile?.user_id && !editComment && (
                      <>
                        <div
                          className='w-full cursor-pointer px-3 py-1 font-medium text-black hover:bg-slate-200'
                          onClick={() => {
                            setOpenActionComment(false)
                            setEditComment(true)
                            setValue('content', comment_reply?.content)
                          }}
                        >
                          Chinh sửa
                        </div>
                        <div
                          className='w-full cursor-pointer px-3 py-1 font-medium text-black hover:bg-slate-200'
                          onClick={() => handleClickDeleteComment(comment_reply.id)}
                        >
                          Xóa
                        </div>
                      </>
                    )}
                    {comment_reply.user_id !== profile?.user_id && (
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

export default React.memo(CommnetReplyItem)
