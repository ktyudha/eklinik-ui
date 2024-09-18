import { type StateCreator } from 'zustand'

export declare interface SubAgencyState {
  searchSubAgency: string
  setSearchSubAgency: (param: string) => void
}

const createSubAgencySlice: StateCreator<SubAgencyState> = (set) => ({
  searchSubAgency: '',
  setSearchSubAgency: (param) => set({ searchSubAgency: param }),
})

export default createSubAgencySlice
