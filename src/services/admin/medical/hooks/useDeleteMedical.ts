import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";

export default function useDeleteMedical() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const deleteMedical = async (medicalId: string) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).delete(`/admin/medical/${medicalId}`);

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/admin\/medical/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }
      return { response: null, error: error.data.message };
    }
  };

  return { deleteMedical };
}
