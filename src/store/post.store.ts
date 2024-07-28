import { create } from 'zustand'
import { getAccessTokenFromLocalStorage, getProfileFromLocalStorage } from '~/utils/auth'

interface State {
  isCreatePost: boolean
  limit: number
}

interface Action {
  setIsCreatePost: (value: boolean) => void
  setLimit: (num: number) => void
}

const usePostStore = create<State & Action>((set) => ({
  isCreatePost: false,
  limit: 2,
  setIsCreatePost: (value: boolean) => set({ isCreatePost: value }),
  setLimit: (num: number) => set({ limit: num })
}))

export default usePostStore
