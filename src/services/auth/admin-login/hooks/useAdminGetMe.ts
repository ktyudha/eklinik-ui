import axiosInstance from "@/lib/axios-instance";
import { ILoginAdminResponse } from "../interfaces/login-admin.types";

export const useAdminGetMe = async () => {
  try {
    const { data, status } = await axiosInstance({
      withToken: true,
      tokenType: "admin",
    }).get("/auth/admin/me");

    return { data: data as ILoginAdminResponse, status, error: null };
  } catch (error: any) {
    return { data: null, status: 401, error: "Unauthorized" };
  }
};
