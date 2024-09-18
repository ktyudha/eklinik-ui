import { type StateCreator } from 'zustand'

export interface OptionValue {
  label: string
  value: string
}

export declare interface ProfileState {
  selectedMaritalStatus: string
  selectedProvince: OptionValue | null
  selectedCity: OptionValue | null
  selectedSubDistrict: OptionValue | null
  setSelectedMaritalStatus: (param: string) => void
  setSelectedProvince: (param: OptionValue | null) => void
  setSelectedCity: (param: OptionValue | null) => void
  setSelectedSubDistrict: (param: OptionValue | null) => void
}

const createProfileSlice: StateCreator<ProfileState> = (set) => ({
  selectedMaritalStatus: '',
  selectedProvince: null,
  selectedCity: null,
  selectedSubDistrict: null,
  setSelectedMaritalStatus: (param) => set({ selectedMaritalStatus: param }),
  setSelectedProvince: (param) => set({ selectedProvince: param }),
  setSelectedCity: (param) => set({ selectedCity: param }),
  setSelectedSubDistrict: (param) => set({ selectedSubDistrict: param }),
})

export default createProfileSlice
