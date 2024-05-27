import { create } from 'zustand'

interface State {
  selectedConversation: GroupMessage | null
  messages: Message[]
  selectedNoConversation: SearchFriend | null
}

interface Action {
  setSelectedConversation: (selectedConversation: GroupMessage | null) => void
  setMessages: (messages: Message[]) => void
  setSelectedNoConversation: (selectedNoConversation: {}) => void
}

export const useConversationStore = create<State & Action>((set: any) => ({
  messages: [],
  selectedConversation: null,
  selectedNoConversation: null,
  setSelectedConversation: (selectedConversation: any) => set({ selectedConversation }),
  setMessages: (messages: any) => set({ messages }),
  setSelectedNoConversation: (selectedNoConversation: any) => set({ selectedNoConversation })
}))

export default useConversationStore
