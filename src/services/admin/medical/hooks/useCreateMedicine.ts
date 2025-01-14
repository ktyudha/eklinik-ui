import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import { ICreateOrUpdateMedicinePayload } from "../interfaces/create-or-update-medical.types";

export default function useCreateMedicine() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createMedicine = async (payload: ICreateOrUpdateMedicinePayload) => {
    const {
      name,
      description,
      medicine_category_id,
      expired_date,
      unit,
      stock,
      price,
    } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).post("/admin/medicines", {
        name,
        description,
        medicine_category_id,
        expired_date,
        unit,
        stock,
        price,
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/admin\/medicines/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }

      return { response: null, error: error.data.message };
    }
  };

  return { createMedicine };
}
