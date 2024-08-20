interface SuccessResponse<Data> {
  message: string
  data: Data
}

interface ErrorResponse<Data = undefined> {
  message: string
  status: number
  errors?: Data
}

interface ErrorUnauthorizedResponse {
  errors: {
    message: string
    errorName: string
  }
  message: string
  status: number
}
