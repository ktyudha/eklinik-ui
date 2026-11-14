import { useAdminGet, adminSend } from "@/lib/admin-api";
import type { Pagination } from "@/lib/admin-api";
import type { Payment, Recipe } from "../pharmacy/pharmacy";

export interface Option { id: string; label: string; value: string; order?: number }
export interface SubMenu { id: string; name: string; type: string; is_active: boolean; is_required: boolean; order: number; options?: Option[] }
export interface Menu { id: string; name: string; is_active: boolean | number | string; submenus: SubMenu[] }
export interface Classification { id: string; name: string; description?: string; price?: number | string; menus: Menu[] }
export interface Medical {
  id: string; checkup_date: string;
  classification: { id: string; name: string } | null;
  patient: { id: string; name: string; medical_record_number: string | null; nik?: string; phone_number?: string } | null;
  answers?: {
    id: string; sub_menu: { id: string; name: string; type: string };
    answer?: string; value?: string; option_id?: Option | null; option_ids?: Option[];
  }[];
  recipes?: Recipe[];
  payments?: Payment[];
}

export const useMedicals = (page: number, name: string) =>
  useAdminGet<{ medicals: Medical[]; pagination: Pagination }>(`/admin/medical?page=${page}&page_limit=10&name=${encodeURIComponent(name)}`);
export const useMedical = (id?: string) => useAdminGet<{ medical: Medical }>(id ? `/admin/medical/${id}` : null);
export const useClassifications = () => useAdminGet<{ classifications: { id: string; name: string }[] }>("/admin/classifications");
export const useClassification = (id?: string) => useAdminGet<{ classification: Classification }>(id ? `/admin/classifications/${id}` : null);
export const usePatientsLite = () => useAdminGet<{ patients: { id: string; name: string; medical_record_number: string | null }[] }>("/admin/patients?page_limit=100");

export const medicalApi = {
  create: (b: unknown) => adminSend("post", "/admin/medical", b, "/admin/medical"),
  update: (id: string, b: unknown) => adminSend("put", `/admin/medical/${id}`, b, "/admin/medical"),
  remove: (id: string) => adminSend("delete", `/admin/medical/${id}`, undefined, "/admin/medical"),
};

export const isChoice = (t: string) => ["radio", "select", "combobox"].includes(t);
export const isMultiple = (t: string) => t === "checkbox";
