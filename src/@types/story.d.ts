export interface Story {
  story_id: string;
  user_id: string;
  text: string;
  content: string;
  privacy: string;
  tag: string;
  story_time: Date;
  createdAt: Date;
  updatedAt: Date;
}

type StoryResponse = {
  first: number;
  prev: null | number;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Story[];
}

type StoryNoId = Omit<Story, 'story_id'>;

type StoryConfigParams = {
  _page: string;
  _per_page: string;
}

type StoryUpdate = {
  id: string;
  story: StoryNoId;
}
