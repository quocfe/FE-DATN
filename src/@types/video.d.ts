interface VideoCreateResponse extends SuccessResponse {
  data: {
    message: string
  }
}

interface VideoResponse extends SuccessResponse {
  data: Array<DataVideoResponse>
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
  user: {
    first_name: string
    last_name: string
  }
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
}
