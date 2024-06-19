interface CommentVideoItemResponse extends SuccessResponse {
  data: Array<CommentVideoItem>
}

interface CommentVideoItem {
  content: string
  createdAt: Date
  id: string
  mentioned_user_id: string
  parent_id: string
  updatedAt: Date
  user: {
    Profile: {
      cover_photo: string
    }
    first_name: string
    last_name: string
    user_id: string
  }
  user_id: string
  video_id: string
  like_count: number
  isLike: number
  reply_count: number
}

interface CommentVideoPartentItemResponse extends SuccessResponse {
  data: Array<Omit<CommentVideoItem, 'children_count'>>
}
