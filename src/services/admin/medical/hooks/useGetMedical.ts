/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import { IGetMedicalResponse } from "../interfaces/get-medical.types";

export default function useGetMedical(medicalId: string) {

  const fetcher: Fetcher<IGetMedicalResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: 'admin' })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR(`/admin/medical/${medicalId}`, fetcher);

  return {
    loading: !data && !error,
    medical: data?.medical,
    error,
  };
}
