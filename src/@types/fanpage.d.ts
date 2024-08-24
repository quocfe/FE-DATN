type FanpageType = {
  fanpage_id: string
  group_name: string
  description: string | null
  followers_count: number | null
  likes_count: number | null
  category: string | null
  address: string | null
  phone: number | null
  is_public: boolean
  role_id: string
  createdAt: Date
  updatedAt: Date
  image_url: string | null
}

type FanpageResponse = {
  first: number
  prev: null | number
  next: number | null
  last: number
  pages: number
  items: number
  data: {
    fanpages: Fanpage[]
  }
}

type FanpageNoId = Omit<Fanpage, 'fanpage_id'>

type FanpageConfigParams = {
  _page: string
  _per_page: string
}

type FanpageUpdate = {
  id: string
  fanpage: FanpageNoId
}
