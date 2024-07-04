/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '~/utils/http'

const LIKE_VIDEO_PATH = {
  PATCH_FAVORITE_VIDEO: '/favorite-video'
}

class favoriteVideoApi {
  getFavoriteVideos() {
    return http.get<FavoriteVideoResponse>(LIKE_VIDEO_PATH.PATCH_FAVORITE_VIDEO)
  }

  getFavoriteVideo(video_id: string) {
    return http.get<any>(LIKE_VIDEO_PATH.PATCH_FAVORITE_VIDEO + `/${video_id}`)
  }

  patchFavoriteVideo(video_id: string) {
    return http.patch<any>(LIKE_VIDEO_PATH.PATCH_FAVORITE_VIDEO + `/${video_id}`)
  }
}

export default new favoriteVideoApi()
