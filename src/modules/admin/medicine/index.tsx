import { FunctionComponent, useMemo, useState } from "react";
import { ask } from "@/components/reusable/ConfirmSheet";
import { medicineApi, useMedicineCategories, useMedicines, Medicine } from "@/services/admin/crud/crud";
import { rupiah } from "@/services/admin/pharmacy/pharmacy";
import { ActionBtn, Card, DataTable, Field, FormModal, PageHeader, RowActions, SearchInput, StatusPill, notify } from "../_ui";

type Form = { id?: string; medicine_category_id: string; name: string; description: string; expired_date: string; unit: string; stock: string; price: string };
const blank: Form = { medicine_category_id: "", name: "", description: "", expired_date: "", unit: "tablet", stock: "0", price: "0" };
const days = (d: string | null) => (d ? Math.ceil((new Date(d).getTime() - Date.now()) / 86400000) : null);

const MedicineList: FunctionComponent = () => {
  const { data, loading } = useMedicines();
  const cats = useMedicineCategories();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [form, setForm] = useState<Form | null>(null);
  const [busy, setBusy] = useState(false);

  const rows = useMemo(() => (data?.medicines ?? []).filter((m) => (!q || m.name.toLowerCase().includes(q.toLowerCase())) && (!cat || m.medicine_category?.id === cat)), [data, q, cat]);

  const save = async () => {
    if (!form) return;
    setBusy(true);
    const { id, ...b } = form;
    const body = { ...b, description: b.description || null, stock: Number(b.stock), price: Number(b.price) };
    const r = id ? await medicineApi.update(id, body) : await medicineApi.create(body);
    setBusy(false);
    if (notify(r, "Obat tersimpan")) setForm(null);
  };
  const edit = (m: Medicine) => setForm({ id: m.id, medicine_category_id: m.medicine_category?.id ?? "", name: m.name, description: m.description ?? "", expired_date: m.expired_date ? String(m.expired_date).slice(0, 10) : "", unit: m.unit ?? "", stock: String(m.stock), price: String(m.price) });
  const remove = async (m: Medicine) => { if (await ask({ title: `Hapus obat ${m.name}?`, danger: true, confirmLabel: "Ya, hapus" })) notify(await medicineApi.remove(m.id), "Obat dihapus"); };

  return (
    <div>
      <PageHeader title="Obat" subtitle="Stok, harga, dan masa kadaluarsa obat."
        action={<button className="btn btn-primary" onClick={() => setForm(blank)}>+ Obat</button>} />
      <Card>
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row">
          <SearchInput value={q} onChange={setQ} placeholder="Cari nama obat..." />
          <select className="select w-full sm:w-56" value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="">Semua jenis</option>
            {cats.data?.medicine_categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <DataTable<Medicine> loading={loading} rows={rows} rowKey={(m) => m.id} empty="Obat tidak ditemukan."
          columns={[
            { header: "Obat", cell: (m) => <div className="text-left"><p className="font-medium text-gray-800">{m.name}</p><p className="text-xs text-gray-400">{m.medicine_category?.name}</p></div> },
            { header: "Stok", cell: (m) => { const low = Number(m.stock) <= 10; return <StatusPill tone={low ? "warning" : "success"}>{m.stock} {m.unit}{low ? " · menipis" : ""}</StatusPill>; } },
            { header: "Harga", cell: (m) => rupiah(m.price) },
            { header: "Kadaluarsa", cell: (m) => { const d = days(m.expired_date); return <span className={d !== null && d <= 30 ? "font-medium text-error-600" : ""}>{m.expired_date ? String(m.expired_date).slice(0, 10) : "-"}{d !== null && d <= 30 ? ` (${d < 0 ? "lewat" : d + " hr"})` : ""}</span>; } },
            { header: "", className: "text-right", cell: (m) => <RowActions><ActionBtn tone="primary" onClick={() => edit(m)}>Ubah</ActionBtn><ActionBtn tone="danger" onClick={() => remove(m)}>Hapus</ActionBtn></RowActions> },
          ]} />
      </Card>

      <FormModal open={!!form} title={form?.id ? "Ubah Obat" : "Obat Baru"} onClose={() => setForm(null)} onSubmit={save} busy={busy}>
        {form && (<>
          <Field label="Nama obat"><input className="input" required autoFocus value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Jenis">
            <select className="select" required value={form.medicine_category_id} onChange={(e) => setForm({ ...form, medicine_category_id: e.target.value })}>
              <option value="">Pilih jenis</option>
              {cats.data?.medicine_categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Stok"><input type="number" min="0" required className="input" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></Field>
            <Field label="Satuan"><input required className="input" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} /></Field>
            <Field label="Harga"><input type="number" min="0" required className="input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></Field>
          </div>
          <Field label="Kadaluarsa"><input type="date" required className="input" value={form.expired_date} onChange={(e) => setForm({ ...form, expired_date: e.target.value })} /></Field>
          <Field label="Keterangan (opsional)"><input className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
        </>)}
      </FormModal>
    </div>
  );
};

export default MedicineList;
