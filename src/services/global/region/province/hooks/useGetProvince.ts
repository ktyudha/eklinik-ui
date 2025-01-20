/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import Cookies from "js-cookie";
import { IGetProvinceResponse } from "../interfaces/get-province.types";

export default function useGetProvince(prvinceId: string) {
  const tokenType = Cookies.get("token-patient") ? "patient" : "admin";

  const fetcher: Fetcher<IGetProvinceResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR(`/region/provinces/${prvinceId}`, fetcher);

  return {
    loading: !data && !error,
    province: data?.province,
    error,
  };
}
