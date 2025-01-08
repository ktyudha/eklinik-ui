import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import { ICreateOrUpdateMedicineCategoryPayload } from "../interfaces/create-or-update-medicine-category.types";

export default function useCreateMedicineCategory() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createMedicineCategory = async (
    payload: ICreateOrUpdateMedicineCategoryPayload
  ) => {
    const { name, description } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).post("/admin/medicine-category", {
        name,
        description,
      });

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

  return { createMedicineCategory };
}
