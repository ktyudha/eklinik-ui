import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";

export default function useDeleteClassification() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const deleteClassification = async (classificationId: string) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).delete(`/admin/classifications/${classificationId}`);

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/admin\/classifications/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }
      return { response: null, error: error.data.message };
    }
  };

  return { deleteClassification };
}
