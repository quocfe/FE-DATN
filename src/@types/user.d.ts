interface BaseUser {
  user_id: string
  first_name: string
  last_name: string
  profile_picture?: string
  username?: string
}

interface BaseProfile {
  profile_picture: string
  cover_photo: string
}

type User = BaseUser & {
  email: string
  gender: number
  role?: {
    role_id: string
    name: string
    description: string
  }
  modules: ?ModulePermission[]
}

type Profile = BaseProfile & {
  profile_id: string
  phone_number: string
  date_of_birth: string
  biography: string
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
  pages: number | string
  total: number | string
}>

type UserCompact = BaseUser & {
  Profile: null | BaseProfile
  CommonFriends: UserCompact[]
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

type UserConfigParams = {
  _page: string
  _limit: string
}
