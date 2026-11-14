import { FunctionComponent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useClassification, useMedical, isChoice, isMultiple } from "@/services/admin/medical-record/medical-record";
import { rupiah } from "@/services/admin/pharmacy/pharmacy";
import { Card, PageHeader, StatusPill } from "../_ui";

const fmt = (d: string) => new Intl.DateTimeFormat("id-ID", { dateStyle: "full", timeStyle: "short" }).format(new Date(d));
const plain = (s: string) => s.replace(/<\/?[^>]+(>|$)/g, "");
const RX: Record<string, string> = { waiting: "Menunggu", processed: "Disiapkan", completed: "Diserahkan", canceled: "Batal" };

/** Ringkasan satu kunjungan: hasil pemeriksaan per bagian, resep, dan status tagihan. */
const MedicalRecordDetailPage: FunctionComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useMedical(id);
  const m = data?.medical;
  const form = useClassification(m?.classification?.id);

  if (loading || !m) return <p className="text-gray-400">Memuat...</p>;

  const byId = new Map((m.answers ?? []).map((a) => [a.sub_menu.id, a]));
  const answerText = (sid: string, type: string) => {
    const a = byId.get(sid);
    if (!a) return null;
    if (isMultiple(type)) return a.option_ids?.map((o) => o.label).join(", ") || null;
    if (isChoice(type)) return a.option_id?.label ?? null;
    return a.value ?? a.answer ?? null;
  };
  const recipe = m.recipes?.[0];
  const paid = m.payments?.filter((p) => p.status === "paid") ?? [];
  const pending = m.payments?.filter((p) => p.status === "pending") ?? [];

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/admin/medical-record" className="no-print text-sm font-medium text-brand-600">← Rekam medis</Link>
      <PageHeader title={m.patient?.name ?? "Pemeriksaan"} subtitle={`${m.classification?.name ?? ""} · ${fmt(m.checkup_date)}`}
        action={<div className="no-print flex flex-wrap gap-2">
          <button className="btn btn-ghost" onClick={() => window.print()}>Cetak</button>
          <button className="btn btn-outline btn-primary" onClick={() => navigate(`/admin/medical-record/edit/${m.id}`)}>Ubah</button>
          <button className="btn btn-primary" onClick={() => navigate(`/admin/payments?medical=${m.id}`)}>Buat tagihan</button>
        </div>} />

      <div className="print-area space-y-4">
        <Card className="flex flex-wrap items-center gap-x-8 gap-y-1 p-4 text-sm">
          <span><span className="text-gray-400">No. RM</span> <b>{m.patient?.medical_record_number ?? "-"}</b></span>
          <span><span className="text-gray-400">HP</span> <b>{m.patient?.phone_number ?? "-"}</b></span>
          <span className="flex items-center gap-2">
            <span className="text-gray-400">Tagihan</span>
            {paid.length ? <StatusPill tone="success">Lunas {paid.map((p) => (p.includes_exam ? "Pemeriksaan" : "") + (p.includes_exam && p.includes_medicine ? " + " : "") + (p.includes_medicine ? "Obat" : "")).join(", ")}</StatusPill> : null}
            {pending.length ? <StatusPill tone="warning">Menunggu bayar</StatusPill> : null}
            {!paid.length && !pending.length && <StatusPill tone="neutral">Belum ditagih</StatusPill>}
          </span>
        </Card>

        {form.data?.classification.menus.filter((mn) => mn.is_active).map((menu) => {
          const rows = [...menu.submenus].sort((a, b) => a.order - b.order).map((s) => ({ s, v: answerText(s.id, s.type) })).filter((r) => r.v);
          if (!rows.length) return null;
          return (
            <Card key={menu.id} className="p-5">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">{menu.name}</h2>
              <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {rows.map(({ s, v }) => (
                  <div key={s.id} className={["textarea", "textrich"].includes(s.type) ? "sm:col-span-2" : ""}>
                    <dt className="text-xs text-gray-400">{plain(s.name)}</dt>
                    <dd className="whitespace-pre-wrap font-medium text-gray-800">{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          );
        })}

        {recipe && (
          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Resep obat</h2>
              <StatusPill tone={recipe.status === "completed" ? "success" : recipe.status === "canceled" ? "neutral" : "warning"}>{RX[recipe.status] ?? recipe.status}</StatusPill>
            </div>
            <ul className="divide-y divide-gray-100">
              {recipe.medicines.map((x) => (
                <li key={x.id} className="flex justify-between py-2 text-sm"><span>{x.name} <span className="text-gray-400">×{x.quantity} {x.unit}</span></span><span className="text-gray-600">{rupiah(x.price * x.quantity)}</span></li>
              ))}
            </ul>
            {recipe.description && <p className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">Aturan pakai: {recipe.description}</p>}
            <p className="mt-3 text-right font-semibold">Total obat {rupiah(recipe.amount)}</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MedicalRecordDetailPage;
