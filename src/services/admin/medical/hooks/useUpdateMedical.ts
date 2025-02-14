import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import { ICreateOrUpdateMedicalPayload } from "../interfaces/create-or-update-medical.types";

export default function useUpdateMedical(medicalId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateMedical = async (payload: ICreateOrUpdateMedicalPayload) => {
    const {
        patient_id,
        classification_id,
        checkup_date,
        submenu
    } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).post(`/admin/medical/${medicalId}`, {
        patient_id,
      classification_id,
      checkup_date,
      submenu,
        _method: "PUT",
      });

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

  return { updateMedical };
}
