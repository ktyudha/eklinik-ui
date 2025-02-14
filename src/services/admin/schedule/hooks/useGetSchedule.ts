/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import { IGetClassificationResponse } from "../interfaces/get-schedule.types";

export default function useGetSchedule(scheduleId: string) {

  const fetcher: Fetcher<IGetClassificationResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType:'admin' })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR(`/admin/schedules/${scheduleId}`, fetcher);

  return {
    loading: !data && !error,
    schedule: data?.schedule,
    error,
  };
}
