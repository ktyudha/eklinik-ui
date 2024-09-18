import { type StateCreator } from 'zustand'

export declare interface GroupState {
  activeAddQuestion: boolean
  activeRule: boolean
  groupFilterGrade: string
  selectedPackage: ({ value: string, label: string })
  totalGroupNumber: number
  setActiveAddQuestion: (param: boolean) => void
  setActiveRule: (param: boolean) => void
  setGroupFilterGrade: (param: string) => void
  setSelectedPackage: (param: ({ value: string, label: string })) => void
  setTotalGroupNumber: (param: number) => void
}

const createGroupSlice: StateCreator<GroupState> = (set) => ({
  activeAddQuestion: false,
  activeRule: false,
  groupFilterGrade: '',
  selectedPackage: ({ value: 'null', label: 'null' }),
  totalGroupNumber: 0,
  setActiveAddQuestion: (param) => set({ activeAddQuestion: param }),
  setActiveRule: (param) => set({ activeRule: param }),
  setGroupFilterGrade: (param) => set({ groupFilterGrade: param }),
  setSelectedPackage: (param) => set({ selectedPackage: param }),
  setTotalGroupNumber: (param) => set({ totalGroupNumber: param }),
})

export default createGroupSlice
