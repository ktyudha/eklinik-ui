/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import { IGetOneQueueResponse } from "../interfaces/get-one-queue.types";

export default function useGetQueue(queueId: string) {

  const fetcher: Fetcher<IGetOneQueueResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: "admin" })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR(`/admin/appointments/${queueId}`, fetcher);

  return {
    loading: !data && !error,
    queue: data?.appointment,
    error,
  };
}
