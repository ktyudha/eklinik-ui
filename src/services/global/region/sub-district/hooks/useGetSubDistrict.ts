/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import Cookies from "js-cookie";
import { IGetSubDistrictResponse } from "../interfaces/get-sub-district.types";

export default function useGetSubDistrict(subDistrictId: string) {
  const tokenType = Cookies.get("token-patient") ? "patient" : "admin";

  const fetcher: Fetcher<IGetSubDistrictResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR(
    `/region/sub-districts/${subDistrictId}`,
    fetcher
  );

  return {
    loading: !data && !error,
    sub_district: data?.sub_district,
    error,
  };
}
