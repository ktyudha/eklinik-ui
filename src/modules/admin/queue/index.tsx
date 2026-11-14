import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ask } from "@/components/reusable/ConfirmSheet";
import { appointmentApi, useAppointments, Appointment } from "@/services/admin/crud/crud";
import { usePatientsLite } from "@/services/admin/medical-record/medical-record";
import { ActionBtn, Card, DataTable, Field, FormModal, PageHeader, Pager, RowActions, SearchInput, StatusPill, notify, useDebounced } from "../_ui";

const FILTERS = [{ v: "", l: "Semua" }, { v: "waiting", l: "Menunggu" }, { v: "finished", l: "Selesai" }, { v: "cancel", l: "Batal" }];
const tone = (s: string) => (s === "finished" ? "success" : s === "cancel" ? "danger" : "warning");
const label = (s: string) => (s === "finished" ? "Selesai" : s === "cancel" ? "Batal" : "Menunggu");
const today = () => new Date().toISOString().slice(0, 10);

const QueueList: FunctionComponent = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [date, setDate] = useState(today());
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const name = useDebounced(q);
  const { data, loading } = useAppointments(page, status, date, name);
  const patients = usePatientsLite();
  const [form, setForm] = useState<{ patient_id: string; description: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const create = async () => {
    if (!form) return;
    setBusy(true);
    const r = await appointmentApi.create(form);
    setBusy(false);
    if (notify(r, "Antrian dibuat")) setForm(null);
  };
  const setState = async (a: Appointment, s: string) =>
    notify(await appointmentApi.update(a.id, { queue_date: a.queue_date, description: a.description, status: s }), `Antrian ${a.queue_number} ${label(s).toLowerCase()}`);
  const remove = async (a: Appointment) => {
    if (await ask({ title: `Hapus antrian ${a.queue_number}?`, danger: true, confirmLabel: "Ya, hapus" })) notify(await appointmentApi.remove(a.id), "Antrian dihapus");
  };

  return (
    <div>
      <PageHeader title="Antrian" subtitle="Kelola antrian pasien hari ini."
        action={<button className="btn btn-primary" onClick={() => setForm({ patient_id: "", description: "" })}>+ Antrian</button>} />
      <Card>
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
            {FILTERS.map((f) => (
              <button key={f.v} onClick={() => { setStatus(f.v); setPage(1); }}
                className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all ${status === f.v ? "bg-white text-brand-600 shadow-sm" : "text-gray-500"}`}>{f.l}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <input type="date" className="input w-auto" value={date} onChange={(e) => { setDate(e.target.value); setPage(1); }} />
            {date && <button className="btn btn-ghost btn-sm self-center" onClick={() => setDate("")}>Semua tanggal</button>}
            <SearchInput value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Cari pasien..." />
          </div>
        </div>
        <DataTable<Appointment> loading={loading} rows={data?.appointments} rowKey={(a) => a.id} empty="Tidak ada antrian pada filter ini."
          columns={[
            { header: "No.", cell: (a) => <span className="grid h-9 w-14 place-items-center rounded-lg bg-brand-50 font-bold text-brand-600">{a.queue_number}</span> },
            { header: "Pasien", cell: (a) => <span className="font-medium text-gray-800">{a.patient?.name}</span> },
            { header: "Keluhan", cell: (a) => <span className="text-gray-500">{a.description}</span> },
            { header: "Jam", cell: (a) => new Date(a.queue_date).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) },
            { header: "Status", cell: (a) => <StatusPill tone={tone(a.status)}>{label(a.status)}</StatusPill> },
            { header: "", className: "text-right", cell: (a) => (
              <RowActions>
                {a.status === "waiting" && <ActionBtn tone="primary" onClick={() => navigate(`/admin/medical-record/create?patient=${a.patient.id}&queue=${a.id}`)}>Periksa</ActionBtn>}
                {a.status === "waiting" && <ActionBtn onClick={() => setState(a, "finished")}>Selesai</ActionBtn>}
                {a.status === "waiting" && <ActionBtn onClick={() => setState(a, "cancel")}>Batalkan</ActionBtn>}
                {a.status !== "waiting" && <ActionBtn onClick={() => setState(a, "waiting")}>Buka lagi</ActionBtn>}
                <ActionBtn tone="danger" onClick={() => remove(a)}>Hapus</ActionBtn>
              </RowActions>) },
          ]} />
        <Pager p={data?.pagination} onPage={setPage} />
      </Card>

      <FormModal open={!!form} title="Antrian Baru" onClose={() => setForm(null)} onSubmit={create} busy={busy}>
        {form && (<>
          <Field label="Pasien">
            <select className="select" required value={form.patient_id} onChange={(e) => setForm({ ...form, patient_id: e.target.value })}>
              <option value="">Pilih pasien</option>
              {patients.data?.patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </Field>
          <Field label="Keluhan"><textarea className="textarea" required rows={2} placeholder="Mis. Kontrol kehamilan" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
        </>)}
      </FormModal>
    </div>
  );
};

export default QueueList;
