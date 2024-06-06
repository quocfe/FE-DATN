import { create } from 'zustand'

interface State {
  selectedConversation: GroupMessage | null
  messages: Message[]
  selectedNoConversation: SearchFriend | null
  toggleBoxReply: Message | null
  toggleBoxSearchMessage: boolean
  searchMessages: TypeMessage[]
  searchParam: string
}

interface Action {
  setSelectedConversation: (selectedConversation: GroupMessage | null) => void
  setMessages: (messages: Message[]) => void
  setSelectedNoConversation: (selectedNoConversation: {}) => void
  setToggleBoxReply: (toggleBoxReply: Message | null) => void
  setToggleBoxSearchMessage: (toggleBoxSearchMessage: boolean) => void
  setSearchParam: (searchParam: string) => void
}

export const useConversationStore = create<State & Action>((set: any) => ({
  messages: [],
  searchMessages: [],
  selectedConversation: null,
  selectedNoConversation: null,
  toggleBoxReply: null,
  toggleBoxSearchMessage: false,
  searchParam: '',
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  setMessages: (messages) => set({ messages }),
  setSelectedNoConversation: (selectedNoConversation) => set({ selectedNoConversation }),
  setToggleBoxReply: (toggleBoxReply) => set({ toggleBoxReply }),
  setToggleBoxSearchMessage: (toggleBoxSearchMessage) => set({ toggleBoxSearchMessage }),
  setSearchParam: (searchParam) => set({ searchParam })
}))

export default useConversationStore
