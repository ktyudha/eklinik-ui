import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import { ICreateOrUpdateClassificationPayload } from "../interfaces/create-or-update-classification.types";

export default function useUpdateClassification(classificationId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateClassification = async (
    payload: ICreateOrUpdateClassificationPayload
  ) => {
    const { name, description, price, menu } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).post(`/admin/classifications/${classificationId}`, {
        name,
        description,
        price,
        menu,
        _method: "PUT",
      });

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

  return { updateClassification };
}
