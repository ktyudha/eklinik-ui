import { FunctionComponent, useState } from "react";
import { ask } from "@/components/reusable/ConfirmSheet";
import { categoryApi, useMedicineCategories, MedicineCategory } from "@/services/admin/crud/crud";
import { ActionBtn, Card, DataTable, Field, FormModal, PageHeader, RowActions, notify } from "../_ui";

const MedicineCategoryList: FunctionComponent = () => {
  const { data, loading } = useMedicineCategories();
  const [form, setForm] = useState<{ id?: string; name: string; description: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    if (!form) return;
    setBusy(true);
    const body = { name: form.name, description: form.description || null };
    const r = form.id ? await categoryApi.update(form.id, body) : await categoryApi.create(body);
    setBusy(false);
    if (notify(r, "Jenis obat tersimpan")) setForm(null);
  };
  const remove = async (c: MedicineCategory) => {
    if (await ask({ title: `Hapus jenis obat ${c.name}?`, message: "Obat dengan jenis ini ikut terhapus.", danger: true, confirmLabel: "Ya, hapus" })) notify(await categoryApi.remove(c.id), "Jenis obat dihapus");
  };

  return (
    <div>
      <PageHeader title="Jenis Obat" subtitle="Kelompok obat untuk memudahkan pencarian."
        action={<button className="btn btn-primary" onClick={() => setForm({ name: "", description: "" })}>+ Jenis obat</button>} />
      <Card>
        <DataTable<MedicineCategory> loading={loading} rows={data?.medicine_categories} rowKey={(c) => c.id} empty="Belum ada jenis obat."
          columns={[
            { header: "Nama", cell: (c) => <span className="font-medium text-gray-800">{c.name}</span> },
            { header: "Keterangan", cell: (c) => <span className="text-gray-500">{c.description || "-"}</span> },
            { header: "", className: "text-right", cell: (c) => <RowActions><ActionBtn tone="primary" onClick={() => setForm({ id: c.id, name: c.name, description: c.description ?? "" })}>Ubah</ActionBtn><ActionBtn tone="danger" onClick={() => remove(c)}>Hapus</ActionBtn></RowActions> },
          ]} />
      </Card>
      <FormModal open={!!form} title={form?.id ? "Ubah Jenis Obat" : "Jenis Obat Baru"} onClose={() => setForm(null)} onSubmit={save} busy={busy}>
        {form && (<>
          <Field label="Nama"><input className="input" required autoFocus value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Keterangan (opsional)"><textarea className="textarea" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
        </>)}
      </FormModal>
    </div>
  );
};

export default MedicineCategoryList;
