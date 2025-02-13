/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import { IGetClassificationResponse } from "../interfaces/get-classification.types";

export default function useGetClassification(classificationId: string) {

  const fetcher: Fetcher<IGetClassificationResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType:'admin' })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR(`/admin/classifications/${classificationId}`, fetcher);

  return {
    loading: !data && !error,
    classification: data?.classification,
    error,
  };
}
