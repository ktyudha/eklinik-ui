import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import { IUpdatePatientPayload } from "../interfaces/update-patient.types";

export default function useUpdatePatient(patientId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updatePatient = async (payload: IUpdatePatientPayload) => {
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
      village_id,
      additional_address,
    } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).post(`/admin/patients/${patientId}`, {
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
        village_id,
        additional_address,
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

  return { updatePatient };
}
