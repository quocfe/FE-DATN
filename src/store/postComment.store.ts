import { create } from 'zustand'

interface State {
  selectedFile: File | null
}

interface Action {
  setSelectedFile: (value: File | null) => void
}

const usePostCommentStore = create<State & Action>((set) => ({
  selectedFile: null,
  setSelectedFile: (value: File | null) => set({ selectedFile: value })
}))

export default usePostCommentStore
