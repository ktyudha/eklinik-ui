import { mutate } from "swr";
import { adminSend, useAdminGet } from "@/lib/admin-api";

export interface BuilderCategory { id: string; name: string; description?: string | null; price?: string | number; menus?: { id: string }[] }
export interface BuilderMenu { id: string; name: string; is_active: boolean | number }

export const useCategories = () => useAdminGet<{ classifications: BuilderCategory[] }>("/admin/classifications?limit=100");
export const useAllMenus = () => useAdminGet<{ menus: BuilderMenu[] }>("/admin/menu?limit=100");

export const QUESTION_TYPES = [
  { type: "input:text", label: "Teks singkat", hint: "Satu baris jawaban", icon: "Aa" },
  { type: "textarea", label: "Paragraf", hint: "Jawaban panjang", icon: "¶" },
  { type: "input:number", label: "Angka", hint: "Mis. tekanan darah", icon: "123" },
  { type: "date", label: "Tanggal", hint: "Pilih tanggal", icon: "📅" },
  { type: "time", label: "Jam", hint: "Pilih jam", icon: "🕒" },
  { type: "radio", label: "Pilih satu", hint: "Satu dari beberapa opsi", icon: "◉" },
  { type: "checkbox", label: "Pilih banyak", hint: "Boleh lebih dari satu", icon: "☑" },
  { type: "select", label: "Dropdown", hint: "Daftar pilihan", icon: "▾" },
] as const;
export const hasOptions = (t: string) => ["radio", "checkbox", "select", "combobox"].includes(t);
export const typeLabel = (t: string) => QUESTION_TYPES.find((x) => x.type === t)?.label ?? t;

export const OPTION_PRESETS: { label: string; options: string[] }[] = [
  { label: "Ya / Tidak", options: ["Ya", "Tidak"] },
  { label: "Normal / Tidak normal", options: ["Normal", "Tidak normal"] },
  { label: "Positif / Negatif", options: ["Positif", "Negatif"] },
  { label: "Ringan / Sedang / Berat", options: ["Ringan", "Sedang", "Berat"] },
];

const refresh = () => mutate((k) => typeof k === "string" && (k.startsWith("/admin/classifications") || k.startsWith("/admin/menu") || k.startsWith("/admin/sub-menus")));
async function run<T>(p: Promise<{ data: T | null; error: string | null }>) { const r = await p; if (!r.error) await refresh(); return r; }

export const categoryBuilderApi = {
  create: (b: { name: string; price: string; description?: string; menu: string[] }) => run(adminSend("post", "/admin/classifications", b)),
  update: (id: string, b: { name: string; price: string; description?: string; menu: string[] }) => run(adminSend("put", `/admin/classifications/${id}`, b)),
  remove: (id: string) => run(adminSend("delete", `/admin/classifications/${id}`)),
};
export const sectionApi = {
  create: (name: string) => run(adminSend<{ menu: BuilderMenu }>("post", "/admin/menu", { name, is_active: 1 })),
  rename: (id: string, name: string) => run(adminSend("put", `/admin/menu/${id}`, { name, is_active: 1 })),
};
export interface QuestionBody { menu_id: string; name: string; type: string; is_required: boolean; is_active: boolean; order: number; options?: { id?: string; label: string; value: string; order: number; is_active: boolean }[] }
export const questionApi = {
  create: (b: QuestionBody) => run(adminSend("post", "/admin/sub-menus", b)),
  update: (id: string, b: QuestionBody) => run(adminSend("put", `/admin/sub-menus/${id}`, b)),
  remove: (id: string) => run(adminSend("delete", `/admin/sub-menus/${id}`)),
};
