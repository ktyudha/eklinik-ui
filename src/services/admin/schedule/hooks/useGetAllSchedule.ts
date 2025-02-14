/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import { IGetAllScheduleResponse } from "@/services/global/schedule/interfaces/get-all-schedules.types";

export default function useGetAllSchedule() {


  const fetcher: Fetcher<IGetAllScheduleResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: "admin" })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR(`/admin/schedules`, fetcher);

  return {
    loading: !data && !error,
    schedules: data?.schedules,
    error,

  };
}
