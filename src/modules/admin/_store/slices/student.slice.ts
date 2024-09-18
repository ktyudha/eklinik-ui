import { type StateCreator } from 'zustand'

export declare interface StudentState {
  studentSearch: string
  setStudentSearch: (param: string) => void
}

const createStudentSlice: StateCreator<StudentState> = (set) => ({
  studentSearch: '',
  setStudentSearch: (param) => set({ studentSearch: param }),
})

export default createStudentSlice
