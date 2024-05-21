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
