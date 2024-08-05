import { create } from 'zustand'
import { getAccessTokenFromLocalStorage, getProfileFromLocalStorage } from '~/utils/auth'

interface State {
  isCreatePost: boolean
}

interface Action {
  setIsCreatePost: (value: boolean) => void
}

const usePostStore = create<State & Action>((set) => ({
  isCreatePost: false,
  setIsCreatePost: (value: boolean) => set({ isCreatePost: value })
}))

export default usePostStore
