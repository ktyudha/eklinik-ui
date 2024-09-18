import { type StateCreator } from 'zustand'

export declare interface SchoolState {
  schoolSearch: string
  setSchoolSearch: (param: string) => void
}

const createSchoolSlice: StateCreator<SchoolState> = (set) => ({
  schoolSearch: '',
  setSchoolSearch: (param) => set({ schoolSearch: param }),
})

export default createSchoolSlice
