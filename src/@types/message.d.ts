type Message = {
  message_id: string
  body: string
  sub_body: string
  status: boolean
  group_message_id: string
  parent_id: string
  detelectedBy: string
  detelectedAt: Date
  createdBy: string
  type: number
  createdAt: Date
  updatedAt: Date
  user_name: string
}

type InfoMessage = {
  group_id: string
  avatar: string
  group_name: string
}

type GroupMessage = {
  group_message_id: string
  group_name: string
  status: boolean
  type: number
  group_thumbnail: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
  user_id: string
}

type MembersGroup = {
  member_group_id: string
  user_id: string
  group_message_id: string
  role: boolean
  status: boolean
  createdAt: Date
  updatedAt: Date
}

type TypeMembersGroup = Pick<MembersGroup, 'user_id' | 'role'> & {
  avatar: string
  fullname: string
  group_message_id: string
}

type RecallMessage = {
  recall_message_id: string
  message_id: string
  user_id: string
  createdAt: Date
  updatedAt: Date
}

type ReactMessageAttributes = {
  react_message_id: string
  user_id: string
  emoji: string
  message_id: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

type ConversationResponse = {
  data: {
    data: GroupMessage[]
    pagination: {
      totalPage: number
      page: number
      limit: number
    }
  }
  message: string
}

type MembersGroupResponse = {
  data: TypeMembersGroup[]
  message: string
}

type MessageApiResponse = {
  data: {
    info: InfoMessage
    messages: TypeMessage[]
  }
  message: string
}

type MessageResponse = Pick<MessageApiResponse, 'data'>

type RecallResponse = {
  data: RecallMessage[]
  message: string
}

type MessageInput = {
  body: string
  group_message_id: string | undefined
  receiver?: string
  type: number
}

type MessageMediaInput = {
  body: string
  sub_body: string
  group_message_id: string | undefined
  receiver?: string
  type: number
}

type ReplyMessageInput = {
  body: string
  group_message_id: string
  type: number
  parent_id: string | undefined
  receiver?: string
}

type ReactMessageInput = {
  message_id: string
  emoji: string
}

type ChangeImageInput = {
  group_id: string
  image: string
}

type AddMemberGroupInput = {
  list_user: string
  group_message_id: string
}

type ChangeNameGroupInput = {
  group_id: string | undefined
  group_name: string
}

type CreateGroupMessageInput = {
  list_user: string
  group_name: string
  group_thumbnail: string
}

type MessageCenterProps = {
  showScrollBtn?: boolean
}

type ReplyMessageInput = Pick<Message, 'body' | 'group_message_id' | 'type' | 'parent_id'>
type ReactMessageInput = Pick<ReactMessage, 'message_id' | 'user_id' | 'emoji' | 'createdBy'>
type ReplyMessage = Pick<Message, 'body' | 'message_id' | 'type' | 'createdBy'> & {
  reply_user: string
} & {
  recallInReply: []
}

type CreateMemberGroupInput = Pick<MemberGroup, 'group_message_id'> & {
  list_user: string
}

type ReCallMessageInput = {
  message_id: string
  forAll: boolean
}

type ConvesationSideBar = GroupMessage & {
  messages?: Message
}

type TypeMessage = Pick<
  Message,
  | 'message_id'
  | 'body'
  | 'sub_body'
  | 'status'
  | 'group_message_id'
  | 'parent_id'
  | 'detelectedBy'
  | 'detelectedAt'
  | 'createdBy'
  | 'type'
  | 'createdAt'
  | 'updatedAt'
  | 'user_name'
> & {
  recalls: []
  reactions: ReactMessageAttributes[]
  replyMessage: ReplyMessage
  thumbnail: string
}
