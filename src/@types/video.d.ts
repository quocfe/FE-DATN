interface VideoCreateResponse extends SuccessResponse {
  data: {
    message: string
  }
}

interface VideoResponse extends SuccessResponse {
  data: VideoResponse

  content: Array<DataVideoResponse>
  limit: number
  page: number
  total: number
  totalRecords: number
}

interface DataVideoResponse {
  category_video_id: string
  content: string
  createdAt: Date
  id: string
  privacy: string
  public_id: string
  tag: string
  updatedAt: Date
  url: string
  user_id: string
  view: number
  duration: number
  total_comments: number
  user: {
    user_id: string
    first_name: string
    last_name: string
    Profile: {
      cover_photo: string
    }
  }
  total_likes: number
  isLike: boolean
}

interface VideoDetailResponse extends SuccessResponse {
  data: VideoDetail
}

interface VideoDetail {
  category_video_id: string
  content: string
  createdAt: Date
  id: string
  privacy: string
  public_id: string
  tag: string
  updatedAt: Date
  url: string
  user_id: string
  view: number
  user: {
    first_name: string
    last_name: string
    Profile: {
      cover_photo: string
    }
  }
  like_count: number
  isLike: number
}
