type Role = {
  role_id: string
  name: string
  description: string
  accounts: {
    username: string
    profile_picture: string
  }[]
}

type RoleResponse = SuccessResponse<{
  roles: Role[]
}>
