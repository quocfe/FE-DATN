export interface Fanpage {
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

export type FanpageResponse = {
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

export type FanpageNoId = Omit<Fanpage, 'fanpage_id'>

export type FanpageConfigParams = {
  _page: string
  _per_page: string
}

export type FanpageUpdate = {
  id: string
  fanpage: FanpageNoId
}
