import { User } from '@services/auth/admin-login/interfaces/login-admin.types'
import { Student } from '@services/auth/student-login/interfaces/login-student-types'
import { type StateCreator } from 'zustand'

export declare interface AuthGlobalState {
  user: User | null
  student: Student | null
  userRole: 'admin' | 'agency' | 'sub-agency' | 'school' | 'student'
  userCreatedAt: string
  userUpdatedAt: string
  setUser: (user: User) => void
  setStudent: (student: Student) => void
  setUserRole: (role: 'admin' | 'agency' | 'sub-agency' | 'school' | 'student') => void
  setUserCreatedAt: (value: string) => void
  setUserUpdatedAt: (value: string) => void
}

const createAuthGlobalSlice: StateCreator<AuthGlobalState> = (set) => ({
  user: null,
  student: null,
  userRole: 'school',
  userCreatedAt: '',
  userUpdatedAt: '',
  setUser: (user) => set({ user }),
  setStudent: (student) => set({ student }),
  setUserRole: (userRole) => set({ userRole }),
  setUserCreatedAt: (userCreatedAt) => set({ userCreatedAt }),
  setUserUpdatedAt: (userUpdatedAt) => set({ userUpdatedAt }),
})

export default createAuthGlobalSlice
