import { IonIcon } from '@ionic/react'
import PostCommentItem from './PostCommentItem'
import { useState } from 'react'
import classNames from 'classnames'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import Loading from '~/components/Loading'

interface Props {
  comments: PostComment[]
  isCommentDetail?: boolean
  editComment: PostComment | null
  setEditComment: React.Dispatch<React.SetStateAction<PostComment | null>>
  setReplyPostComment: React.Dispatch<React.SetStateAction<PostComment | null>>
  setReplyPostCommentReply: React.Dispatch<React.SetStateAction<PostCommentReply | null>>
}

function PostComment({
  comments,
  isCommentDetail = false,
  editComment,
  setEditComment,
  setReplyPostComment,
  setReplyPostCommentReply
}: Props) {
  const [visibleCount, setVisibleCount] = useState<number>(2)

  // Xử lý xem thêm bình luận
  const handleShowMoreComments = () => {
    setVisibleCount((prevCount) => prevCount + 2)
  }

  return (
    <div
      className={classNames(
        'relative space-y-3 border-t border-gray-100 p-2.5 font-normal sm:p-4 dark:border-slate-700/40',
        {
          'mb-16': isCommentDetail
        }
      )}
    >
      {isCommentDetail === false ? (
        <>
          {comments.slice(0, visibleCount).map((comment) => (
            <PostCommentItem
              key={comment.comment_id}
              comment={comment}
              editComment={editComment}
              setEditComment={setEditComment}
              setReplyPostComment={setReplyPostComment}
              setReplyPostCommentReply={setReplyPostCommentReply}
            />
          ))}
          {comments.length === 0 ? (
            <div className='text-center'>Chưa có bình luận nào cho bài đăng này</div>
          ) : (
            comments.length - visibleCount > 0 && (
              <button
                onClick={handleShowMoreComments}
                type='button'
                className='mt-2 flex items-center gap-1.5 text-gray-500 hover:text-blue-500'
              >
                <IonIcon icon='chevron-down-outline' className='ml-auto duration-200 group-aria-expanded:rotate-180' />
                Xem thêm {comments.length - visibleCount} bình luận khác
              </button>
            )
          )}
        </>
      ) : (
        <>
          {comments.map((comment) => (
            <PostCommentItem
              key={comment.comment_id}
              comment={comment}
              editComment={editComment}
              isCommentDetail={isCommentDetail}
              setEditComment={setEditComment}
              setReplyPostComment={setReplyPostComment}
              setReplyPostCommentReply={setReplyPostCommentReply}
            />
          ))}
          {comments.length === 0 && <div className='text-center'>Chưa có bình luận nào cho bài đăng này</div>}
        </>
      )}
    </div>
  )
}

export default PostComment
