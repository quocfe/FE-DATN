import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import commentVideoSchema, { CommentVideoFromSchema } from '../utils/comment-reply'
import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query'
import commentVideoApi from '~/apis/comment-video.api'
import FormAddCommentReply from './form-add-comment-reply'
import CommentItem from './comment-item'
import CommnetReplyItem from './commnet-reply-item'

interface CommnetVideoItemProps {
  comment: CommentVideoItem
  refetchComment: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<CommentVideoItem[], Error>>
}

const Comment = ({ comment, refetchComment }: CommnetVideoItemProps) => {
  const { id: video_id } = useParams()

  const [openReply, setOpenReply] = useState<boolean>(false)

  const refInputContent = useRef<HTMLInputElement>(null)

  const handClickReply = (parent_id: string, reply_id: string, reply_name: string) => {
    setValue('reply_id', reply_id)
    setValue('reply_name', reply_name)
    setValue('parent_id', parent_id)
    setOpenReply(true)
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset: resetFormCommentReply
  } = useForm<CommentVideoFromSchema>({
    resolver: yupResolver(commentVideoSchema)
  })

  const {
    mutate: getCommentPartent,
    data: commentPartents,
    isSuccess: isSuccessCommentParent
  } = useMutation({
    mutationFn: async () => {
      const res = await commentVideoApi.getCommentVideoPartent(comment.id)
      return res.data.data
    },
    onSuccess: (data) => {
      setOpenReply(true)
      return data
    }
  })

  const { mutate: handleAddComment } = useMutation({
    mutationFn: async (data: CommentVideoFromSchema) => {
      const res = await commentVideoApi.postCommentVideo(video_id as string, data)
      return res.data.data
    },
    onSuccess: (data) => {
      resetFormCommentReply()
      if (data.id === comment.id) {
        getCommentPartent()
      }
      isSuccessCommentParent && getCommentPartent()
      return refetchComment()
    }
  })

  return (
    <div className='relative mt-5'>
      <CommentItem refetchComment={refetchComment} comment={comment} commentPartents={commentPartents} handClickReply={handClickReply} />

      {isSuccessCommentParent ||
        (comment?.children_count > 0 && (
          <div className='relative flex h-[36px] items-center gap-x-2 px-[23px]'>
            <div
              className='h-3 w-[32px] -translate-y-1/3 border-b-[2px]'
              style={{
                borderBottomLeftRadius: '10px',
                borderLeftStyle: 'solid',
                borderLeftWidth: '2px',
                borderBottomColor: '#F0F2F5'
              }}
            ></div>
            <div className='  '>
              <button
                className='text-sm font-semibold'
                onClick={() => {
                  setValue('parent_id', comment.id)
                  getCommentPartent()
                }}
              >
                Xem tất cả <span>{comment.children_count}</span> phản hồi
              </button>
            </div>
          </div>
        ))}
      {isSuccessCommentParent &&
        commentPartents.map((item) => {
          return (
            <CommnetReplyItem
              key={item.id}
              item={item}
              comment={comment}
              handClickReply={handClickReply}
              getCommentPartent={getCommentPartent}
            />
          )
        })}

      {openReply && (
        <FormAddCommentReply
          handleSubmit={handleSubmit}
          handleAddComment={handleAddComment}
          register={register}
          watch={watch}
          refInputContent={refInputContent}
        />
      )}
    </div>
  )
}

export default Comment
