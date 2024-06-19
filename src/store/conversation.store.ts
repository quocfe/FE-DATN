import { create } from 'zustand'

interface State {
  selectedConversation: {
    [key: string]: any
    [key: number]: any
  }
  messages: TypeMessage[]
  selectedNoConversation: SearchFriend | null
  toggleBoxReply: Message | null
  togglePreviewImg: any
  toggleBoxSearchMessage: boolean
  searchMessages: TypeMessage[]
  searchParam: string
  isTyping: string
  isNotTyping: boolean
  pinMessage: TypeMessage[] | null
}

interface Action {
  setSelectedConversation: (selectedConversation: {}) => void
  setMessages: (messages: TypeMessage[] | any) => void
  setSelectedNoConversation: (selectedNoConversation: {}) => void
  setToggleBoxReply: (toggleBoxReply: Message | null) => void
  setTogglePreviewImg: (togglePreviewImg: any) => void
  setToggleBoxSearchMessage: (toggleBoxSearchMessage: boolean) => void
  setSearchParam: (searchParam: string) => void
  setPinMessage: (pinMessage: TypeMessage | null) => void
  setIsTyping: (isTyping: string) => void
  setIsNotTyping: (isNotTyping: boolean) => void
}

export const useConversationStore = create<State & Action>((set: any) => ({
  messages: [],
  searchMessages: [],
  selectedConversation: {},
  selectedNoConversation: null,
  toggleBoxReply: null,
  togglePreviewImg: null,
  toggleBoxSearchMessage: false,
  searchParam: '',
  pinMessage: null,
  isTyping: '',
  isNotTyping: true,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  setMessages: (messages) => set({ messages }),
  setSelectedNoConversation: (selectedNoConversation) => set({ selectedNoConversation }),
  setToggleBoxReply: (toggleBoxReply) => set({ toggleBoxReply }),
  setTogglePreviewImg: (togglePreviewImg) => set({ togglePreviewImg }),
  setToggleBoxSearchMessage: (toggleBoxSearchMessage) => set({ toggleBoxSearchMessage }),
  setSearchParam: (searchParam) => set({ searchParam }),
  setPinMessage: (pinMessage) => set({ pinMessage }),
  setIsTyping: (isTyping) => set({ isTyping }),
  setIsNotTyping: (isNotTyping) => set({ isNotTyping })
}))

export default useConversationStore
