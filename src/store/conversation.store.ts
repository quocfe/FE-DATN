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
  isTyping: typingMessage | null
  isNotTyping: boolean
  pinMessage: TypeMessage[] | null
  togglePreviewBoxFix: {
    status: boolean
    group_id: string
  }
  checkDropAttach: boolean
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
  setIsTyping: (isTyping: typingMessage) => void
  setIsNotTyping: (isNotTyping: boolean) => void
  setCheckDropAttach: (checkDropAttach: boolean) => void
  setTogglePreviewBoxFix: (togglePreviewBoxFix: { status: boolean; group_id: string }) => void
}

export const useConversationStore = create<State & Action>((set: any) => ({
  messages: [],
  searchMessages: [],
  selectedConversation: {},
  selectedNoConversation: null,
  toggleBoxReply: null,
  previewImg: null,
  togglePreviewBox: false,
  togglePreviewBoxFix: { status: false, group_id: '' },
  toggleBoxSearchMessage: false,
  searchParam: '',
  pinMessage: null,
  isTyping: null,
  isNotTyping: true,
  checkDropAttach: false,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  setMessages: (messages) => set({ messages }),
  setSelectedNoConversation: (selectedNoConversation) => set({ selectedNoConversation }),
  setToggleBoxReply: (toggleBoxReply) => set({ toggleBoxReply }),
  setPreviewImg: (previewImg) => set({ previewImg }),
  setTogglePreviewBox: (togglePreviewBox) => set({ togglePreviewBox }),
  setTogglePreviewBoxFix: (togglePreviewBoxFix) => set({ togglePreviewBoxFix }),
  setToggleBoxSearchMessage: (toggleBoxSearchMessage) => set({ toggleBoxSearchMessage }),
  setSearchParam: (searchParam) => set({ searchParam }),
  setPinMessage: (pinMessage) => set({ pinMessage }),
  setIsTyping: (isTyping) => set({ isTyping }),
  setIsNotTyping: (isNotTyping) => set({ isNotTyping }),
  setCheckDropAttach: (checkDropAttach) => set({ checkDropAttach })
}))

export default useConversationStore
