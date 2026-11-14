import useSWR from "swr";
import axiosInstance from "@/lib/axios-instance";
import type { Queue } from "../queue/interfaces/get-all-queue.types";
import type { Medicine } from "../medicine/interfaces/get-all-medicine.types";

const get = <T,>(url: string) =>
  axiosInstance({ withToken: true, tokenType: "admin" })
    .get<T>(url)
    .then((r) => r.data);

const today = () => new Date().toISOString().slice(0, 10);

/** Ringkasan beranda: dihitung dari endpoint admin yang sudah ada. */
export default function useDashboardSummary() {
  const date = today();
  const queues = useSWR(
    `/admin/appointments?queue_date=${date}&page_limit=100`,
    get<{ appointments: Queue[]; pagination: { total: number } }>
  );
  const patients = useSWR(
    `/admin/patients?page_limit=1`,
    get<{ pagination: { total: number } }>
  );
  const medicines = useSWR(`/admin/medicines`, get<{ medicines: Medicine[] }>);

  const list = queues.data?.appointments ?? [];
  const meds = medicines.data?.medicines ?? [];
  const now = Date.now();
  const in30 = now + 30 * 86400000;

  return {
    loading: !queues.data && !queues.error,
    queueToday: list,
    waiting: list.filter((q) => q.status !== "finished" && q.status !== "cancel"),
    finished: list.filter((q) => q.status === "finished").length,
    cancelled: list.filter((q) => q.status === "cancel").length,
    totalPatients: patients.data?.pagination.total ?? 0,
    lowStock: meds.filter((m) => Number(m.stock) <= 10),
    expiring: meds.filter((m) => {
      const t = new Date(m.expired_date).getTime();
      return !isNaN(t) && t <= in30;
    }),
  };
}
