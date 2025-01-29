import { User } from "@/services/auth/admin-login/interfaces/login-admin.types";
import { type StateCreator } from "zustand";

export declare interface AuthGlobalState {
  user: User | null;
  userRole: "admin" | "patient";
  userCreatedAt: string;
  userUpdatedAt: string;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User) => void;
  setUserRole: (role: "admin" | "patient") => void;
  setUserCreatedAt: (value: string) => void;
  setUserUpdatedAt: (value: string) => void;
}

const createAuthGlobalSlice: StateCreator<AuthGlobalState> = (set) => ({
  user: null,
  userRole: "patient",
  userCreatedAt: "",
  userUpdatedAt: "",
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setUser: (user) => set({ user }),
  setUserRole: (userRole) => set({ userRole }),
  setUserCreatedAt: (userCreatedAt) => set({ userCreatedAt }),
  setUserUpdatedAt: (userUpdatedAt) => set({ userUpdatedAt }),
});

export default createAuthGlobalSlice;
