import { type StateCreator } from 'zustand'

export declare interface AgencyState {
  activeAgencyType: string
  searchAgency: string
  setActiveAgencyType: (param: string) => void
  setSearchAgency: (param: string) => void
}

const createAgencySlice: StateCreator<AgencyState> = (set) => ({
  activeAgencyType: 'agency',
  searchAgency: '',
  setActiveAgencyType: (param) => set({ activeAgencyType: param }),
  setSearchAgency: (param) => set({ searchAgency: param }),
})

export default createAgencySlice
