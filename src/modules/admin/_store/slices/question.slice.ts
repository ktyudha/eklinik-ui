import { type StateCreator } from 'zustand'

export declare interface QuestionState {
  questionSearch: string
  questionType: string
  questionFilterGrade: string
  setQuestionSearch: (param: string) => void
  setQuestionType: (param: string) => void
  setQuestionFilterGrade: (param: string) => void
}

const createQuestionSlice: StateCreator<QuestionState> = (set) => ({
  questionSearch: '',
  questionType: 'text',
  questionFilterGrade: '',
  setQuestionSearch: (param) => set({ questionSearch: param }),
  setQuestionType: (param) => set({ questionType: param }),
  setQuestionFilterGrade: (param) => set({ questionFilterGrade: param }),
})

export default createQuestionSlice
