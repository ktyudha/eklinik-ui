import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import { ICreatePatientPayload } from "../interfaces/create-patient.types";

export default function useCreatePatient() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createPatient = async (payload: ICreatePatientPayload) => {
    // const { name } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).post("/admin/patients", {
        payload,
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

  return { createPatient };
}
