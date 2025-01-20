/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import Cookies from "js-cookie";
import { IGetAllVillageResponse } from "../interfaces/get-all-sub-village.types";

export default function useGetAllVillage() {
  const tokenType = Cookies.get("token-patient") ? "patient" : "admin";

  const fetcher: Fetcher<IGetAllVillageResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR("/region/villages", fetcher);

  return {
    loading: !data && !error,
    villages: data?.villages,
    error,
  };
}
