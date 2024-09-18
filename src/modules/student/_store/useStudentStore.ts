import { create } from 'zustand'
import createSurveySlice, { type SurveyState } from './slices/survey.slice'
import createProfileSlice, { type ProfileState } from './slices/profile.slice'
import createAnswerSlice, { type AnswerState } from './slices/answer.slice'

type BoundSliceTypes = { default: null } &
  SurveyState &
  ProfileState &
  AnswerState

const useStudentStore = create<BoundSliceTypes>()((...setter) => ({
  default: null,
  ...createSurveySlice(...setter),
  ...createProfileSlice(...setter),
  ...createAnswerSlice(...setter),
}))

export default useStudentStore
