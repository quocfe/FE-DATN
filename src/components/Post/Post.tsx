import PostItem from './components/PostItem'

interface Props {
  posts: Post[]
  fanpage?: { group_name: string; image_url: string | null }
}

function Post({ posts, fanpage }: Props) {
  return (
    <>
      <div className='flex flex-col gap-5 text-sm font-medium'>
        {posts.map((post) => (
          <PostItem key={post.post_id} post={post} fanpage={fanpage} />
        ))}
      </div>
    </>
  )
}

export default Post
