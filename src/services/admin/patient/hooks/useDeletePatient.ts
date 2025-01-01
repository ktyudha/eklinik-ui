import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";

export default function useDeletePatient() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const deletePatient = async (patientId: string) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).delete(`/admin/patients/${patientId}`);

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/admin\/patients/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }
      return { response: null, error: error.data.message };
    }
  };

  return { deletePatient };
}
