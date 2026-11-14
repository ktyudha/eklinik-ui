import { type StateCreator } from 'zustand'

export declare interface AdvancedToolsState {
  isSidebarExpand: boolean
  isUserMenuExpand: boolean
  setIsSidebarExpand: (payload: boolean) => void
  setIsUserMenuExpand: (payload: boolean) => void
}

const createAdvancedToolsSlice: StateCreator<AdvancedToolsState> = (set) => ({
  isSidebarExpand: (() => {
    try { return localStorage.getItem('sidebar-collapsed') !== '1' } catch { return true }
  })(),
  isUserMenuExpand: false,
  setIsSidebarExpand: () => set((state) => {
    const next = !state.isSidebarExpand
    try { localStorage.setItem('sidebar-collapsed', next ? '0' : '1') } catch { /* abaikan */ }
    return { isSidebarExpand: next }
  }),
  setIsUserMenuExpand: () => set((state) => ({ isUserMenuExpand: !state.isUserMenuExpand })),
})

export default createAdvancedToolsSlice
