import { create } from 'zustand'

interface State {
  selectedConversation: GroupMessage | null
  messages: TypeMessage[]
  selectedNoConversation: SearchFriend | null
  toggleBoxReply: Message | null
  toggleBoxSearchMessage: boolean
  searchMessages: TypeMessage[]
  searchParam: string
  pinMessage: TypeMessage[] | null
}

interface Action {
  setSelectedConversation: (selectedConversation: GroupMessage | null) => void
  setMessages: (messages: TypeMessage[] | any) => void
  setSelectedNoConversation: (selectedNoConversation: {}) => void
  setToggleBoxReply: (toggleBoxReply: Message | null) => void
  setToggleBoxSearchMessage: (toggleBoxSearchMessage: boolean) => void
  setSearchParam: (searchParam: string) => void
  setPinMessage: (pinMessage: TypeMessage | null) => void
}

export const useConversationStore = create<State & Action>((set: any) => ({
  messages: [],
  searchMessages: [],
  selectedConversation: null,
  selectedNoConversation: null,
  toggleBoxReply: null,
  toggleBoxSearchMessage: false,
  searchParam: '',
  pinMessage: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  setMessages: (messages) => set({ messages }),
  setSelectedNoConversation: (selectedNoConversation) => set({ selectedNoConversation }),
  setToggleBoxReply: (toggleBoxReply) => set({ toggleBoxReply }),
  setToggleBoxSearchMessage: (toggleBoxSearchMessage) => set({ toggleBoxSearchMessage }),
  setSearchParam: (searchParam) => set({ searchParam }),
  setPinMessage: (pinMessage) => set({ pinMessage })
}))

export default useConversationStore
