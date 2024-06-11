import { MESSAGE } from '~/constants/message.constant'
import http from '~/utils/http'

class MessageApi {
  getConversation() {
    return http.get<ConversationResponse>(`${MESSAGE.GET_CONVERSATION}`, { withCredentials: true })
  }

  getMessage(id: string) {
    return http.get<MessageResponse>(`${MESSAGE.GET_MESSAGE}/${id}`, { withCredentials: true })
  }

  getRecall() {
    return http.get<RecallResponse>(`${MESSAGE.GET_RECALL}`, { withCredentials: true })
  }

  sendMessage(messageData: MessageInput) {
    return http.post<MessageResponse>(MESSAGE.SEND_MESSAGE, messageData, { withCredentials: true })
  }

  sendMessageAttach(messageMediaData: FormData) {
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
}

export default new MessageApi()
