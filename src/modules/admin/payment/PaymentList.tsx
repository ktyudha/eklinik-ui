import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { ask } from "@/components/reusable/ConfirmSheet";
import Modal from "@/components/reusable/Modal";
import { adminFetcher } from "@/lib/admin-api";
import { paymentApi, useBillable, useMedicalOptions, usePayments, rupiah, Payment } from "@/services/admin/pharmacy/pharmacy";
import { ActionBtn, Card, DataTable, PageHeader, Pager, RowActions, StatusPill, notify } from "../_ui";
import Receipt from "./Receipt";

const FILTERS = [{ v: "", l: "Semua" }, { v: "pending", l: "Menunggu" }, { v: "paid", l: "Lunas" }, { v: "cancel", l: "Batal" }];
const tone = (s: string) => (s === "paid" ? "success" : s === "cancel" ? "neutral" : "warning");
const label = (s: string) => (s === "paid" ? "Lunas" : s === "cancel" ? "Batal" : "Menunggu");
const fmtDate = (d: string) => new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(d));
const QUICK = [50000, 100000, 200000];

/** Tampilkan QRIS yang belum dibayar: hitung mundur, cek status, dan buat ulang bila kedaluwarsa. */
const QrView: FunctionComponent<{ payment: Payment; onUpdated: (p: Payment) => void; onCheck: (p: Payment) => Promise<void> }> = ({ payment: p, onUpdated, onCheck }) => {
  const [now, setNow] = useState(Date.now());
  const [broken, setBroken] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);

  // Midtrans mengirim waktu WIB tanpa zona
  const exp = p.qris_expires_at ? new Date(p.qris_expires_at.replace(" ", "T") + "+07:00").getTime() : null;
  const left = exp ? Math.max(0, Math.floor((exp - now) / 1000)) : null;
  const expired = (left !== null && left <= 0) || broken;

  const regenerate = async () => {
    setBusy(true);
    const r = await paymentApi.regenerateQris(p.id);
    setBusy(false);
    if (r.error) { notify(r, ""); return; }
    toast.success("QRIS baru dibuat");
    if (r.data?.payment) onUpdated(r.data.payment);
  };

  return (
    <>
      <div className="relative mx-auto h-64 w-64">
        {p.qris_url && !broken && <img src={p.qris_url} alt="QRIS" onError={() => setBroken(true)} className={`h-full w-full object-contain ${expired ? "opacity-20 blur-sm" : ""}`} />}
        {expired && <div className="absolute inset-0 grid place-items-center text-center"><p className="rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-error-600 shadow">QRIS kedaluwarsa</p></div>}
      </div>
      <p className="text-center text-2xl font-bold">{rupiah(p.total_amount)}</p>
      <p className="text-center text-xs text-gray-400">{p.invoice_number}</p>
      {left !== null && !expired && <p className="text-center text-sm font-medium text-brand-600">Berlaku {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}</p>}
      <div className="grid gap-2">
        <button className="btn btn-primary" disabled={busy} onClick={regenerate}>{busy ? "Membuat..." : expired ? "Buat ulang QRIS" : "Muat ulang QRIS"}</button>
        <button className="btn btn-ghost" onClick={() => onCheck(p)}>Cek status pembayaran</button>
      </div>
      <p className="text-center text-xs text-gray-400">Minta pasien memindai QR, lalu tekan "Cek status pembayaran".</p>
    </>
  );
};

const PaymentList: FunctionComponent = () => {
  const [params, setParams] = useSearchParams();
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const { data, loading } = usePayments(page, status);

  const [open, setOpen] = useState(false);
  const [medicalId, setMedicalId] = useState("");
  const [exam, setExam] = useState(true);
  const [med, setMed] = useState(true);
  const [method, setMethod] = useState<"cash" | "qris">("cash");
  const [received, setReceived] = useState("");
  const [busy, setBusy] = useState(false);
  const [receipt, setReceipt] = useState<Payment | null>(null);
  const [qr, setQr] = useState<Payment | null>(null);

  const medicals = useMedicalOptions();
  const billable = useBillable(open ? medicalId : undefined);
  const b = billable.data;

  // dibuka dari rekam medis: ?medical=ID
  useEffect(() => {
    const m = params.get("medical");
    if (m) { setMedicalId(m); setOpen(true); params.delete("medical"); setParams(params, { replace: true }); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // komponen yang sudah ditagih / tidak berbiaya otomatis dimatikan
  useEffect(() => {
    if (!b) return;
    setExam(!b.exam.billed && b.exam.amount > 0);
    setMed(!b.medicine.billed && b.medicine.amount > 0);
  }, [b]);

  const total = useMemo(() => (exam ? b?.exam.amount ?? 0 : 0) + (med ? b?.medicine.amount ?? 0 : 0), [b, exam, med]);
  const cash = Number(received || 0);
  const change = cash - total;
  const canPay = !!b && total > 0 && (method === "qris" || cash >= total);

  const close = () => { setOpen(false); setMedicalId(""); setReceived(""); setMethod("cash"); };

  const submit = async () => {
    setBusy(true);
    const r = await paymentApi.create({ medical_id: medicalId, include_exam: exam, include_medicine: med, method, ...(method === "cash" ? { cash_received: cash } : {}) });
    setBusy(false);
    if (r.error) { notify(r, ""); return; }
    toast.success(method === "cash" ? "Pembayaran tunai tercatat" : "QRIS dibuat");
    close();
    const p = r.data?.payment;
    if (p) method === "qris" ? setQr(p) : setReceipt(p);
  };

  const check = async (p: Payment) => {
    try {
      const res = await adminFetcher<{ data: { transaction_status: string } }>(`/payment-status/${p.order_id ?? p.invoice_number}`);
      toast.info(`Status QRIS: ${res.data.transaction_status}`);
      mutate((k) => typeof k === "string" && k.startsWith("/payments"));
    } catch { toast.error("Gagal memeriksa status"); }
  };
  const cancel = async (p: Payment) => {
    if (await ask({ title: `Batalkan tagihan ${p.invoice_number}?`, message: "Komponen tagihan bisa ditagih ulang.", danger: true, confirmLabel: "Ya, batalkan" })) notify(await paymentApi.cancel(p.id), "Tagihan dibatalkan");
  };

  return (
    <div>
      <PageHeader title="Pembayaran" subtitle="Tagihan per kunjungan: pemeriksaan, obat, atau keduanya."
        action={<button className="btn btn-primary" onClick={() => setOpen(true)}>+ Tagihan</button>} />

      <Card>
        <div className="flex gap-1 border-b border-gray-100 p-4">
          <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
            {FILTERS.map((f) => (
              <button key={f.v} onClick={() => { setStatus(f.v); setPage(1); }}
                className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all ${status === f.v ? "bg-white text-brand-600 shadow-sm" : "text-gray-500"}`}>{f.l}</button>
            ))}
          </div>
        </div>
        <DataTable<Payment> loading={loading} rows={data?.payments} rowKey={(p) => p.id} empty="Belum ada tagihan."
          columns={[
            { header: "Tagihan", cell: (p) => <div className="text-left"><p className="font-mono text-xs text-gray-700">{p.invoice_number}</p><p className="text-xs text-gray-400">{fmtDate(p.created_at)}</p></div> },
            { header: "Pasien", cell: (p) => <span className="font-medium text-gray-800">{p.patient?.name ?? "-"}</span> },
            { header: "Rincian", cell: (p) => <div className="flex flex-wrap gap-1">{p.includes_exam && <StatusPill tone="info">Pemeriksaan</StatusPill>}{p.includes_medicine && <StatusPill tone="info">Obat</StatusPill>}</div> },
            { header: "Total", cell: (p) => <span className="font-semibold">{rupiah(p.total_amount)}</span> },
            { header: "Metode", cell: (p) => <span className="uppercase text-gray-500">{p.method === "cash" ? "Tunai" : "QRIS"}</span> },
            { header: "Status", cell: (p) => <StatusPill tone={tone(p.status)}>{label(p.status)}</StatusPill> },
            { header: "", className: "text-right", cell: (p) => (
              <RowActions>
                <ActionBtn onClick={() => setReceipt(p)}>Struk</ActionBtn>
                {p.status === "pending" && p.method === "qris" && <><ActionBtn tone="primary" onClick={() => setQr(p)}>QRIS</ActionBtn><ActionBtn onClick={() => check(p)}>Cek status</ActionBtn></>}
                {p.status !== "cancel" && !(p.status === "paid" && p.method === "qris") && <ActionBtn tone="danger" onClick={() => cancel(p)}>Batalkan</ActionBtn>}
              </RowActions>) },
          ]} />
        <Pager p={data?.pagination} onPage={setPage} />
      </Card>

      {/* Tagihan baru */}
      <Modal onOpen={open} title="Tagihan Baru" modalSize="md" onClose={close}>
        <label className="block">
          <span className="label-text mb-1 block font-medium">Kunjungan (rekam medis)</span>
          <select className="select w-full" value={medicalId} onChange={(e) => setMedicalId(e.target.value)}>
            <option value="">Pilih kunjungan</option>
            {medicals.data?.medicals.map((m) => <option key={m.id} value={m.id}>{m.patient.name} · {m.classification?.name} · {String(m.checkup_date).slice(0, 10)}</option>)}
          </select>
        </label>

        {b && (
          <>
            <div>
              <span className="label-text mb-2 block font-medium">Yang ditagih</span>
              <div className="space-y-2">
                {([
                  { key: "exam", title: "Biaya pemeriksaan", on: exam, set: setExam, d: b.exam },
                  { key: "med", title: "Obat resep", on: med, set: setMed, d: b.medicine },
                ] as const).map(({ key, title, on, set, d }) => {
                  const disabled = d.billed || d.amount <= 0;
                  return (
                    <label key={key} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all ${disabled ? "cursor-not-allowed bg-gray-50 opacity-60" : on ? "border-brand-500 bg-brand-50/60 ring-2 ring-brand-500/15" : "border-gray-200"}`}>
                      <input type="checkbox" className="checkbox checkbox-primary mt-0.5" disabled={disabled} checked={on && !disabled} onChange={(e) => set(e.target.checked)} />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2"><span className="font-semibold text-gray-800">{title}</span><span className="font-semibold">{rupiah(d.amount)}</span></span>
                        <span className="block text-xs text-gray-500">
                          {d.billed ? "Sudah ditagih" : d.amount <= 0 ? "Tidak ada biaya / belum ada resep" : d.items.map((i) => `${i.name}${i.qty !== 1 ? ` ×${i.qty}` : ""}`).join(", ")}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="label-text mb-2 block font-medium">Metode</span>
              <div className="grid grid-cols-2 gap-1 rounded-xl bg-gray-100 p-1">
                {(["cash", "qris"] as const).map((m) => (
                  <button key={m} type="button" onClick={() => setMethod(m)} className={`rounded-lg py-2 text-sm font-semibold transition-all ${method === m ? "bg-white text-brand-600 shadow-sm" : "text-gray-500"}`}>{m === "cash" ? "Tunai" : "QRIS"}</button>
                ))}
              </div>
            </div>

            {method === "cash" && (
              <div className="rounded-2xl bg-gray-50 p-4">
                <label className="block">
                  <span className="label-text mb-1 block font-medium">Uang diterima</span>
                  <input type="number" min="0" className="input w-full text-lg font-semibold" value={received} onChange={(e) => setReceived(e.target.value)} placeholder="0" />
                </label>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <button type="button" onClick={() => setReceived(String(total))} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-600 ring-1 ring-brand-100">Uang pas</button>
                  {QUICK.map((q) => <button key={q} type="button" onClick={() => setReceived(String(q))} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200">{rupiah(q)}</button>)}
                </div>
                {cash > 0 && <p className={`mt-3 text-sm font-semibold ${change >= 0 ? "text-success-600" : "text-error-600"}`}>{change >= 0 ? `Kembalian ${rupiah(change)}` : `Kurang ${rupiah(-change)}`}</p>}
              </div>
            )}

            <div className="flex items-center justify-between rounded-2xl bg-gray-900 px-5 py-4 text-white">
              <span className="text-sm text-gray-300">Total tagihan</span><span className="text-2xl font-bold">{rupiah(total)}</span>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" className="btn btn-ghost" onClick={close}>Batal</button>
              <button type="button" className="btn btn-primary" disabled={!canPay || busy} onClick={submit}>{busy ? "Memproses..." : method === "cash" ? "Bayar sekarang" : "Buat QRIS"}</button>
            </div>
          </>
        )}
      </Modal>

      <Modal onOpen={!!receipt} title="Struk Pembayaran" modalSize="sm" onClose={() => setReceipt(null)}>{receipt && <Receipt payment={receipt} />}</Modal>

      <Modal onOpen={!!qr} title="Scan QRIS" modalSize="sm" onClose={() => setQr(null)}>
        {qr && <QrView key={qr.id + (qr.qris_url ?? "")} payment={qr} onUpdated={setQr} onCheck={check} />}
      </Modal>
    </div>
  );
};

export default PaymentList;
