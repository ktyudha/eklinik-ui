import { type StateCreator } from 'zustand'

export declare interface QuestionState {
  arrQuestionWithRule: Array<string>
  setArrQuestionWithRule: (param: Array<string>) => void
}

const createQuestionSlice: StateCreator<QuestionState> = (set) => ({
  arrQuestionWithRule: [],
  setArrQuestionWithRule: (param) => set({ arrQuestionWithRule: param }),
})

export default createQuestionSlice
