/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import Cookies from "js-cookie";
import { IGetAllSubDistrictResponse } from "../interfaces/get-all-sub-district.types";

export default function useGetAllSubDistrict() {
  const tokenType = Cookies.get("token-patient") ? "patient" : "admin";

  const fetcher: Fetcher<IGetAllSubDistrictResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR("/region/sub-districts", fetcher);

  return {
    loading: !data && !error,
    sub_districts: data?.sub_districts,
    error,
  };
}
