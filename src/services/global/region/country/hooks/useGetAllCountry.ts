/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import Cookies from "js-cookie";
import { IGetAllCountryResponse } from "../interfaces/get-all-country.types";

export default function useGetAllCountry() {
  const tokenType = Cookies.get("token-patient") ? "patient" : "admin";

  const fetcher: Fetcher<IGetAllCountryResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR("/region/countries", fetcher);

  return {
    loading: !data && !error,
    countries: data?.countries,
    error,
  };
}
