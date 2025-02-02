/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import { IGetAllQueueResponse } from "../interfaces/get-all-queue.types";
import { useCallback, useState } from "react";
import querystring from "query-string";

export default function useGetAllQueue() {
  const [patientName, setPatientName] = useState("");
  const [complaint, setComplaint] = useState("");
  const [status, setStatus] = useState("");
  const [queueDate, setQueueDate] = useState("");

  const [pageNum, setPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const fetcher: Fetcher<IGetAllQueueResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: "admin" })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    {
      complaint,
      status,
      patient_name: patientName,
      queue_date: queueDate,
      page_limit: pageLimit,
      page: pageNum,
    },
    { skipEmptyString: true, skipNull: true }
  );

  const { data, error } = useSWR(`/admin/appointments?${qs}`, fetcher);

  const onSetPatientName = useCallback((newPatientName: string) => {
    setPatientName(newPatientName);
  }, []);

  const onSetComplaint = useCallback((newComplaint: string) => {
    setComplaint(newComplaint);
  }, []);

  const onSetStatus = useCallback((newStatus: string) => {
    setStatus(newStatus);
  }, []);

  const onSetQueueDate = useCallback((newQueueDate: string) => {
    setQueueDate(newQueueDate);
  }, []);

  return {
    loading: !data && !error,
    appointments: data?.appointments,
    error,
    pagination: data?.pagination,
    pageNum,
    setPageNum,
    pageLimit,
    setPageLimit,
    patientName,
    complaint,
    status,
    setQueueDate: onSetQueueDate,
    setStatus: onSetStatus,
    setComplaint: onSetComplaint,
    setPatientName: onSetPatientName,
  };
}
