import { FunctionComponent } from "react";
import type { Payment } from "@/services/admin/pharmacy/pharmacy";
import { rupiah } from "@/services/admin/pharmacy/pharmacy";

const fmt = (d: string | null) => (d ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(d)) : "-");

/** Struk pembayaran; bagian .print-area ikut tercetak. */
const Receipt: FunctionComponent<{ payment: Payment }> = ({ payment: p }) => (
  <div>
    <div className="print-area mx-auto max-w-sm rounded-2xl border border-dashed border-gray-300 bg-white p-5 text-sm">
      <div className="text-center">
        <p className="text-base font-bold">Klinik Bidan Susenowati, S.ST.</p>
        <p className="text-xs text-gray-500">Jl. Nasional 24, Ngoro, Mojokerto</p>
      </div>
      <hr className="my-3 border-dashed border-gray-300" />
      <div className="space-y-0.5 text-xs text-gray-600">
        <div className="flex justify-between"><span>No. Tagihan</span><span className="font-mono">{p.invoice_number}</span></div>
        <div className="flex justify-between"><span>Tanggal</span><span>{fmt(p.paid_at ?? p.created_at)}</span></div>
        <div className="flex justify-between"><span>Pasien</span><span>{p.patient?.name}</span></div>
      </div>
      <hr className="my-3 border-dashed border-gray-300" />
      <ul className="space-y-1.5">
        {p.items.map((i, k) => (
          <li key={k} className="flex justify-between gap-3"><span>{i.name}{i.qty !== 1 && <span className="text-gray-400"> ×{i.qty}</span>}</span><span>{rupiah(i.subtotal)}</span></li>
        ))}
      </ul>
      <hr className="my-3 border-dashed border-gray-300" />
      <div className="flex justify-between text-base font-bold"><span>Total</span><span>{rupiah(p.total_amount)}</span></div>
      {p.method === "cash" && p.status === "paid" && (
        <div className="mt-1 space-y-0.5 text-xs text-gray-600">
          <div className="flex justify-between"><span>Tunai</span><span>{rupiah(p.paid_amount)}</span></div>
          <div className="flex justify-between"><span>Kembali</span><span>{rupiah(p.change_amount)}</span></div>
        </div>
      )}
      <p className="mt-4 text-center text-xs font-semibold uppercase tracking-wider">{p.status === "paid" ? "Lunas" : p.status === "cancel" ? "Dibatalkan" : "Menunggu pembayaran"}</p>
      <p className="mt-1 text-center text-[11px] text-gray-400">Terima kasih, semoga lekas sehat.</p>
    </div>
    <button type="button" onClick={() => window.print()} className="no-print btn btn-primary mx-auto mt-4 flex">Cetak struk</button>
  </div>
);

export default Receipt;
