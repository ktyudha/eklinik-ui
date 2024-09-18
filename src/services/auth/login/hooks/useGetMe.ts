import axiosInstance from "@/lib/axios-instance";
import Cookies from "js-cookie";
import { IMeResponse } from "../interfaces/login.types";

export const useGetMe = async () => {
  const tokenType = Cookies.get("token-school")
    ? "school"
    : Cookies.get("token-agency")
      ? "agency"
      : "sub-agency";

  try {
    const { data, status } = await axiosInstance({
      withToken: true,
      tokenType,
    }).get("/auth/me");

    return { data: data as IMeResponse, status, error: null };
  } catch (error: any) {
    return { data: null, status: 401, error: "Unauthorized" };
  }
};
