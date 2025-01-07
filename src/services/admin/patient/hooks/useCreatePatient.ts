import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import { ICreatePatientPayload } from "../interfaces/create-patient.types";

export default function useCreatePatient() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createPatient = async (payload: ICreatePatientPayload) => {
    const {
      name,
      username,
      birth_place,
      birth_date,
      nik,
      email,
      phone_number,
      religion,
      gender,
      marital_status,
      education,
      job,
      province_id,
      sub_district_id,
      city_id,
      village,
    } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).post("/admin/patients", {
        name,
        username,
        birth_place,
        birth_date,
        nik,
        email,
        phone_number,
        religion,
        gender,
        marital_status,
        education,
        job,
        province_id,
        sub_district_id,
        city_id,
        village,
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
