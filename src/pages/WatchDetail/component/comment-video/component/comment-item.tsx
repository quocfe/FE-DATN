import { IonIcon } from '@ionic/react'
import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import commentVideoApi from '~/apis/comment-video.api'
import { useConfirm } from '~/components/design-systems/comfirm/confirm-provider'
import { cn } from '~/helpers'
import { useOnClickOutside } from '~/hooks/useOnClickOutside'
import useAuthStore from '~/store/auth.store'

interface CommentItemProps {
  commentPartents: Omit<CommentVideoItem, 'children_count'>[] | undefined
  comment: CommentVideoItem
  handClickReply: (parent_id: string, reply_id: string, reply_name: string) => void
  refetchComment: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<CommentVideoItem[], Error>>
}

const CommentItem = ({ commentPartents, refetchComment, comment, handClickReply }: CommentItemProps) => {
  const [openActionComment, setOpenActionComment] = useState<boolean>(false)

  const { profile } = useAuthStore()

  const refActionComment = useRef(null)

  const coreConfirm = useConfirm()

  useOnClickOutside(refActionComment, () => {
    setOpenActionComment(false)
  })

  const { mutate: deleteCommentPartent } = useMutation({
    mutationFn: async () => {
      const res = await commentVideoApi.deleteCommentVideo(comment.id)
      return res.data.data
    },
    onSuccess: (data) => {
      refetchComment()
      return data
    }
  })

  const handleClickDeleteComment = () => {
    coreConfirm({
      title: 'Xóa bình luận?',
      confirmOk: 'Xóa',
      confirmCancel: 'Không',
      content: 'Bạn có chắc chắn muốn xóa bình luận này không?',
      callbackOK: () => {
        deleteCommentPartent()
      }
    })
  }

  const heightBrear = commentPartents ? 'calc(100% - 50px)' : 'calc(100% - 61px)'

  return (
    <>
      <div
        className={cn('absolute left-[23px] top-[32px] w-[1px] bg-[#F0F2F5]')}
        style={{
          height: heightBrear
        }}
      ></div>
      <div className='flex items-start space-x-2 px-2'>
        <img src={comment?.user?.Profile.cover_photo} alt='profile' className='h-8 w-8 rounded-full' />
        <div className='group flex max-w-max gap-2'>
          <div className=''>
            <div className='w-[350px] rounded-lg bg-gray-100 px-4 py-1'>
              <span className='text-sm font-medium text-black'>{comment?.user?.first_name}</span>
              <div className='text-sm font-normal text-[#050505]'>{comment?.content}</div>
            </div>
            <div className='flex gap-3 px-4 pt-1 text-[12px]'>
              <span>16 giờ</span>
              <button className='hover:text-blue-500'>Thích</button>
              <button
                className='hover:text-blue-500'
                onClick={() => handClickReply(comment.id, comment.user_id, comment.user.first_name)}
              >
                Phản hồi
              </button>
            </div>
          </div>
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
                <div
                  className='w-full cursor-pointer px-3 py-1 font-medium text-black hover:bg-slate-200'
                  onClick={handleClickDeleteComment}
                >
                  Xóa
                </div>
                <div className='w-full cursor-pointer px-3 py-1 font-medium text-black hover:bg-slate-200'>
                  Chỉnh sửa bình luận
                </div>
                {comment.user_id !== profile?.user_id && (
                  <div className='w-full cursor-pointer px-3 py-1 font-medium text-black hover:bg-slate-200'>
                    Báo cáo bình luận
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentItem
