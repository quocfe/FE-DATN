type Post = {
  post_id: string
  content: string
  privary: string
  location: string
  post_type: string
  user_id: string
  createdAt: string
  media_resources: PostMediaResource[]
  comments: PostComment[]
  reactions: PostReaction[]
  author: {
    user_id: string
    first_name: string
    last_name: string
    Profile: BaseProfile
  }
}

type PostResponse = SuccessResponse<{
  posts: Post[]
  pages: number
  total: number
}>
