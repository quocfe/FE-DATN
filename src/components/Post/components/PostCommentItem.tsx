import { IonIcon } from '@ionic/react'
import PostCommentReplyItem from './PostCommentReplyItem'
import { calculateTimeAgo } from '~/utils/helpers'
import { useState } from 'react'
import useAuthStore from '~/store/auth.store'
import Dialog from '~/components/Dialog'
import useMutationDeletePostComment from '~/hooks/mutations/postComment/useMutationDeletePostComment'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import usePostCommentStore from '~/store/postComment.store'
import classNames from 'classnames'
import useQueryPostCommentRepliesByCommentId from '~/hooks/queries/postCommentReply/useQueryPostCommentRepliesByCommentId'

interface Props {
  comment: PostComment
  editComment: PostComment | null
  setEditComment: React.Dispatch<React.SetStateAction<PostComment | null>>
  setReplyPostComment: React.Dispatch<React.SetStateAction<PostComment | null>>
  setReplyPostCommentReply: React.Dispatch<React.SetStateAction<PostCommentReply | null>>
  isCommentDetail?: boolean
}

function PostCommentItem({
  comment,
  setEditComment,
  isCommentDetail = false,
  setReplyPostComment,
  setReplyPostCommentReply
}: Props) {
  const [visibleCount, setVisibleCount] = useState<number>(2)
  const { setSelectedFile } = usePostCommentStore()
  const { profile } = useAuthStore()
  const [isOptions, setIsOption] = useState<boolean>(false)
  const [showDialogDeleteComment, setShowDialogDeleteComment] = useState<boolean>(false)
  const { user_comment } = comment

  // React Query
  const queryClient = useQueryClient()
  const { data: resPostCommentReply } = useQueryPostCommentRepliesByCommentId(comment.comment_id)
  const deletePostCommentMutation = useMutationDeletePostComment()

  const comment_replies = resPostCommentReply?.data.data.comment_replies ?? []

  // Xử lý xem thêm trả bình luận
  const handleShowMoreCommentReplies = () => {
    setVisibleCount((prevCount) => prevCount + 2)
  }

  // Xóa bình luận bài đăng
  const handleDeletePostComment = () => {
    deletePostCommentMutation.mutate(comment.comment_id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['post_comments', { post_id: comment.post_id }] })
        toast.success('Xóa bình luận thành công')
        setIsOption(false)
      }
    })
  }

  // Chỉnh sửa bình luận bài đăng
  const handleEditPostComment = () => {
    setSelectedFile(null)
    setReplyPostComment(null)
    setReplyPostCommentReply(null)
    setEditComment(comment)
  }

  // Phản hồi bình luận bài đăng
  const handleReylyPostComment = () => {
    setSelectedFile(null)
    setEditComment(null)
    setReplyPostCommentReply(null)
    setReplyPostComment(comment)
  }

  return (
    <>
      <Dialog
        isVisible={showDialogDeleteComment}
        onClose={() => setShowDialogDeleteComment(false)}
        type='warning'
        title={`Chắc chắn xóa bình luận này!`}
        description='Bạn có chắc chắn muốn xóa bình luận này không? Hành động này không thể hoàn tác, và bình luận sẽ bị xóa vĩnh viễn khỏi bài viết. Khi bình luận bị xóa, toàn bộ phản hồi và tương tác liên quan đến bình luận này cũng sẽ biến mất.'
        textBtn='Xóa bình luận'
        callback={handleDeletePostComment}
      />
      <div className={classNames('relative flex items-start gap-3')} id={comment.comment_id}>
        <a href='timeline.html'>
          <img
            src={user_comment.Profile.profile_picture}
            alt=''
            className='mt-1 h-6 w-6 rounded-full object-cover object-center'
          />
        </a>
        <div>
          <div className='relative rounded-md px-3 py-2 shadow-sm' style={{ backgroundColor: 'rgb(250 250 250)' }}>
            <a href='timeline.html' className='inline-block font-medium text-black dark:text-white'>
              {user_comment.last_name} {user_comment.first_name}
            </a>
            <div>
              <p className='mt-0.5'>{comment.content}</p>
              <div className='relative mt-1.5 w-[300px] cursor-pointer rounded-md shadow-sm'>
                {comment.media_url && comment.media_url !== '' && (
                  <>
                    {comment.media_url.includes('mp4') ? (
                      <video src={comment.media_url} className='w-full object-cover' controls></video>
                    ) : (
                      <img src={comment.media_url} alt='' className='h-full w-full object-cover' />
                    )}
                  </>
                )}
              </div>
            </div>
            {profile && profile.user_id === comment.user_id && (
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
                    <li
                      onClick={handleEditPostComment}
                      className='cursor-pointer rounded-md px-5 py-1  hover:bg-gray-50 hover:bg-primary-soft hover:text-primary'
                    >
                      Chỉnh sửa
                    </li>
                    <li
                      onClick={() => setShowDialogDeleteComment(true)}
                      className='cursor-pointer rounded-md px-5 py-1 hover:bg-gray-50 hover:bg-red-50 hover:text-red-600 hover:transition-all'
                    >
                      Xóa
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
          <div className='mb-2 mt-2 flex gap-3'>
            <div className='cursor-pointer'>{calculateTimeAgo(comment.createdAt)}</div>
            <div className='cursor-pointer'>Thích</div>
            <div className='cursor-pointer hover:text-primary' onClick={handleReylyPostComment}>
              Phản hồi
            </div>
          </div>
          {/* Trả lời bình luận */}
          <div className='ml-1.5 mt-2'>
            {isCommentDetail === false ? (
              <>
                {comment_replies.slice(0, visibleCount).map((comment_reply) => (
                  <PostCommentReplyItem
                    key={comment_reply.comment_reply_id}
                    comment_reply={comment_reply}
                    setReplyPostCommentReply={setReplyPostCommentReply}
                    setEditComment={setEditComment}
                    setReplyPostComment={setReplyPostComment}
                  />
                ))}
                {comment_replies.length - visibleCount > 0 && (
                  <button
                    onClick={handleShowMoreCommentReplies}
                    type='button'
                    className='ml-8 mt-2 flex items-center gap-1.5 text-gray-500 hover:text-blue-500'
                  >
                    <IonIcon
                      icon='chevron-down-outline'
                      className='ml-auto duration-200 group-aria-expanded:rotate-180'
                    />
                    Xem thêm {comment_replies.length - visibleCount} bình luận khác
                  </button>
                )}
              </>
            ) : (
              <>
                {comment_replies.map((comment_reply) => (
                  <PostCommentReplyItem
                    key={comment_reply.comment_reply_id}
                    comment_reply={comment_reply}
                    setReplyPostCommentReply={setReplyPostCommentReply}
                    setEditComment={setEditComment}
                    setReplyPostComment={setReplyPostComment}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PostCommentItem
