/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import Cookies from "js-cookie";
import { IGetAllProvinceResponse } from "../interfaces/get-all-province.types";

export default function useGetAllProvince() {
  const tokenType = Cookies.get("token-student")
    ? "student"
    : Cookies.get("token-school")
    ? "school"
    : Cookies.get("token-agency")
    ? "agency"
    : "admin";

  const fetcher: Fetcher<IGetAllProvinceResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR("/region/provinces", fetcher);

  return {
    loading: !data && !error,
    provinces: data?.provinces,
    error,
  };
}
