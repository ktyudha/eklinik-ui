import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ask } from "@/components/reusable/ConfirmSheet";
import { recipeApi, useRecipes, rupiah, Recipe } from "@/services/admin/pharmacy/pharmacy";
import { ActionBtn, Card, DataTable, PageHeader, Pager, RowActions, StatusPill, notify } from "../_ui";

const STATUS: Record<string, { label: string; tone: "warning" | "info" | "success" | "neutral" }> = {
  waiting: { label: "Menunggu", tone: "warning" }, processed: { label: "Disiapkan", tone: "info" },
  completed: { label: "Diserahkan", tone: "success" }, canceled: { label: "Batal", tone: "neutral" },
};

/** Antrian apotek: resep dari pemeriksaan -> serahkan obat (stok otomatis berkurang). */
const RecipeList: FunctionComponent = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, loading } = useRecipes(page);

  const dispense = async (r: Recipe) => {
    const unpaid = r.payment_status !== "paid";
    const ok = await ask({
      title: `Serahkan obat untuk ${r.patient?.name}?`,
      message: `${r.medicines.map((m) => `${m.name} ×${m.quantity}`).join(", ")}. Stok akan berkurang.${unpaid ? " ⚠ Obat belum tercatat lunas." : ""}`,
      confirmLabel: "Ya, serahkan",
    });
    if (ok) notify(await recipeApi.dispense(r.id), "Obat diserahkan, stok diperbarui");
  };
  const cancel = async (r: Recipe) => {
    if (await ask({ title: "Batalkan resep ini?", danger: true, confirmLabel: "Ya, batalkan" })) notify(await recipeApi.update(r.id, {
      patient_id: r.patient?.id, medical_id: r.medical?.id, description: r.description, status: "canceled", medicine: r.medicines.map((m) => ({ id: m.id, quantity: m.quantity })),
    }), "Resep dibatalkan");
  };

  return (
    <div>
      <PageHeader title="Resep" subtitle="Resep dari pemeriksaan. Serahkan obat setelah pasien membayar." />
      <Card>
        <DataTable<Recipe> loading={loading} rows={data?.recipes} rowKey={(r) => r.id} empty="Belum ada resep. Resep dibuat dari form rekam medis."
          columns={[
            { header: "Pasien", cell: (r) => <div className="text-left"><p className="font-medium text-gray-800">{r.patient?.name ?? "-"}</p><p className="text-xs text-gray-400">{r.medical?.classification_name} · {r.medical ? String(r.medical.checkup_date).slice(0, 10) : ""}</p></div> },
            { header: "Obat", cell: (r) => <ul className="space-y-0.5 text-left text-sm">{r.medicines.map((m) => <li key={m.id}><span className="text-gray-800">{m.name}</span> <span className="text-gray-400">×{m.quantity}</span>{m.stock < m.quantity && r.status !== "completed" && <span className="ml-1 text-xs font-medium text-error-600">stok kurang</span>}</li>)}{r.description && <li className="text-xs text-gray-400">“{r.description}”</li>}</ul> },
            { header: "Total", cell: (r) => <span className="font-semibold">{rupiah(r.amount)}</span> },
            { header: "Bayar", cell: (r) => r.payment_status === "paid" ? <StatusPill tone="success">Lunas</StatusPill> : r.payment_status === "pending" ? <StatusPill tone="warning">Menunggu</StatusPill> : <StatusPill tone="neutral">Belum ditagih</StatusPill> },
            { header: "Status", cell: (r) => <StatusPill tone={STATUS[r.status]?.tone ?? "neutral"}>{STATUS[r.status]?.label ?? r.status}</StatusPill> },
            { header: "", className: "text-right", cell: (r) => (
              <RowActions>
                {r.payment_status !== "paid" && r.status !== "completed" && r.status !== "canceled" && r.medical && <ActionBtn onClick={() => navigate(`/admin/payments?medical=${r.medical!.id}`)}>Tagih</ActionBtn>}
                {r.status !== "completed" && r.status !== "canceled" && <ActionBtn tone="primary" onClick={() => dispense(r)}>Serahkan</ActionBtn>}
                {r.status !== "completed" && r.status !== "canceled" && <ActionBtn tone="danger" onClick={() => cancel(r)}>Batalkan</ActionBtn>}
                {r.medical && <Link to={`/admin/medical-record/${r.medical.id}`} className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100">Rekam medis</Link>}
              </RowActions>) },
          ]} />
        <Pager p={data?.pagination} onPage={setPage} />
      </Card>
    </div>
  );
};

export default RecipeList;
