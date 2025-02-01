import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";

export default function useCancelQueue(queueId: string) { 
  const revalidateMutationsByKey = useRevalidateMutation();
  
  const cancelQueue = async () => {
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "patient",
      }).post(`/patient/appointments/cancel/${queueId}`);

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/patient\/appointments\/cancel/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }

      return { response: null, error: error.data.message };
    }
  };
  return { cancelQueue };
}
 
