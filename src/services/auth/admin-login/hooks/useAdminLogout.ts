import axiosInstance from "@/lib/axios-instance";

export const useAdminLogout = async () => {
  try {
    const { data } = await axiosInstance({
      withToken: true,
      tokenType: "admin",
    }).post("/auth/admin/logout");

    return { data: data.message, error: null };
  } catch (error: any) {
    if (!error) {
      return { data: null, status: 500 };
    }
    return { data: error.message, status: error.status };
  }
};
