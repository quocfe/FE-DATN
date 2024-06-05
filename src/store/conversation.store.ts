import { create } from 'zustand'

interface State {
  selectedConversation: GroupMessage | null
  messages: Message[]
  selectedNoConversation: SearchFriend | null
  toggleBoxReply: Message | null
}

interface Action {
  setSelectedConversation: (selectedConversation: GroupMessage | null) => void
  setMessages: (messages: Message[]) => void
  setSelectedNoConversation: (selectedNoConversation: {}) => void
  setToggleBoxReply: (toggleBoxReply: Message | null) => void
}

export const useConversationStore = create<State & Action>((set: any) => ({
  messages: [],
  selectedConversation: null,
  selectedNoConversation: null,
  toggleBoxReply: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  setMessages: (messages) => set({ messages }),
  setSelectedNoConversation: (selectedNoConversation) => set({ selectedNoConversation }),
  setToggleBoxReply: (toggleBoxReply) => set({ toggleBoxReply })
}))

export default useConversationStore
