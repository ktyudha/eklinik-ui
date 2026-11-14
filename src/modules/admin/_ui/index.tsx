import { ReactNode, useEffect, useState } from "react";

export { PageHeader, Card, Field, Pager, FormModal, notify } from "./shared";

export function useDebounced<T>(value: T, ms = 350) {
  const [v, setV] = useState(value);
  useEffect(() => { const t = setTimeout(() => setV(value), ms); return () => clearTimeout(t); }, [value, ms]);
  return v;
}

const tones: Record<string, string> = {
  success: "bg-success-50 text-success-600 ring-success-100",
  warning: "bg-warning-50 text-warning-600 ring-warning-100",
  danger: "bg-error-50 text-error-600 ring-error-100",
  info: "bg-brand-50 text-brand-600 ring-brand-100",
  neutral: "bg-gray-100 text-gray-600 ring-gray-200",
};

/** Pil status (pola dhagrafis: pil dengan ring tipis). */
export function StatusPill({ tone = "neutral", children }: { tone?: keyof typeof tones; children: ReactNode }) {
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${tones[tone]}`}>{children}</span>;
}

export function SearchInput({ value, onChange, placeholder = "Cari..." }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="relative w-full sm:w-64">
      <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      <input className="input w-full" style={{ paddingLeft: "2.25rem" }} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-600">{initials || "?"}</span>;
}

export function RowActions({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-end gap-1">{children}</div>;
}

export function ActionBtn({ onClick, tone = "default", children }: { onClick: () => void; tone?: "default" | "danger" | "primary"; children: ReactNode }) {
  const c = tone === "danger" ? "text-error-600 hover:bg-error-50" : tone === "primary" ? "text-brand-600 hover:bg-brand-50" : "text-gray-600 hover:bg-gray-100";
  return <button type="button" onClick={onClick} className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${c}`}>{children}</button>;
}

export interface Column<T> { header: string; cell: (row: T, index: number) => ReactNode; className?: string; hideOnMobile?: boolean }

/** Tabel di desktop, kartu bertumpuk di ponsel. */
export function DataTable<T>({ columns, rows, loading, empty = "Belum ada data.", rowKey }: {
  columns: Column<T>[]; rows?: T[]; loading?: boolean; empty?: string; rowKey: (r: T) => string;
}) {
  if (loading) {
    return <div className="space-y-px p-4">{[0, 1, 2, 3].map((i) => <div key={i} className="skeleton-shimmer h-14 rounded-xl" />)}</div>;
  }
  if (!rows || rows.length === 0) {
    return <div className="py-16 text-center text-gray-400"><p className="text-3xl">🗂️</p><p className="mt-2">{empty}</p></div>;
  }
  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="table">
          <thead><tr>{columns.map((c) => <th key={c.header} className={c.className}>{c.header}</th>)}</tr></thead>
          <tbody>{rows.map((r, i) => <tr key={rowKey(r)}>{columns.map((c) => <td key={c.header} className={c.className}>{c.cell(r, i)}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <ul className="divide-y divide-gray-100 md:hidden">
        {rows.map((r, i) => (
          <li key={rowKey(r)} className="space-y-1.5 p-4">
            {columns.filter((c) => !c.hideOnMobile).map((c) => (
              <div key={c.header} className="flex items-start justify-between gap-3 text-sm">
                <span className="shrink-0 text-gray-400">{c.header}</span>
                <span className="text-right">{c.cell(r, i)}</span>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
}
