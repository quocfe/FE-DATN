type SearchAllResponse = SuccessResponse<{
  list: UserCompactWithStatus[]
}>

type Province = {
  province_id: number
  province_name: string
  province_type: string
}

type District = {
  district_id: number
  district_name: string
}