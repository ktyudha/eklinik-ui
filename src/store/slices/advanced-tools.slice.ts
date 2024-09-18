import { type StateCreator } from 'zustand'

export declare interface AdvancedToolsState {
  isSidebarExpand: boolean
  isUserMenuExpand: boolean
  setIsSidebarExpand: (payload: boolean) => void
  setIsUserMenuExpand: (payload: boolean) => void
}

const createAdvancedToolsSlice: StateCreator<AdvancedToolsState> = (set) => ({
  isSidebarExpand: true,
  isUserMenuExpand: false,
  setIsSidebarExpand: () => set((state) => ({ isSidebarExpand: !state.isSidebarExpand })),
  setIsUserMenuExpand: () => set((state) => ({ isUserMenuExpand: !state.isUserMenuExpand })),
})

export default createAdvancedToolsSlice
