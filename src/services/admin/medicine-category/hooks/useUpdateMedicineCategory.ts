import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import { ICreateOrUpdateMedicineCategoryPayload } from "../interfaces/create-or-update-medicine-category.types";

export default function useUpdatePatient(medicineCategoryId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateMedicineCategory = async (
    payload: ICreateOrUpdateMedicineCategoryPayload
  ) => {
    const { name, description } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).post(`/admin/medicine-category/${medicineCategoryId}`, {
        name,
        description,
        _method: "PUT",
      });

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

  return { updateMedicineCategory };
}
