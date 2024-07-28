type PostComment = {
  comment_id: string
  content: string
  media_url: string
  post_id: string
  user_id: string
  createdAt: string
  user_comment: {
    user_id: string
    first_name: string
    last_name: string
    Profile: BaseProfile
  }
  comment_replies: PostCommentReply[]
}

type PostCommentResponse = SuccessResponse<{
  comments: PostComment[]
}>
