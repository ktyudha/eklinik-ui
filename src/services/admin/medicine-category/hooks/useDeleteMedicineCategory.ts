import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";

export default function useDeleteMedicineCategory() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const deleteMedicineCategory = async (medicineCategotyId: string) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).delete(`/admin/medicine-category/${medicineCategotyId}`);

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/admin\/medicine-category/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }
      return { response: null, error: error.data.message };
    }
  };

  return { deleteMedicineCategory };
}
