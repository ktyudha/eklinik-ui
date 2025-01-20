/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import Cookies from "js-cookie";
import { IGetVillageResponse } from "../interfaces/get-village.types";

export default function useGetCity(villageId: string) {
  const tokenType = Cookies.get("token-patient") ? "patient" : "admin";

  const fetcher: Fetcher<IGetVillageResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR(`/region/villages/${villageId}`, fetcher);

  return {
    loading: !data && !error,
    village: data?.village,
    error,
  };
}
