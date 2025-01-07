import axiosInstance from "@/lib/axios-instance";

export const useStudentLogout = async () => {
  try {
    const { data } = await axiosInstance({
      withToken: true,
      tokenType: "student",
    }).post("/auth/students/logout");

    return { data: data.message, error: null };
  } catch (error: any) {
    if (!error) {
      return { data: null, status: 500 };
    }
    return { data: error.message, status: error.status };
  }
};
