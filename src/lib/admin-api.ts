import useSWR, { mutate } from "swr";
import axiosInstance from "@/lib/axios-instance";

export interface Pagination { current_page: number; last_page: number; total: number; per_page: number }

const client = () => axiosInstance({ withToken: true, tokenType: "admin" });

export const adminFetcher = <T,>(url: string) =>
  client().get<T>(url).then((r) => r.data);

/** SWR GET untuk endpoint admin; `null` menunda request. */
export function useAdminGet<T>(url: string | null) {
  const { data, error, isLoading } = useSWR<T>(url, adminFetcher<T>);
  return { data, error, loading: isLoading };
}

type Method = "post" | "put" | "delete";

/** Mutasi + revalidate semua cache dengan prefix tertentu. Mengembalikan {data,error}. */
export async function adminSend<T = unknown>(
  method: Method,
  url: string,
  body?: unknown,
  revalidatePrefix?: string
): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await client().request<T>({ method, url, data: body });
    if (revalidatePrefix) {
      await mutate((k) => typeof k === "string" && k.startsWith(revalidatePrefix));
    }
    return { data: res.data, error: null };
  } catch (e: any) {
    const status = e?.status ?? 500;
    const fieldErrors = e?.data?.errors
      ? Object.values(e.data.errors as Record<string, string[]>).flat().join(" ")
      : null;
    return {
      data: null,
      error: status >= 500 ? "Terjadi kesalahan pada server" : fieldErrors || e?.data?.message || "Gagal",
    };
  }
}
