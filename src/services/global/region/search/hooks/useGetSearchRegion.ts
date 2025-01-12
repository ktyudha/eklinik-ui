/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import { IGetSearchRegionResponse } from "../interfaces/get-search-region.types";
import { useCallback, useState } from "react";
import querystring from "query-string";

export default function useGetSearchRegion() {
  const [name, setName] = useState("");

  const fetcher: Fetcher<IGetSearchRegionResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: "admin" })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    {
      name,
    },
    { skipEmptyString: true, skipNull: true }
  );

  const { data, error } = useSWR(`/region/search?${qs}`, fetcher);

  const onSetName = useCallback((newName: string) => {
    setName(newName);
  }, []);

  return {
    loading: !data && !error,
    regions: data?.regions,
    error,
    name,
    setName: onSetName,
  };
}
