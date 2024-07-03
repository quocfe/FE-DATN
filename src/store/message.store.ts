import { create } from 'zustand'

interface State {
  goToOldMessage: string
}

interface Action {
  setGoToOldMessage: (goToOldMessage: string) => void
}

export const useMessageStore = create<State & Action>((set: any) => ({
  goToOldMessage: '',
  setGoToOldMessage: (goToOldMessage) => set({ goToOldMessage })
}))

export default useMessageStore
