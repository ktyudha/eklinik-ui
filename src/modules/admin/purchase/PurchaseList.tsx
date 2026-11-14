import { ask } from "@/components/reusable/ConfirmSheet";
import { FunctionComponent, useState } from "react";
import { purchaseApi, usePurchases, usePurchase, useBatches, useMedicineOptions, rupiah } from "@/services/admin/pharmacy/pharmacy";
import { PageHeader, Card, Field, Pager, FormModal, notify } from "../_ui";

type Row = { id: string; quantity: string; price: string; expired_date: string };
const row = (): Row => ({ id: "", quantity: "1", price: "", expired_date: "" });
const today = () => new Date().toISOString().slice(0, 10);
const daysLeft = (d: string | null) => (d ? Math.ceil((new Date(d).getTime() - Date.now()) / 86400000) : null);

const PurchaseList: FunctionComponent = () => {
  const [tab, setTab] = useState<"purchases" | "batches">("purchases");
  const [page, setPage] = useState(1);
  const { data, loading } = usePurchases(page);
  const batches = useBatches();
  const medicines = useMedicineOptions();
  const [detailId, setDetailId] = useState<string | null>(null);
  const detail = usePurchase(detailId);
  const [form, setForm] = useState<{ supplier: string; purchase_date: string; medicines: Row[] } | null>(null);
  const [busy, setBusy] = useState(false);

  const setRow = (i: number, p: Partial<Row>) => setForm((f) => f && { ...f, medicines: f.medicines.map((r, j) => (j === i ? { ...r, ...p } : r)) });
  const total = (form?.medicines ?? []).reduce((s, r) => s + Number(r.quantity || 0) * Number(r.price || 0), 0);

  const save = async () => {
    if (!form) return;
    setBusy(true);
    const r = await purchaseApi.create({ ...form, medicines: form.medicines.map((m) => ({ ...m, quantity: Number(m.quantity), price: Number(m.price) })) });
    setBusy(false);
    if (notify(r, "Pembelian tersimpan, stok bertambah")) setForm(null);
  };
  const remove = async (id: string) => {
    if (await ask({ title: "Hapus faktur? Stok obat dari batch ini akan dikurangi.", danger: true, confirmLabel: "Ya, hapus" })) notify(await purchaseApi.remove(id), "Faktur dihapus");
  };

  return (
    <div>
      <PageHeader title="Pembelian & Batch Obat" subtitle="Setiap pembelian membuat batch baru dan menambah stok."
        action={<button className="btn btn-primary" onClick={() => setForm({ supplier: "", purchase_date: today(), medicines: [row()] })}>+ Pembelian</button>} />
      <div role="tablist" className="tabs tabs-boxed w-fit mb-4">
        <button role="tab" className={`tab ${tab === "purchases" ? "tab-active" : ""}`} onClick={() => setTab("purchases")}>Faktur</button>
        <button role="tab" className={`tab ${tab === "batches" ? "tab-active" : ""}`} onClick={() => setTab("batches")}>Batch & kadaluarsa</button>
      </div>

      {tab === "purchases" ? (
        <Card>
          <div className="overflow-x-auto"><table className="table">
            <thead><tr><th>Faktur</th><th>Supplier</th><th>Tanggal</th><th>Item</th><th>Total</th><th /></tr></thead>
            <tbody>
              {loading && <tr><td colSpan={6} className="text-center py-8">Memuat...</td></tr>}
              {data?.medicine_purchases.map((p) => (
                <tr key={p.id} className="hover">
                  <td className="font-mono text-sm">{p.invoice_number}</td><td className="font-medium">{p.supplier}</td>
                  <td>{String(p.purchase_date).slice(0, 10)}</td><td>{p.items_count}</td><td>{rupiah(p.amount)}</td>
                  <td className="text-right space-x-1">
                    <button className="btn btn-xs btn-ghost" onClick={() => setDetailId(p.id)}>Detail</button>
                    <button className="btn btn-xs btn-ghost text-error" onClick={() => remove(p.id)}>Hapus</button>
                  </td>
                </tr>
              ))}
              {data && data.medicine_purchases.length === 0 && <tr><td colSpan={6} className="text-center py-8 text-slate-400">Belum ada pembelian.</td></tr>}
            </tbody>
          </table></div>
          <Pager p={data?.pagination} onPage={setPage} />
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto"><table className="table">
            <thead><tr><th>Batch</th><th>Obat</th><th>Sisa / awal</th><th>Kadaluarsa</th></tr></thead>
            <tbody>
              {batches.data?.medicine_batches.map((b) => {
                const d = daysLeft(b.expired_date);
                return (
                  <tr key={b.id} className="hover">
                    <td className="font-mono text-sm">{b.code}</td><td className="font-medium">{b.medicine.name}</td>
                    <td>{b.stock} / {b.opening_stock} {b.medicine.unit}</td>
                    <td>{b.expired_date ? String(b.expired_date).slice(0, 10) : "-"}{" "}
                      {d !== null && <span className={`badge badge-sm ${d < 0 ? "badge-error" : d <= 30 ? "badge-warning" : "badge-ghost"}`}>{d < 0 ? "kadaluarsa" : `${d} hari`}</span>}</td>
                  </tr>
                );
              })}
              {batches.data?.medicine_batches.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-slate-400">Belum ada batch.</td></tr>}
            </tbody>
          </table></div>
        </Card>
      )}

      <FormModal open={!!form} title="Pembelian Obat" onClose={() => setForm(null)} onSubmit={save} busy={busy}>
        {form && (<>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Supplier"><input className="input input-bordered" required value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} /></Field>
            <Field label="Tanggal"><input type="date" max={today()} className="input input-bordered" required value={form.purchase_date} onChange={(e) => setForm({ ...form, purchase_date: e.target.value })} /></Field>
          </div>
          {form.medicines.map((r, i) => (
            <div key={i} className="rounded-lg border border-base-300 p-3 space-y-2">
              <select className="select select-bordered w-full" required value={r.id} onChange={(e) => setRow(i, { id: e.target.value })}>
                <option value="">Pilih obat</option>
                {medicines.data?.medicines.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
              <div className="grid grid-cols-3 gap-2">
                <input type="number" min="1" required placeholder="Jumlah" className="input input-bordered" value={r.quantity} onChange={(e) => setRow(i, { quantity: e.target.value })} />
                <input type="number" min="0" required placeholder="Harga satuan" className="input input-bordered" value={r.price} onChange={(e) => setRow(i, { price: e.target.value })} />
                <input type="date" min={today()} required className="input input-bordered" value={r.expired_date} onChange={(e) => setRow(i, { expired_date: e.target.value })} />
              </div>
              {form.medicines.length > 1 && <button type="button" className="btn btn-xs btn-ghost text-error" onClick={() => setForm({ ...form, medicines: form.medicines.filter((_, j) => j !== i) })}>Hapus baris</button>}
            </div>
          ))}
          <button type="button" className="btn btn-sm btn-ghost text-primary" onClick={() => setForm({ ...form, medicines: [...form.medicines, row()] })}>+ Tambah obat</button>
          <p className="text-right text-sm text-slate-500">Total: <b className="text-base-content">{rupiah(total)}</b></p>
        </>)}
      </FormModal>

      <FormModal open={!!detailId} title={detail.data?.medicine_purchase.invoice_number ?? "Detail"} onClose={() => setDetailId(null)} onSubmit={() => setDetailId(null)} submitLabel="Tutup">
        <table className="table table-sm">
          <thead><tr><th>Obat</th><th>Batch</th><th>Qty</th><th>Harga</th></tr></thead>
          <tbody>{detail.data?.medicine_purchase.items?.map((it) => (
            <tr key={it.id}><td>{it.batch.medicine.name}</td><td className="font-mono text-xs">{it.batch.code}</td><td>{it.quantity}</td><td>{rupiah(it.price)}</td></tr>
          ))}</tbody>
        </table>
      </FormModal>
    </div>
  );
};

export default PurchaseList;
