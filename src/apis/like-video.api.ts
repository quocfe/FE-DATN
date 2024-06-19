/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetLikeCountVideoItemResponse, GetLikeVideoItemResponse } from '~/@types/like-video'
import http from '~/utils/http'

const LIKE_VIDEO_PATH = {
  GET_LIKE_VIDEOS: '/like-video',
  GET_LIKE_COUNT_VIDEO: '/like-video/count',
  PATCH_LIKE_VIDEO: '/like-video'
}

class LikeVideoApi {
  getLikeVideo(video_id: string) {
    return http.get<GetLikeVideoItemResponse>(LIKE_VIDEO_PATH.GET_LIKE_VIDEOS + '/' + video_id)
  }

  getLikeCountVideo(video_id: string) {
    return http.get<GetLikeCountVideoItemResponse>(LIKE_VIDEO_PATH.GET_LIKE_COUNT_VIDEO + '/' + video_id)
  }

  pathLikeVideo(video_id: string, comment_id?: string) {
    return http.patch<any>(LIKE_VIDEO_PATH.PATCH_LIKE_VIDEO + '/' + video_id, { comment_id })
  }
}

export default new LikeVideoApi()
