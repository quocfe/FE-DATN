export interface Story {
  story_id: string
  user_id: string
  user: any
  text: string
  content: string
  privacy: string
  tag: string
  story_view :string
  story_time: Date
  is_archived: boolean
  createdAt: Date
  updatedAt: Date
  
}

type StoryResponse = {
  data: {
    story: Story[]
  }
  message: string
}

type StoryNoId = Omit<Story, 'story_id'>

type StoryConfigParams = {
  _page: string
  _per_page: string
}

type StoryUpdate = {
  id: string
  story: StoryNoId
}
