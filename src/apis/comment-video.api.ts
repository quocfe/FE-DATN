/* eslint-disable @typescript-eslint/no-explicit-any */
// import { GetLikeVideoItemResponse } from '~/@types/like-video'
import { CommentVideoFromSchema } from '~/pages/WatchDetail/component/add-comment-video/utils/validation'
import http from '~/utils/http'

const COMMENT_VIDEO_PATH = {
  COMMENT_VIDEO_ITEM: '/comment-video',
  COMMENT_VIDEO_PARTENT_ITEM: '/comment-video/partent'
}

class CommentVideoApi {
  getCommentVideoItem(video_id: string) {
    return http.get<CommentVideoItemResponse>(COMMENT_VIDEO_PATH.COMMENT_VIDEO_ITEM + '/' + video_id)
  }

  postCommentVideo(video_id: string, data: Pick<CommentVideoFromSchema, 'content' | 'reply_id'>) {
    return http.post<any>(COMMENT_VIDEO_PATH.COMMENT_VIDEO_ITEM + '/' + video_id, data)
  }

  getCommentVideoPartent(comment_id: string) {
    return http.get<CommentVideoPartentItemResponse>(COMMENT_VIDEO_PATH.COMMENT_VIDEO_PARTENT_ITEM + '/' + comment_id)
  }

  patchEditCommentVideo(comment_id: string, data: any) {
    return http.patch<any>(COMMENT_VIDEO_PATH.COMMENT_VIDEO_ITEM + '/' + comment_id, data)
  }

  deleteCommentVideo(comment_id: string) {
    return http.delete<any>(COMMENT_VIDEO_PATH.COMMENT_VIDEO_ITEM + '/' + comment_id)
  }
}

export default new CommentVideoApi()
