import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import { ICreateOrUpdateClassificationPayload } from "../interfaces/create-or-update-classification.types";

export default function useCreateClassification() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createClassification = async (
    payload: ICreateOrUpdateClassificationPayload
  ) => {
    const { name, description, price, menu } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).post("/admin/classifications", {
        name,
        description,
        price,
        menu,
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

  return { createClassification };
}
