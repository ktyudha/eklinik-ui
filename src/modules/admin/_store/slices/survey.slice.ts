import { type StateCreator } from 'zustand'

export declare interface SurveyState {
  activeSurveyTab: string
  setActiveSurvetTab: (param: string) => void
}

const createSurveySlice: StateCreator<SurveyState> = (set) => ({
  activeSurveyTab: '',
  setActiveSurvetTab: (param) => set({ activeSurveyTab: param }),
})

export default createSurveySlice
