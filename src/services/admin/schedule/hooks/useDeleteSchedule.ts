import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";

export default function useDeleteSchedule() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const deleteSchedule = async (scheduleId: string) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).delete(`/admin/schedules/${scheduleId}`);

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/admin\/schedules/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }
      return { response: null, error: error.data.message };
    }
  };

  return { deleteSchedule };
}
