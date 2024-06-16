/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetLikeVideoItemResponse } from '~/@types/like-video'
import http from '~/utils/http'

const LIKE_VIDEO_PATH = {
  GET_LIKE_VIDEOS: '/like-video',
  PATCH_LIKE_VIDEO: '/like-video'
}

class LikeVideoApi {
  getLikeVideo(video_id: string) {
    return http.get<GetLikeVideoItemResponse>(LIKE_VIDEO_PATH.GET_LIKE_VIDEOS + '/' + video_id)
  }

  pathLikeVideo(video_id: string) {
    return http.patch<any>(LIKE_VIDEO_PATH.PATCH_LIKE_VIDEO + '/' + video_id)
  }
}

export default new LikeVideoApi()
