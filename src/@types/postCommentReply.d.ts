type PostCommentReply = {
  comment_reply_id: string
  content: string
  media_url: string
  comment_id: string
  user_id: string
  replied_to_user_id: string
  createdAt: string
  user_reply: {
    user_id: string
    first_name: string
    last_name: string
    Profile: BaseProfile
  }
  replied_to_user: {
    user_id: string
    first_name: string
    last_name: string
    Profile: BaseProfile
  }
}

type PostCommentReplyResponse = SuccessResponse<{
  comment_replies: PostCommentReply[]
}>
