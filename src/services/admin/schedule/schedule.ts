import { useAdminGet, adminSend } from "@/lib/admin-api";

export interface Schedule {
  id: string;
  day: string;
  start_time: string | null;
  end_time: string | null;
  specific_date: string | null;
  information: string | null;
  is_active: boolean | number;
}

export const DAYS = [
  { key: "Monday", label: "Senin" }, { key: "Tuesday", label: "Selasa" }, { key: "Wednesday", label: "Rabu" },
  { key: "Thursday", label: "Kamis" }, { key: "Friday", label: "Jumat" }, { key: "Saturday", label: "Sabtu" },
  { key: "Sunday", label: "Minggu" },
];

export const useSchedules = () => useAdminGet<{ schedules: Schedule[] }>("/admin/schedules");

const R = "/admin/schedules";
export const scheduleApi = {
  create: (b: unknown) => adminSend("post", R, b, R),
  update: (id: string, b: unknown) => adminSend("put", `${R}/${id}`, b, R),
  remove: (id: string) => adminSend("delete", `${R}/${id}`, undefined, R),
};
