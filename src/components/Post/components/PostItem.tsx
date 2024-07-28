import { IonIcon } from '@ionic/react'
import PostIcon from './PostIcon'
import PostComment from './PostComment'
import PostAddComment from './PostAddComment'
import PostMediaResource from './PostMediaResource'
import useAuthStore from '~/store/auth.store'
import { calculateTimeAgo } from '~/utils/helpers'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import useMutationDeletePost from '~/hooks/mutations/post/useMutationDeletePost'
import Dialog from '~/components/Dialog'
import { toast } from 'react-toastify'

interface Props {
  post: Post
  isCommentDetail?: boolean
}

function PostItem({ post, isCommentDetail = false }: Props) {
  const [isDeletePost, setIsDeletePost] = useState<boolean>(false)
  const [editComment, setEditComment] = useState<PostComment | null>(null)
  const [replyPostComment, setReplyPostComment] = useState<PostComment | null>(null)
  const { profile } = useAuthStore()
  const { author, reactions, comments, media_resources, privary } = post

  // React Query
  const queryClient = useQueryClient()
  const deletePostMutation = useMutationDeletePost()

  const renderPrivary = () => {
    return privary === 'public' ? 'Công khai' : privary === 'friends' ? 'Bạn bè' : 'Chỉ mình tôi'
  }

  // kiểm tra đã tương tác với bài viết này chưa
  const userReaction = reactions.find((reaction) => reaction.user_id === profile?.user_id)
  const hasReacted = Boolean(userReaction)
  const userReactionType = userReaction ? userReaction.type : null

  const handleDeletePost = () => {
    deletePostMutation.mutate(post.post_id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['my_posts'] })
        toast.success('Xóa bài đăng thành công')
      }
    })
  }

  return (
    <>
      <Dialog
        isVisible={isDeletePost}
        onClose={() => setIsDeletePost(false)}
        title='Chắn chắn xóa bài đăng này!'
        description='Xóa bài đăng này sẽ xóa vĩnh viễn tất cả nội dung liên quan, bao gồm văn bản, hình ảnh, video, và các tệp đính kèm khác. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa bài đăng này không? Vui lòng xác nhận để tiếp tục.'
        callback={handleDeletePost}
        textBtn='Xóa bài đăng'
        type='warning'
      />
      <div className='border1 dark:bg-dark2 rounded-xl bg-white shadow-sm'>
        <div className='flex gap-3 p-2.5 font-medium sm:p-4'>
          <a href='timeline.html'>
            <img src={author?.Profile.profile_picture} alt='' className='h-9 w-9 rounded-full object-cover' />
          </a>
          <div className='flex-1'>
            <a href='timeline.html'>
              <h4 className='text-black dark:text-white'>
                {author?.last_name} {author?.first_name}
              </h4>
            </a>
            <div className='flex items-center gap-2 text-xs text-gray-500 dark:text-white/80'>
              {calculateTimeAgo(post.createdAt)} ({renderPrivary()}){' '}
              {post.location ? (
                <>
                  <span>-</span>
                  <span className='flex gap-1'>
                    <IonIcon icon='location' className='text-sm text-blue-500' /> {post.location}
                  </span>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className='-mr-1'>
            <button type='button' className='button-icon h-8 w-8'>
              <IonIcon className='text-xl' icon='ellipsis-horizontal' />
            </button>
            <div
              className='w-[245px]'
              uk-dropdown='pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: hover'
            >
              <nav>
                <a href='#'>
                  <IonIcon className='shrink-0 text-xl' icon='bookmark-outline' /> Add to favorites
                </a>
                <a href='#'>
                  <IonIcon className='shrink-0 text-xl' icon='notifications-off-outline' /> Mute Notification
                </a>
                <a href='#'>
                  <IonIcon className='shrink-0 text-xl' icon='flag-outline' /> Report this post
                </a>
                <a href='#'>
                  <IonIcon className='shrink-0 text-xl' icon='share-outline' /> Share your profile
                </a>
                <hr />
                {profile && profile.user_id === post.user_id && (
                  <a
                    onClick={() => setIsDeletePost(true)}
                    className='cursor-pointer text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50'
                  >
                    <IonIcon className='shrink-0 text-xl' icon='stop-circle-outline' /> Xóa bài viết
                  </a>
                )}
              </nav>
            </div>
          </div>
        </div>
        <div className='pl-4'>{post.content}</div>
        {post.media_resources.length !== 0 && <PostMediaResource media_resources={media_resources} />}
        {/* post image */}
        <PostIcon
          post_id={post.post_id}
          reactions={reactions}
          commentCount={comments.length}
          hasReacted={hasReacted}
          userReactionType={userReactionType}
        />
        <PostComment
          editComment={editComment}
          setEditComment={setEditComment}
          comments={comments}
          isCommentDetail={isCommentDetail}
          setReplyPostComment={setReplyPostComment}
        />
        <PostAddComment
          post_id={post.post_id}
          isCommentDetail={isCommentDetail}
          editComment={editComment}
          setEditComment={setEditComment}
          replyPostComment={replyPostComment}
          setReplyPostComment={setReplyPostComment}
        />
      </div>
    </>
  )
}

export default PostItem
