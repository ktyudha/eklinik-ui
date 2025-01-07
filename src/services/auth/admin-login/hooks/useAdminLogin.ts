import axiosInstance from "@/lib/axios-instance";
import { ILoginAdminResponse } from "../interfaces/login-admin.types";

export const useAdminLogin = async (username: string, password: string) => {
  try {
    const { data, status } = await axiosInstance({ withToken: false }).post(
      "/auth/admin/login",
      {
        username,
        password,
      }
    );

    return { data: data as ILoginAdminResponse, status };
  } catch (error: any) {
    if (!error) {
      return { data: null, status: 500 };
    }
    return { data: null, status: error.status };
  }
};
