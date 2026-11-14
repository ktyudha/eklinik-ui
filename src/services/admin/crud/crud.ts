import { useAdminGet, adminSend } from "@/lib/admin-api";
import type { Pagination } from "@/lib/admin-api";

export interface Patient {
  id: string; medical_record_number: string | null; name: string; username?: string; nik: string | null; email: string | null;
  phone_number: string | null; religion: string | null; gender: string; birth_place: string | null; birth_date: string | null;
  marital_status: string | null; education: string | null; job: string | null; additional_address: string | null;
}
export interface Appointment { id: string; queue_number: string; queue_date: string; description: string; status: "waiting" | "finished" | "cancel" | string; patient: { id: string; name: string } }
export interface MedicineCategory { id: string; name: string; description: string | null }
export interface Medicine { id: string; name: string; description: string | null; expired_date: string | null; unit: string | null; stock: number | string; price: number | string; medicine_category: MedicineCategory | null }

export const usePatients = (page: number, name: string) => useAdminGet<{ patients: Patient[]; pagination: Pagination }>(`/admin/patients?page=${page}&page_limit=10&name=${encodeURIComponent(name)}`);
export const useAppointments = (page: number, status: string, date: string, name: string) =>
  useAdminGet<{ appointments: Appointment[]; pagination: Pagination }>(`/admin/appointments?page=${page}&page_limit=10&status=${status}&queue_date=${date}&patient_name=${encodeURIComponent(name)}`);
export const useMedicines = () => useAdminGet<{ medicines: Medicine[] }>("/admin/medicines");
export const useMedicineCategories = () => useAdminGet<{ medicine_categories: MedicineCategory[] }>("/admin/medicine-category");

export const patientApi = {
  create: (b: unknown) => adminSend("post", "/admin/patients", b, "/admin/patients"),
  update: (id: string, b: unknown) => adminSend("put", `/admin/patients/${id}`, b, "/admin/patients"),
  remove: (id: string) => adminSend("delete", `/admin/patients/${id}`, undefined, "/admin/patients"),
};
export const appointmentApi = {
  create: (b: unknown) => adminSend("post", "/admin/appointments", b, "/admin/appointments"),
  update: (id: string, b: unknown) => adminSend("put", `/admin/appointments/${id}`, b, "/admin/appointments"),
  remove: (id: string) => adminSend("delete", `/admin/appointments/${id}`, undefined, "/admin/appointments"),
};
export const medicineApi = {
  create: (b: unknown) => adminSend("post", "/admin/medicines", b, "/admin/medicine"),
  update: (id: string, b: unknown) => adminSend("put", `/admin/medicines/${id}`, b, "/admin/medicine"),
  remove: (id: string) => adminSend("delete", `/admin/medicines/${id}`, undefined, "/admin/medicine"),
};
export const categoryApi = {
  create: (b: unknown) => adminSend("post", "/admin/medicine-category", b, "/admin/medicine-category"),
  update: (id: string, b: unknown) => adminSend("put", `/admin/medicine-category/${id}`, b, "/admin/medicine-category"),
  remove: (id: string) => adminSend("delete", `/admin/medicine-category/${id}`, undefined, "/admin/medicine-category"),
};
