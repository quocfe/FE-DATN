import { MESSAGE } from '~/constants/message.constant'
import http from '~/utils/http'

class MessageApi {
  getConversation() {
    return http.get<ConversationResponse>(`${MESSAGE.GET_CONVERSATION}`, { withCredentials: true })
  }

  getMembersGroup(id: string) {
    return http.get<MembersGroupResponse>(`${MESSAGE.GET_MEMBERS}/${id}`, { withCredentials: true })
  }

  getGroupMessage(id: string) {
    return http.get<MessageResponse>(`${MESSAGE.GET_GROUP_MESSAGE}/${id}`, { withCredentials: true })
  }

  getOneToOneMessage(id: string) {
    return http.get<MessageResponse>(`${MESSAGE.GET_ONE_TO_ONE}/${id}`, { withCredentials: true })
  }

  getRecall() {
    return http.get<RecallResponse>(`${MESSAGE.GET_RECALL}`, { withCredentials: true })
  }

  sendMessage(messageData: MessageInput) {
    return http.post<MessageResponse>(MESSAGE.SEND_MESSAGE, messageData, { withCredentials: true })
  }

  sendMessageAttach(messageMediaData: MessageMediaInput) {
    return http.post<MessageResponse>(MESSAGE.SEND_MESSAGE_ATTACH, messageMediaData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })
  }

  replyMessage(replyMessageInput: ReplyMessageInput) {
    return http.post<MessageResponse>(MESSAGE.REPLY_MESSAGE, replyMessageInput, { withCredentials: true })
  }

  sendReactMessage(reactMessageData: ReactMessageInput) {
    return http.post(MESSAGE.SEND_REACT_MESSAGE, reactMessageData, { withCredentials: true })
  }

  createGroup(createGroupData: CreateGroupMessageInput) {
    return http.post(MESSAGE.CREATE_GROUP, createGroupData, { withCredentials: true })
  }

  addMembersToGroup(memberGroupData: CreateMemberGroupInput) {
    return http.post(MESSAGE.ADD_MEMBERS_TO_GROUP, memberGroupData, { withCredentials: true })
  }

  recallMessage(body: ReCallMessageInput) {
    return http.post(`${MESSAGE.RECALL_MESSAGE}`, body, { withCredentials: true })
  }

  deleteConversation(id: string) {
    return http.delete(`${MESSAGE.DELETE_CONVERSATION}/${id}`, { withCredentials: true })
  }

  searchMessage(query: string, conversationId: string) {
    return http.get(`${MESSAGE.SEARCH_MESSAGE}/${conversationId}/${query}`)
  }

  changeImageGroup(body: { group_id: string; image: string }) {
    return http.post(`${MESSAGE.UPDATE_IMAGE_GROUP}`, body, { withCredentials: true })
  }

  changeGroupName(body: { group_id: string | undefined; group_name: string }) {
    return http.post(`${MESSAGE.UPDATE_GROUP_NAME}`, body, { withCredentials: true })
  }
}

export default new MessageApi()
