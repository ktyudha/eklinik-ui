/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import { IGetAllMedicineCategoryResponse } from "../interfaces/get-all-medicine-category.types";
// import { useCallback, useState } from "react";
// import querystring from "query-string";

export default function useGetAllMedicineCategory() {
  // const [name, setName] = useState("");
  // const [pageNum, setPageNum] = useState(1);
  // const [pageLimit, setPageLimit] = useState(10);

  const fetcher: Fetcher<IGetAllMedicineCategoryResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: "admin" })
      .get(url)
      .then((res) => res.data);

  // const qs = querystring.stringify(
  //   {
  //     name,
  //     page_limit: pageLimit,
  //     page: pageNum,
  //   },
  //   { skipEmptyString: true, skipNull: true }
  // );

  const { data, error } = useSWR(`/admin/medicine-category`, fetcher);

  // const onSetName = useCallback((newName: string) => {
  //   setName(newName);
  // }, []);

  return {
    loading: !data && !error,
    medicine_categories: data?.medicine_categories,
    error,
    // pagination: data?.pagination,
    // pageNum,
    // setPageNum,
    // pageLimit,
    // setPageLimit,
    // name,
    // setName: onSetName,
  };
}
