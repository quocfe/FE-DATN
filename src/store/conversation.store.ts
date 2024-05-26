import { create } from 'zustand'

interface State {
  selectedConversation: GroupMessage | null
  messages: Message[]
}

interface Action {
  setSelectedConversation: (selectedConversation: GroupMessage | null) => void
  setMessages: (messages: Message[]) => void
}

export const useConversationStore = create<State & Action>((set: any) => ({
  messages: [],
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: any) => set({ selectedConversation }),
  setMessages: (messages: any) => set({ messages })
}))

export default useConversationStore
