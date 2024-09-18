import { type StateCreator } from 'zustand'

export declare interface DashboardTabState {
  activeDashboardTab: string
  setActiveDasboardTab: (param: string) => void
}

const createEducationUnitSlice: StateCreator<DashboardTabState> = (set) => ({
  activeDashboardTab: 'dashboard-education-unit',
  setActiveDasboardTab: (param) => set({ activeDashboardTab: param }),
})

export default createEducationUnitSlice
