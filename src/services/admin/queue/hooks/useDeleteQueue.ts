import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";

export default function useDeleteQueue() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const deleteQueue = async (queueId: string) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).delete(`/admin/appointments/${queueId}`);

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/admin\/appointments/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }
      return { response: null, error: error.data.message };
    }
  };

  return { deleteQueue };
}
