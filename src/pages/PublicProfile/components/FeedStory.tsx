import { IonIcon } from '@ionic/react'
import { useParams } from 'react-router-dom'
import Post from '~/components/Post'
import useQueryListUserPosts from '~/hooks/queries/post/useQueryListUserPosts'

function FeedStory() {
  const { user_id } = useParams()
  const { data } = useQueryListUserPosts(user_id ?? '')

  // Danh sách bài đăng của người dùng
  const posts = data?.data.data.posts ?? []

  return (
    <div className='flex-1 space-y-3 xl:space-y-6'>
      {/* Danh sách bài viết  */}
      {posts.length !== 0 ? (
        <Post posts={posts} />
      ) : (
        <div className='py-5 text-center text-sm'>Chưa có bài đăng nào!</div>
      )}
    </div>
  )
}

export default FeedStory
