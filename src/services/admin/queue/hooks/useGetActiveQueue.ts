/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import { IGetOneActiveQueueResponse } from "../interfaces/get-one-active-queue.types";

export default function useGetActiveQueue() {

  const fetcher: Fetcher<IGetOneActiveQueueResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: "patient" })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR(`/patient/appointments/active`, fetcher);

  return {
    loading: !data && !error,
    queue_number_now: data?.queue_number_now,
    queue: data?.appointment,
    error,
  };
}
