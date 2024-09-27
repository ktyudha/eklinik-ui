/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import { IGetAllPatientResponse } from "../interfaces/get-all-patient.types";
// import { useCallback, useState } from "react";
// import querystring from "query-string";

export default function useGetRecapDomesticDepartment() {
  //   const [year, setYear] = useState<string>(initialYear);
  //   const [pageNum, setPageNum] = useState(1);
  //   const [pageLimit, setPageLimit] = useState(10);

  const fetcher: Fetcher<IGetAllPatientResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: "admin" })
      .get(url)
      .then((res) => res.data);

  //   const qs = querystring.stringify(
  //     {
  //       type: "department",
  //       year,
  //       page_limit: pageLimit,
  //       page: pageNum,
  //     },
  //     { skipEmptyString: true, skipNull: true }
  //   );

  const { data, error } = useSWR(`/admin/patients`, fetcher);

  //   const onSetYear = useCallback((newYear: string) => {
  //     setYear(newYear);
  //   }, []);

  return {
    loading: !data && !error,
    patients: data?.patients,
    error,
    // pagination: data?.pagination,
    // pageNum,
    // setPageNum,
    // pageLimit,
    // setPageLimit,
    // year,
    // setYear: onSetYear,
  };
}
