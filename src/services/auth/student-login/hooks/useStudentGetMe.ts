import axiosInstance from "@/lib/axios-instance";
import { IMeStudentResponse } from "../interfaces/login-student-types";

export const useStudentGetMe = async () => {
  try {
    const { data, status } = await axiosInstance({
      withToken: true,
      tokenType: "student",
    }).get("/auth/students/me");

    return { data: data as IMeStudentResponse, status, error: null };
  } catch (error: any) {
    return { data: null, status: 401, error: "Unauthorized" };
  }
};
