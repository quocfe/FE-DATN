/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '~/utils/http'

const REPORT_VIDEO_PATH = {
  CHECK_REPORT: '/report-video/check',
  PATCH_REPORT: '/report-video'
}

class ReportVideoApi {
  checkReport(video_id: string) {
    return http.post<ResponseCheckReportVideo>(REPORT_VIDEO_PATH.CHECK_REPORT + '/' + video_id)
  }

  pathReport(video_id: string, reason?: Array<string>) {
    // return http.patch<ResponsePatchReportVideo>(REPORT_VIDEO_PATH.PATCH_REPORT + '/' + video_id, {
    //   reason
    // })
    return http.patch<any>(REPORT_VIDEO_PATH.PATCH_REPORT + '/' + video_id, {
      reason
    })
  }
}

export default new ReportVideoApi()
