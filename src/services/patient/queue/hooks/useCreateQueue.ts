import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";

export default function useCreateQueue() { 
  const revalidateMutationsByKey = useRevalidateMutation();
  
  const createQueue = async (description: string) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "patient",
      }).post("/patient/appointments", { description });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/patient\/appointments/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }

      return { response: null, error: error.data.message };
    }
  };
  return { createQueue };
}
 
