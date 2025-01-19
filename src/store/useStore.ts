import { create } from "zustand";
import createAdvancedToolsSlice, {
  type AdvancedToolsState,
} from "./slices/advanced-tools.slice";
import createAuthGlobalSlice, {
  type AuthGlobalState,
} from "./slices/auth-global.slice";

import createLandingSlice, { type LandingState } from "./slices/landing.slice";

type BoundSliceTypes = { default: null } & AdvancedToolsState &
  AuthGlobalState &
  LandingState;

const useGlobalStore = create<BoundSliceTypes>()((...setter) => ({
  default: null,
  ...createAdvancedToolsSlice(...setter),
  ...createAuthGlobalSlice(...setter),
  ...createLandingSlice(...setter),
}));

export default useGlobalStore;
