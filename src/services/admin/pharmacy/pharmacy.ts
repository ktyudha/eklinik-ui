import { useAdminGet, adminSend } from "@/lib/admin-api";
import type { Pagination } from "@/lib/admin-api";

export interface RecipeItem { id: string; name: string; unit: string | null; price: number; stock: number; quantity: number }
export interface Recipe {
  id: string; description: string | null; status: "waiting" | "processed" | "completed" | "canceled" | string; amount: number;
  payment_status: "paid" | "pending" | null; created_at: string;
  patient: { id: string; name: string } | null;
  medical: { id: string; checkup_date: string; classification_name: string | null } | null;
  medicines: RecipeItem[];
}
export interface BillItem { type: "exam" | "medicine"; name: string; price: number; qty: number; subtotal: number }
export interface Payment {
  id: string; invoice_number: string; order_id: string | null; status: "pending" | "paid" | "cancel" | string; method: "cash" | "qris" | null;
  includes_exam: boolean; includes_medicine: boolean; exam_amount: number; medicine_amount: number; total_amount: number;
  paid_amount: number; change_amount: number; items: BillItem[]; paid_at: string | null; created_at: string; qris_url: string | null; qris_expires_at: string | null;
  patient: { id: string; name: string; medical_record_number: string | null } | null;
  medical: { id: string; checkup_date: string; classification_name: string | null } | null;
  recipe: { id: string; status: string } | null;
}
export interface Billable {
  medical_id: string; patient: { id: string; name: string };
  exam: { amount: number; items: BillItem[]; billed: boolean };
  medicine: { amount: number; items: BillItem[]; billed: boolean };
}
export interface Purchase { id: string; supplier: string; invoice_number: string; purchase_date: string; amount: number; items_count?: number;
  items?: { id: string; quantity: number; price: number; amount: number; batch: { code: string; expired_date: string; stock: number; medicine: { name: string; unit: string } } }[] }
export interface Batch { id: string; code: string; stock: number; opening_stock: number; expired_date: string | null; medicine: { id: string; name: string; unit: string } }
export interface UserRow { id: string; name: string; username: string; email: string; initials: string | null; roles?: string[] }

export const useRecipes = (page = 1) => useAdminGet<{ recipes: Recipe[]; pagination: Pagination }>(`/admin/recipes?page=${page}&page_limit=10`);
export const usePayments = (page = 1, status = "") => useAdminGet<{ payments: Payment[]; pagination: Pagination }>(`/payments?page=${page}&page_limit=10&status=${status}`);
export const useBillable = (medicalId?: string) => useAdminGet<Billable>(medicalId ? `/payments/billable/${medicalId}` : null);
export const usePurchases = (page = 1) => useAdminGet<{ medicine_purchases: Purchase[]; pagination: Pagination }>(`/admin/medicine-purchases?page=${page}`);
export const usePurchase = (id: string | null) => useAdminGet<{ medicine_purchase: Purchase }>(id ? `/admin/medicine-purchases/${id}` : null);
export const useBatches = () => useAdminGet<{ medicine_batches: Batch[] }>("/admin/medicine-batches");
export const useUsers = (page = 1, name = "") => useAdminGet<{ users: UserRow[]; pagination: Pagination }>(`/admin/users?page=${page}&name=${encodeURIComponent(name)}`);
export const usePatientOptions = () => useAdminGet<{ patients: { id: string; name: string }[] }>("/admin/patients?page_limit=100");
export const useMedicalOptions = () => useAdminGet<{ medicals: { id: string; checkup_date: string; classification: { id: string; name: string } | null; patient: { id: string; name: string } }[] }>("/admin/medical?page_limit=100");
export const useMedicineOptions = () => useAdminGet<{ medicines: { id: string; name: string; unit: string; stock: string; price: number }[] }>("/admin/medicines");

export const recipeApi = {
  create: (b: unknown) => adminSend("post", "/admin/recipes", b, "/admin/recipes"),
  update: (id: string, b: unknown) => adminSend("put", `/admin/recipes/${id}`, b, "/admin/recipes"),
  dispense: (id: string) => adminSend("post", `/admin/recipes/${id}/dispense`, {}, "/admin/"),
  remove: (id: string) => adminSend("delete", `/admin/recipes/${id}`, undefined, "/admin/recipes"),
};
export const paymentApi = {
  create: (b: { medical_id: string; include_exam: boolean; include_medicine: boolean; method: "cash" | "qris"; cash_received?: number }) =>
    adminSend<{ payment: Payment }>("post", "/payments", b, "/"),
  cancel: (id: string) => adminSend("post", `/payments/${id}/cancel`, {}, "/"),
  regenerateQris: (id: string) => adminSend<{ payment: Payment }>("post", `/payments/${id}/regenerate-qris`, {}, "/"),
  remove: (id: string) => adminSend("delete", `/payments/${id}`, undefined, "/"),
};
export const purchaseApi = {
  create: (b: unknown) => adminSend("post", "/admin/medicine-purchases", b, "/admin/medicine"),
  remove: (id: string) => adminSend("delete", `/admin/medicine-purchases/${id}`, undefined, "/admin/medicine"),
};

export const rupiah = (n: number | string | null | undefined) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(n ?? 0));
