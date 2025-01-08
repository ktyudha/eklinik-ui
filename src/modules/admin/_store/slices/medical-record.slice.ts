import { type StateCreator } from "zustand";

export declare interface MedicalRecordState {
  activeMedicalRecordTab: string;
  setActiveMedicalRecordTab: (param: string) => void;
}

const createMedicalRecordSlice: StateCreator<MedicalRecordState> = (set) => ({
  activeMedicalRecordTab: "menu-setting-medical-record",
  setActiveMedicalRecordTab: (param) => set({ activeMedicalRecordTab: param }),
});

export default createMedicalRecordSlice;
