import axiosInstance from "@/lib/axios-instance";
import Cookies from "js-cookie";

export const useLogout = async () => {
  const tokenType = Cookies.get("token-patient") ? "patient" : "admin";

  try {
    const { data } = await axiosInstance({ withToken: true, tokenType }).post(
      "/auth/logout"
    );

    return { data: data.message, error: null };
  } catch (error: any) {
    if (!error) {
      return { data: null, status: 500 };
    }
    return { data: error.message, status: error.status };
  }
};
