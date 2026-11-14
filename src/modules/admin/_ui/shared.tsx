import { FunctionComponent, ReactNode } from "react";
import { toast } from "react-toastify";
import Modal from "@/components/reusable/Modal";
import type { Pagination } from "@/lib/admin-api";

export const notify = (r: { error: string | null }, ok: string) =>
  r.error ? (toast.error(r.error), false) : (toast.success(ok), true);

export const PageHeader: FunctionComponent<{ title: string; subtitle?: string; action?: ReactNode }> = ({ title, subtitle, action }) => (
  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && <p className="text-slate-500 text-sm">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export const Card: FunctionComponent<{ children: ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`surface ${className}`}>{children}</div>
);

export const Field: FunctionComponent<{ label: string; children: ReactNode }> = ({ label, children }) => (
  <label className="form-control w-full">
    <span className="label-text mb-1 font-medium">{label}</span>
    {children}
  </label>
);

export const Pager: FunctionComponent<{ p?: Pagination; onPage: (n: number) => void }> = ({ p, onPage }) =>
  !p || p.last_page <= 1 ? null : (
    <div className="flex items-center justify-between px-5 py-3 border-t border-base-300 text-sm">
      <span className="text-slate-500">Halaman {p.current_page} dari {p.last_page} · {p.total} data</span>
      <div className="join">
        <button className="btn btn-sm join-item" disabled={p.current_page <= 1} onClick={() => onPage(p.current_page - 1)}>Sebelumnya</button>
        <button className="btn btn-sm join-item" disabled={p.current_page >= p.last_page} onClick={() => onPage(p.current_page + 1)}>Berikutnya</button>
      </div>
    </div>
  );

export const FormModal: FunctionComponent<{
  open: boolean; title: string; onClose: () => void; onSubmit: () => void; busy?: boolean; children: ReactNode; submitLabel?: string;
}> = ({ open, title, onClose, onSubmit, busy, children, submitLabel = "Simpan" }) => (
  <Modal onOpen={open} title={title} modalSize="md" onClose={onClose}>
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      {children}
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="btn btn-ghost" onClick={onClose}>Batal</button>
        <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? "Menyimpan..." : submitLabel}</button>
      </div>
    </form>
  </Modal>
);
