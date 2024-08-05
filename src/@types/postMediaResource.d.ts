type PostMediaResource = {
  media_id: string
  post_id: string
  media_url: string
  media_type: string
}

type MediaResourceResponse = SuccessResponse<{
  media_resources: PostMediaResource[]
}>
