import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface State {
  emoji: string
}

interface Action {
  setEmoji: (emoji: string) => void
}

const useEmojiStore = create<State & Action>()(
  devtools(
    persist(
      (set) => ({
        emoji: '👍',
        setEmoji: (emoji: string) => set({ emoji })
      }),
      { name: 'emojiStore' }
    )
  )
)
export default useEmojiStore
