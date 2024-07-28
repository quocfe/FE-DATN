import PostItem from './components/PostItem'

interface Props {
  posts: Post[]
}

function Post({ posts }: Props) {
  return (
    <div className='flex flex-col gap-5 text-sm font-medium'>
      {posts.map((post) => (
        <PostItem key={post.post_id} post={post} />
      ))}
    </div>
  )
}

export default Post
