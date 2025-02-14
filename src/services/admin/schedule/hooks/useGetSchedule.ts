/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import { IGetScheduleResponse } from "../interfaces/get-schedule.types";

export default function useGetSchedule(scheduleId: string) {

  const fetcher: Fetcher<IGetScheduleResponse, string> = (url) =>
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
