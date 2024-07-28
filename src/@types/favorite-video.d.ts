interface FavoriteVideoResponse extends SuccessResponse {
  data: Array<DataFavoriteVideoResponse>
}

interface DataFavoriteVideoResponse {
  id: string
  createdAt: Date
  video: DataVideoResponse
}
