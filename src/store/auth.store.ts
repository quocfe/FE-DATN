import { create } from 'zustand'
import { getAccessTokenFromLocalStorage, getProfileFromLocalStorage } from '~/utils/auth'

interface State {
  isAuthenticated: boolean
  profile: UserProfile | null
}

interface Action {
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setProfile: (profile: UserProfile | null) => void
}

const useAuthStore = create<State & Action>((set) => ({
  isAuthenticated: !!getAccessTokenFromLocalStorage(),
  profile: getProfileFromLocalStorage(),
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setProfile: (profile: UserProfile | null) => set({ profile })
}))

export default useAuthStore
