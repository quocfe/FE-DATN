import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import PostItem from './components/PostItem'
import Loading from '../Loading'
import useMessageFixStore from '~/store/messageFix.store'

interface Props {
  posts: Post[]
  fanpage?: { group_name: string; image_url: string | null }
}

function Post({ posts, fanpage }: Props) {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  return (
    <>
      {isFetching + isMutating !== 0 && <Loading />}
      <div className='flex flex-col gap-5 text-sm font-medium'>
        {posts.map((post) => (
          <PostItem key={post.post_id} post={post} fanpage={fanpage} />
        ))}
      </div>
    </>
  )
}

export default Post
