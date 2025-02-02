import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import { IUpdateQueuePayload } from "../interfaces/update-queue.types";

export default function useUpdateQueue(queueId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateQueue = async (payload: IUpdateQueuePayload) => {
    const {queue_date,description,status} = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).post(`/admin/appointments/${queueId}`, {
        queue_date,description,status,
        _method: "PUT",
      });

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

  return { updateQueue };
}
