/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import { IGetAllMenuResponse } from "../interfaces/get-all-menu.types";
import { useCallback, useState } from "react";
import querystring from "query-string";

export default function useGetAllMenu() {
  const [name, setName] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const fetcher: Fetcher<IGetAllMenuResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: "admin" })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    {
      name,
      page_limit: pageLimit,
      page: pageNum,
    },
    { skipEmptyString: true, skipNull: true }
  );

  const { data, error } = useSWR(`/admin/menu?${qs}`, fetcher);

  const onSetName = useCallback((newName: string) => {
    setName(newName);
  }, []);

  return {
    loading: !data && !error,
    menus: data?.menus,
    error,
    pagination: data?.pagination,
    pageNum,
    setPageNum,
    pageLimit,
    setPageLimit,
    name,
    setName: onSetName,
  };
}
