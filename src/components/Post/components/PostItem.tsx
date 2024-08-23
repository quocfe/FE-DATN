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
import useQueryPostComments from '~/hooks/queries/postComment/useQueryPostComments'
import useQueryPostReactions from '~/hooks/queries/postReaction/useQueryPostReactions'
import { Link, useParams } from 'react-router-dom'
import Modal from '~/components/Modal'
import useMutationUpdatePost from '~/hooks/mutations/post/useMutationUpdatePost'

interface Props {
  post: Post
  isCommentDetail?: boolean
  fanpage?: { group_name: string; image_url: string | null }
}

function PostItem({ post, isCommentDetail = false, fanpage }: Props) {
  const { user_id } = useParams()
  const [isEditPrivary, setIsEditPrivary] = useState<boolean>(false)
  const [isDeletePost, setIsDeletePost] = useState<boolean>(false)
  const [editComment, setEditComment] = useState<PostComment | null>(null)
  const [replyPostComment, setReplyPostComment] = useState<PostComment | null>(null)
  const [replyPostCommentReply, setReplyPostCommentReply] = useState<PostCommentReply | null>(null)
  const { profile } = useAuthStore()
  const { author, media_resources, privary } = post
  const [privaryy, setPrivaryy] = useState<string>(privary)

  // React Query
  const queryClient = useQueryClient()
  const deletePostMutation = useMutationDeletePost()
  const { data: resPostComments } = useQueryPostComments(post.post_id)
  const { data: resPostReactions } = useQueryPostReactions(post.post_id)
  const postUpdateMutation = useMutationUpdatePost()

  // get data react query
  const comments = resPostComments?.data.data.comments ?? []
  const reactions = resPostReactions?.data.data.reactions ?? []

  // Hiển thị chế độ bài viết
  const renderPrivary = () => {
    return privary === 'public' ? 'Công khai' : privary === 'friends' ? 'Bạn bè' : 'Chỉ mình tôi'
  }

  // kiểm tra đã tương tác với bài viết này chưa
  const userReaction = reactions.find((reaction) => reaction.user_id === profile?.user_id)
  const hasReacted = Boolean(userReaction)
  const userReactionType = userReaction ? userReaction.type : null

  // Xóa bài viết
  const handleDeletePost = () => {
    deletePostMutation.mutate(post.post_id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['my_posts'] })
        queryClient.invalidateQueries({ queryKey: ['my_media_resources'] })
        queryClient.invalidateQueries({ queryKey: ['posts_from_friends_and_pending_requests'] })
        toast.success('Xóa bài đăng thành công')
      }
    })
  }

  const handleSetPrivary = (type: 'public' | 'friends' | 'private') => {
    setPrivaryy(type)
  }

  const handleUpdatePrivary = () => {
    const data = {
      post_id: post.post_id,
      data: {
        privary: privaryy
      }
    }
    postUpdateMutation.mutate(data, {
      onSuccess: () => {
        setIsEditPrivary(false)
        toast.success('Cập nhật bài viết thành công!')
        if (user_id) {
          queryClient.invalidateQueries({ queryKey: ['user_posts', { user_id }] })
        } else {
          queryClient.invalidateQueries({ queryKey: ['my_media_resources'] })
          queryClient.invalidateQueries({ queryKey: ['my_posts'] })
          queryClient.invalidateQueries({ queryKey: ['posts_from_friends_and_pending_requests'] })
        }
      }
    })
  }

  return (
    <>
      <Modal isVisible={isEditPrivary} onClose={() => setIsEditPrivary(false)}>
        <div className='mt-12 p-4'>
          <h1 className='text-center text-xl'>Chọn đối tượng</h1>
          <ul className='flex flex-col gap-5'>
            <li>
              <label onClick={() => handleSetPrivary('public')}>
                <input
                  checked={privaryy === 'public'}
                  type='radio'
                  name='radio-status'
                  id='monthly1'
                  className='peer hidden appearance-none'
                />
                <div className=' dark:bg-dark3 relative flex cursor-pointer items-center justify-between rounded-md p-2 px-3 hover:bg-secondery peer-checked:[&_.active]:block'>
                  <div className='flex items-center gap-3 text-sm'>
                    <img
                      src='https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/KV7QFf-Yspp.png?_nc_eui2=AeHfVV5-0PK2RC7e1X7rxQG3ZBJ6bsdKgsJkEnpux0qCwpzz1J89CsIrtJ1zc2rbXLU-dbBuCcnzXP8kgWqTBIK-'
                      alt=''
                      className='h-[24px] w-[24px]'
                    />
                    <div>
                      <div>Công khai</div>
                      <p>Bất kỳ ai ở trên facebook</p>
                    </div>
                  </div>
                  <IonIcon
                    icon='checkmark-circle'
                    className='active uk-animation-scale-up absolute right-2 hidden -translate-y-1/2 text-2xl text-blue-600'
                  />
                </div>
              </label>
            </li>
            <li>
              <label onClick={() => handleSetPrivary('friends')}>
                <input
                  checked={privaryy === 'friends'}
                  type='radio'
                  name='radio-status'
                  id='monthly1'
                  className='peer hidden appearance-none'
                />
                <div className=' dark:bg-dark3 relative flex cursor-pointer items-center justify-between rounded-md p-2 px-3 hover:bg-secondery peer-checked:[&_.active]:block'>
                  <div className='flex items-center gap-3 text-sm'>
                    <img
                      src='https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/S__jp-Cgqt_.png?_nc_eui2=AeE57Lvo8DSJh4CwiTD1EyhCfQZGpCf2N7V9BkakJ_Y3tXgcfOZHKH8FviwBObsGCq28OxXvruUQCwPmc-iHKaqd'
                      alt=''
                    />
                    <div>
                      <div>Bạn bè</div>
                      <p>Bạn bè của bạn trên facebook</p>
                    </div>
                  </div>
                  <IonIcon
                    icon='checkmark-circle'
                    className='active uk-animation-scale-up absolute right-2 hidden -translate-y-1/2 text-2xl text-blue-600'
                  />
                </div>
              </label>
            </li>
            <li>
              <label onClick={() => handleSetPrivary('private')}>
                <input
                  checked={privaryy === 'private'}
                  type='radio'
                  name='radio-status'
                  id='monthly1'
                  className='peer hidden appearance-none'
                />
                <div className=' dark:bg-dark3 relative flex cursor-pointer items-center justify-between rounded-md p-2 px-3 hover:bg-secondery peer-checked:[&_.active]:block'>
                  <div className='flex items-center gap-3 text-sm'>
                    <img
                      src='https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/JgqJqE4kFfK.png?_nc_eui2=AeGQtHR3I7Sbnu9xQ4pakLzqi1Mao9O5Cl2LUxqj07kKXTHRDy4fcQttHrbND-qKPaH2hglb5Y-y_ynU21AYX6Yc'
                      alt=''
                    />
                    <div>
                      <div>Chỉ mình tôi</div>
                      <p>Chỉ riêng bạn mới thấy</p>
                    </div>
                  </div>
                  <IonIcon
                    icon='checkmark-circle'
                    className='active uk-animation-scale-up absolute right-2 hidden -translate-y-1/2 text-2xl text-blue-600'
                  />
                </div>
              </label>
            </li>
          </ul>
          <div className='mt-4 flex justify-end gap-8'>
            <button onClick={() => setIsEditPrivary(false)}>Hủy</button>
            <button onClick={handleUpdatePrivary} className='rounded-md bg-primary px-5 py-2 text-white'>
              Xác nhận
            </button>
          </div>
        </div>
      </Modal>
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
          <Link to={profile?.user_id === post.user_id ? '/profile' : `/profile/${post.user_id}`}>
            <img
              src={fanpage ? (fanpage.image_url ?? '') : author?.Profile.profile_picture}
              alt=''
              className='h-9 w-9 rounded-full object-cover'
            />
          </Link>
          <div className='flex-1'>
            <Link to={profile?.user_id === post.user_id ? '/profile' : `/profile/${post.user_id}`}>
              <h4 className='text-black dark:text-white'>
                {fanpage ? fanpage.group_name : `${author?.last_name} ${author?.first_name}`}
              </h4>
            </Link>
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
                <a className='cursor-pointer'>
                  <IonIcon className='shrink-0 text-xl' icon='document-text-outline'></IonIcon>
                  Chỉnh sửa bài viết
                </a>
                <a className='cursor-pointer'>
                  <IonIcon className='shrink-0 text-xl' icon='code-slash-outline' /> Ghim bài viết
                </a>
                <a onClick={() => setIsEditPrivary(true)} className='flex w-full cursor-pointer items-center gap-2 '>
                  <IonIcon className='shrink-0 text-xl' icon='settings-outline'></IonIcon>
                  Chỉnh sửa đối tượng
                </a>
                <a className='cursor-pointer'>
                  <IonIcon className='shrink-0 text-xl' icon='share-outline' /> Chia sẻ bài viết
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
          setReplyPostCommentReply={setReplyPostCommentReply}
        />
        <PostAddComment
          post_id={post.post_id}
          isCommentDetail={isCommentDetail}
          editComment={editComment}
          setEditComment={setEditComment}
          replyPostComment={replyPostComment}
          setReplyPostComment={setReplyPostComment}
          replyPostCommentReply={replyPostCommentReply}
          setReplyPostCommentReply={setReplyPostCommentReply}
        />
      </div>
    </>
  )
}

export default PostItem
