import useQueryListMyPosts from '~/hooks/queries/post/useQueryListMyPosts'
import PostItem from './PostItem'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useQueryListUserPosts from '~/hooks/queries/post/useQueryListUserPosts'
import useQueryPostsFromFriendsAndPendingRequests from '~/hooks/queries/post/useQueryListPostFriendAndPending'
import useQueryPostComments from '~/hooks/queries/postComment/useQueryPostComments'

interface Props {
  post_id: string
}

function PostCommentDetail({ post_id }: Props) {
  const { pathname } = useLocation()
  const { user_id } = useParams()
  // React Query
  const { data: resMyPosts } = useQueryListMyPosts()
  const { data: resUserPosts } = useQueryListUserPosts(user_id ?? '')
  const { data: resFriendAndPendingPosts } = useQueryPostsFromFriendsAndPendingRequests()

  // Danh sách bài đăng
  const posts =
    user_id && pathname.includes('profile')
      ? resUserPosts?.data?.data?.posts ?? []
      : pathname.includes('profile')
        ? resMyPosts?.data?.data?.posts ?? []
        : resFriendAndPendingPosts?.data?.data?.posts ?? []

  const post = posts.find((post) => post.post_id === post_id)

  if (!post) {
    return <div>Post not found</div>
  }

  const { data: resPostComments } = useQueryPostComments(post_id)
  const comments = resPostComments?.data.data.comments ?? []

  const [lastCommentId, setLastCommentId] = useState<string>(comments[0]?.comment_id || '')

  // Xử lý scroll khi có bình luận mới
  useEffect(() => {
    const newCommentId = comments[0]?.comment_id

    if (newCommentId && newCommentId !== lastCommentId) {
      const ref = document.getElementById(newCommentId)
      if (ref) {
        ref.scrollIntoView({ behavior: 'smooth' })
      }
      // Cập nhật trạng thái lastCommentId để so sánh lần sau
      setLastCommentId(newCommentId)
    }
  }, [comments, lastCommentId])

  return (
    <div className='h-[500px] overflow-x-hidden overflow-y-scroll' style={{ scrollbarWidth: 'thin' }}>
      <PostItem post={post} isCommentDetail={true} />
    </div>
  )
}

export default PostCommentDetail
