import { create } from 'zustand'

interface State {
  selectedConversation: {
    [key: string]: any
    [key: number]: any
  }
  messages: TypeMessage[]
  selectedNoConversation: SearchFriend | null
  toggleBoxReply: Message | null
  previewImg: any
  togglePreviewBox: boolean
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
  setPreviewImg: (previewImg: any) => void
  setTogglePreviewBox: (togglePreviewBox: boolean) => void
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
  previewImg: null,
  togglePreviewBox: false,
  toggleBoxSearchMessage: false,
  searchParam: '',
  pinMessage: null,
  isTyping: '',
  isNotTyping: true,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  setMessages: (messages) => set({ messages }),
  setSelectedNoConversation: (selectedNoConversation) => set({ selectedNoConversation }),
  setToggleBoxReply: (toggleBoxReply) => set({ toggleBoxReply }),
  setPreviewImg: (previewImg) => set({ previewImg }),
  setTogglePreviewBox: (togglePreviewBox) => set({ togglePreviewBox }),
  setToggleBoxSearchMessage: (toggleBoxSearchMessage) => set({ toggleBoxSearchMessage }),
  setSearchParam: (searchParam) => set({ searchParam }),
  setPinMessage: (pinMessage) => set({ pinMessage }),
  setIsTyping: (isTyping) => set({ isTyping }),
  setIsNotTyping: (isNotTyping) => set({ isNotTyping })
}))

export default useConversationStore
