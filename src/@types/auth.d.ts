type AuthResponse = SuccessResponse<{
  user: UserProfile
  type: 'client' | 'admin'
  access_token: string
}>

type RegisterResponse = SuccessResponse<{
  to: string
}>
