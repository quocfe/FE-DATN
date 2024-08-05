export interface FanpageMember {
  user_id: string;
  fanpage_id: string;
  role: string;
  is_invited: boolean;
  is_following: boolean;
}

export type FanpageMemberResponse = {
  first: number;
  prev: null | number;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  message: any;
  data: {
    members: FanpageMember[];
  };
}
