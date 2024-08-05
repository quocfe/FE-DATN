import { create } from 'zustand'
import { getAccessTokenFromLocalStorage, getProfileFromLocalStorage, getTypeLoginFromLocalStorage } from '~/utils/auth'

interface State {
  isAuthenticated: boolean
  profile: UserProfile | null
  type: string
}

interface Action {
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setProfile: (profile: UserProfile | null) => void
  setType: (type: string) => void
}

const useAuthStore = create<State & Action>((set) => ({
  isAuthenticated: !!getAccessTokenFromLocalStorage(),
  profile: getProfileFromLocalStorage(),
  type: getTypeLoginFromLocalStorage(),
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setProfile: (profile: UserProfile | null) => set({ profile }),
  setType: (type: string) => set({ type })
}))

export default useAuthStore
