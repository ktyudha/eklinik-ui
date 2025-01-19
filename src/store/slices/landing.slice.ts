import { type StateCreator } from "zustand";

export declare interface LandingState {
  activeHeroTab: string;
  setActiveHeroTab: (param: string) => void;
}
const createLandingSlice: StateCreator<LandingState> = (set) => ({
  activeHeroTab: "jadwal",
  setActiveHeroTab: (param) => set({ activeHeroTab: param }),
});

export default createLandingSlice;
