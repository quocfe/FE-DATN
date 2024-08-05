type Account = {
  account_id: string
  username: string
  email: string
  profile_picture: string
  last_login: string
  phone_number: string
  address: string
  role: {
    role_id: string
    name: string
  }
  modules: {
    module_id: string
    name: string
    permissions: {
      permission_id: string
      name: string
    }[]
  }[]
}

type AccountResponse = SuccessResponse<{
  accounts: Account[]
}>

type AccountUpdate = {
  user?: {
    username?: string
    phone?: string
    address?: string
    role_id?: string
    status?: string
  }
  modules?: {
    name?: string
    permissions?: {
      name?: string
    }[]
  }[]
}
