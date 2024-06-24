type User = {
  user_id: string
  first_name: string
  last_name: string
  email: string
  gender: number
}

type Profile = {
  profile_id: string
  phone_number: string
  date_of_birth: string
  biography: string
  profile_picture: string
  cover_photo: string
  home_town: string
  education: string
  relationship_status?: number
  job: string
  alias: string
  user_id: string
}

type Interest = {
  interest_id: string
  interest_name: string
}

type UserProfile = User & {
  Profile: Profile
  Interests: Interest[]
}

type UpdateProfile = {
  phone_number?: string
  date_of_birth?: string
  biography?: string
  profile_picture?: string
  cover_photo?: string
  home_town?: string
  education?: string
  relationship_status?: number
  job?: string
  alias?: string
}

type ProfileResponse = SuccessResponse<{
  user: UserProfile
}>

type ProfilePublicResponse = SuccessResponse<{
  user: UserProfile
  relationship: { user_id: string; friend_id: string; status: string } | null
}>

type UserListReponse = SuccessResponse<{
  users: UserCompact[]
  friends: UserCompact[]
}>

// user đơn giản
type UserCompact = {
  user_id: string
  first_name: string
  last_name: string
  Profile: null | {
    profile_picture: string
    cover_photo: string
  }
}

type UserCompactWithStatus = UserCompact & {
  status: string
}

type ChangePassword = {
  old_password: string
  new_password: string
}

type SearchHistory = SuccessResponse<{
  list: UserCompactWithStatus[]
}>
