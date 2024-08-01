import { IonIcon } from '@ionic/react'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Dialog from '~/components/Dialog'
import useMutationDeletePostCommentReply from '~/hooks/mutations/postCommentReply/useMutationDeletePostCommentReply'
import useAuthStore from '~/store/auth.store'
import usePostCommentStore from '~/store/postComment.store'
import { calculateTimeAgo } from '~/utils/helpers'

interface Props {
  comment_reply: PostCommentReply
  setReplyPostComment: React.Dispatch<React.SetStateAction<PostComment | null>>
  setEditComment: React.Dispatch<React.SetStateAction<PostComment | null>>
  setReplyPostCommentReply: React.Dispatch<React.SetStateAction<PostCommentReply | null>>
}

function PostCommentReplyItem({ comment_reply, setReplyPostComment, setReplyPostCommentReply, setEditComment }: Props) {
  const [isOptions, setIsOption] = useState<boolean>(false)
  const [showDialogDeleteCommentReply, setShowDialogDeleteCommentReply] = useState<boolean>(false)
  const { setSelectedFile } = usePostCommentStore()
  const { profile } = useAuthStore()
  const { comment_reply_id, user_reply, replied_to_user } = comment_reply

  // React Query
  const queryClient = useQueryClient()
  const deletePostCommentReply = useMutationDeletePostCommentReply()

  // Xử lý xóa trả lời bình luận
  const handleDeletePostCommentReply = () => {
    deletePostCommentReply.mutate(comment_reply_id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['post_comment_replies', { comment_id: comment_reply.comment_id }] })
        setShowDialogDeleteCommentReply(false)
        toast.success('Xóa bình luận thành công!')
      }
    })
  }

  // Chỉnh sửa trả lời bình luận bài đăng
  const handleReplyPostCommentReply = () => {
    setReplyPostComment(null)
    setEditComment(null)
    setSelectedFile(null)
    setReplyPostCommentReply(comment_reply)
  }

  return (
    <>
      <Dialog
        isVisible={showDialogDeleteCommentReply}
        onClose={() => setShowDialogDeleteCommentReply(false)}
        type='warning'
        title={`Chắc chắn xóa bình luận này!`}
        description='Bạn có chắc chắn muốn xóa bình luận này không? Hành động này không thể hoàn tác, và bình luận sẽ bị xóa vĩnh viễn khỏi bài viết. Khi bình luận bị xóa, toàn bộ phản hồi và tương tác liên quan đến bình luận này cũng sẽ biến mất.'
        textBtn='Xóa bình luận'
        callback={handleDeletePostCommentReply}
      />
      <div className='relative flex items-start gap-3'>
        <a href='timeline.html'>
          <img
            src={user_reply.Profile.profile_picture}
            alt=''
            className='mt-1 h-6 w-6 rounded-full object-cover object-center'
          />
        </a>
        <div>
          <div className='relative rounded-md px-3 py-2 shadow-sm' style={{ backgroundColor: 'rgb(250 250 250)' }}>
            <a href='timeline.html' className='inline-block font-medium text-black dark:text-white'>
              {user_reply.last_name} {user_reply.first_name}
            </a>
            <div>
              <p className='mt-0.5'>
                <span className='font-medium text-primary'>
                  @{replied_to_user.last_name} {replied_to_user.first_name}
                </span>{' '}
                {comment_reply.content}
              </p>
              {comment_reply.media_url !== '' && (
                <div className='mt-1.5 w-[300px] cursor-pointer overflow-hidden rounded-md shadow-sm'>
                  {comment_reply.media_url && comment_reply.media_url !== '' && (
                    <>
                      {comment_reply.media_url.includes('mp4') ? (
                        <video src={comment_reply.media_url} className='w-full object-cover' controls></video>
                      ) : (
                        <img src={comment_reply.media_url} alt='' className='h-full w-full object-cover' />
                      )}
                    </>
                  )}
                </div>
              )}
              {profile && profile.user_id === comment_reply.user_id && (
                <div className='absolute -right-5 top-2/4'>
                  <IonIcon
                    onClick={() => setIsOption(!isOptions)}
                    className='cursor-pointer'
                    icon='ellipsis-vertical-outline'
                  ></IonIcon>
                  {isOptions && (
                    <ul
                      onMouseLeave={() => setIsOption(false)}
                      className='absolute -top-[140%] left-[150%] w-36 rounded-md bg-white p-2.5 shadow-md'
                    >
                      <li className='cursor-pointer rounded-md px-5 py-1  hover:bg-gray-50 hover:bg-primary-soft hover:text-primary'>
                        Chỉnh sửa
                      </li>
                      <li
                        onClick={() => setShowDialogDeleteCommentReply(true)}
                        className='cursor-pointer rounded-md px-5 py-1 hover:bg-gray-50 hover:bg-red-50 hover:text-red-600 hover:transition-all'
                      >
                        Xóa
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className='mb-2 mt-2 flex gap-3'>
            <div className='cursor-pointer'>{calculateTimeAgo(comment_reply.createdAt)}</div>
            <div className='cursor-pointer'>Thích</div>
            <div className='cursor-pointer hover:text-primary' onClick={handleReplyPostCommentReply}>
              Phản hồi
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostCommentReplyItem
