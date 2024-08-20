import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface MessageFix {
  group_id: string
  type: number
  id: string
  avatar?: string
}

interface State {
  messagesFix: MessageFix[]
  hiddenMessageFix: MessageFix[]
}

interface Action {
  setMessageFix: (messagesFix: MessageFix) => void
  setHiddenMessageFix: (hiddenMessageFix: MessageFix) => void
  removeMessageFix: (groupId: string) => void
  removeHiddenMessageFix: (groupId: string) => void
  clearAll: () => void
}

const useMessageFixStore = create<State & Action>()(
  persist(
    (set, get) => ({
      messagesFix: [],
      hiddenMessageFix: [],
      setMessageFix: (messagesFix: MessageFix) => {
        const state = get()
        const existingMessage = get().messagesFix.find((msg) => msg.group_id === messagesFix.group_id)
        const existingHiddenMessage = get().hiddenMessageFix.find((msg) => msg.group_id === messagesFix.group_id)

        if (existingHiddenMessage) {
          state.removeHiddenMessageFix(messagesFix.group_id)
        }
        if (!existingMessage) {
          if (state.messagesFix.length >= 3) {
            const [removedMessage, ...rest] = state.messagesFix
            set({
              messagesFix: rest,
              hiddenMessageFix: [...state.hiddenMessageFix, removedMessage]
            })
            set((state) => ({ messagesFix: [...state.messagesFix, messagesFix] }))
          } else {
            set((state) => ({ messagesFix: [...state.messagesFix, messagesFix] }))
          }
        }
      },
      removeMessageFix: (groupId: string) => {
        set((state) => ({
          messagesFix: state.messagesFix.filter((msg) => msg.group_id !== groupId)
        }))
      },
      removeHiddenMessageFix: (groupId: string) => {
        set((state) => ({
          hiddenMessageFix: state.hiddenMessageFix.filter((msg) => msg.group_id !== groupId)
        }))
      },
      setHiddenMessageFix: (hiddenMessageFix: any) => {
        const existingMessage = get().hiddenMessageFix.find((msg) => msg.group_id === hiddenMessageFix.group_id)

        if (!existingMessage) {
          set((state) => ({ hiddenMessageFix: [...state.hiddenMessageFix, hiddenMessageFix] }))
        }
      },
      clearAll: () => {
        set(() => ({ messagesFix: [], hiddenMessageFix: [] }))
      }
    }),
    {
      name: 'messageFixStore',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useMessageFixStore
