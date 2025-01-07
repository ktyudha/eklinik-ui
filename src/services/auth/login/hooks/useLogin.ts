import axiosInstance from "@/lib/axios-instance";
import { ILoginResponse } from "../interfaces/login.types";

export const useLogin = async (username: string, password: string) => {
  try {
    const { data, status } = await axiosInstance({ withToken: false }).post(
      "/auth/login",
      {
        username,
        password,
      }
    );

    return { data: data as ILoginResponse, status };
  } catch (error: any) {
    if (!error) {
      return { data: null, status: 500 };
    }
    return { data: null, status: error.status };
  }
};
