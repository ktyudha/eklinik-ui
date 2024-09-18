import axiosInstance from '@/lib/axios-instance'
import { ILoginStudentResponse } from '../interfaces/login-student-types'

export const useStudentLogin = async (username: string) => {
  try {
    const { data, status } = await axiosInstance({ withToken: false })
      .post('/auth/students/login', {
        username,
      }
    )

    return { data: data as ILoginStudentResponse, status }
  } catch (error: any) {
    if (!error) {
      return { data: null, status: 500 }
    }
    return { data: null, status: error.status }
  }
}