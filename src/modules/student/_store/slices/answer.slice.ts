import { type StateCreator } from 'zustand'

export interface StudentFirstStepAnswer {
  questionType: string
  questionId: string
  questionAnswerId?: string | null
  extraAnswer?: string
}

export declare interface AnswerState {
  studentFirstStepAnswers: Array<StudentFirstStepAnswer>
  setStudentFirstStepAnswers: (param: Array<StudentFirstStepAnswer>) => void
}

const createAnswerSlice: StateCreator<AnswerState> = (set) => ({
  studentFirstStepAnswers: [],
  setStudentFirstStepAnswers: (param) => set({ studentFirstStepAnswers: param }),
})

export default createAnswerSlice
