import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";

export default function useCreateQueue() { 
  const revalidateMutationsByKey = useRevalidateMutation();
  
  const createQueue = async (patient_id: string, description: string) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).post("/admin/appointments", {patient_id, description });

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
  return { createQueue };
}
 
