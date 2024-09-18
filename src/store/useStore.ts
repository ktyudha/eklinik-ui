import { create } from "zustand";
import createAdvancedToolsSlice, {
  type AdvancedToolsState,
} from "./slices/advanced-tools.slice";
import createAuthGlobalSlice, {
  type AuthGlobalState,
} from "./slices/auth-global.slice";

type BoundSliceTypes = { default: null } & AdvancedToolsState & AuthGlobalState;

const useGlobalStore = create<BoundSliceTypes>()((...setter) => ({
  default: null,
  ...createAdvancedToolsSlice(...setter),
  ...createAuthGlobalSlice(...setter),
}));

export default useGlobalStore;
