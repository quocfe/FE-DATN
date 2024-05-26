type Message = {
  message_id: string
  body: string
  status: boolean
  group_message_id: string
  parent_id: string
  detelectedBy: string
  detelectedAt: Date
  createdBy: string
  type: number
  createdAt: Date
  updatedAt: Date
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
  data: GroupMessage[]
  message: string
}

type MessageResponse = {
  data: Message[]
  message: string
}

type MessageInput = {
  body: string
  group_message_id: string | undefined
  receiver: string
}

type CreateGroupMessageInput = {
  list_user: string
  group_name: string
  group_thumbnail: string
}

type ReplyMessageInput = Pick<Message, 'body' | 'group_message_id' | 'type' | 'parent_id'>

type ReactMessageInput = Pick<ReactMessage, 'message_id' | 'user_id' | 'emoji' | 'createdBy'>

type CreateMemberGroupInput = Pick<MemberGroup, 'group_message_id'> & {
  listUser: string
}

type ConvesationSideBar = Pick<GroupMessage> & {
  messsages: Message
}
