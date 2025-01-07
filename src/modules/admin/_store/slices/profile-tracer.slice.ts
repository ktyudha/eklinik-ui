import { type StateCreator } from 'zustand'

export declare interface ProfileTracerState {
  searchProfileTracerSchool: string
  addListProfileTracerSchool: Array<string>
  deleteListProfileTracerSchool: Array<string>
  setSearchProfileTracerSchool: (param: string) => void
  setAddListProfileTracerSchool: (param: Array<string>) => void
  setDeleteListProfileTracerSchool: (param: Array<string>) => void
}

const createProfileTracerSlice: StateCreator<ProfileTracerState> = (set) => ({
  searchProfileTracerSchool: '',
  addListProfileTracerSchool: [],
  deleteListProfileTracerSchool: [],
  setSearchProfileTracerSchool: (param) => set({ searchProfileTracerSchool: param }),
  setAddListProfileTracerSchool: (param) => set({ addListProfileTracerSchool: [...param] }),
  setDeleteListProfileTracerSchool: (param) => set({ deleteListProfileTracerSchool: [...param] }),
})

export default createProfileTracerSlice
