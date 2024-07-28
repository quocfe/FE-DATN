interface ResponseCheckReportVideo extends SuccessResponse {
  data: CheckReportVideo
}

interface CheckReportVideo {
  isReport: boolean
}

interface PatchReportVideo {
  id?: string
  video_id?: string
  user_id?: string
  updatedAt?: Date
  createdAt?: Date
}
