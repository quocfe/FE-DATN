interface FavoriteVideoResponse extends SuccessResponse {
  data: Array<DataFavoriteVideoResponse>
}

interface DataFavoriteVideoResponse {
  isFavorite: boolean
}
