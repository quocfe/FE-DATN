import { LikeVideoType } from '~/constants'

interface GetLikeVideoItemResponse extends SuccessResponse {
  data: {
    isLike: boolean
    list_like: Array<LikeVideoItem>
  }
}

interface LikeVideoItem {
  comment_id: string
  createdAt: Date
  id: string
  like_type: LikeVideoType
  updatedAt: Date
  user_id: string
  video_id: string
}
