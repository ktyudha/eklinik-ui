import { type StateCreator } from 'zustand'

export declare interface SurveyState {
  activeSurveyTab: number
  setActiveSurveyTab: (param: number) => void
}

const createSurveySlice: StateCreator<SurveyState> = (set) => ({
  activeSurveyTab: 1,
  setActiveSurveyTab: (param) => set({ activeSurveyTab: param }),
})

export default createSurveySlice
