import { FunctionComponent, useState } from "react";
import { ask } from "@/components/reusable/ConfirmSheet";
import Modal from "@/components/reusable/Modal";
import { patientApi, usePatients, Patient } from "@/services/admin/crud/crud";
import { ActionBtn, Avatar, Card, DataTable, PageHeader, Pager, RowActions, SearchInput, StatusPill, notify, useDebounced } from "../_ui";
import PatientFormSheet from "./PatientModals/CreatePatientModal";

const age = (d: string | null) => {
  if (!d) return "-";
  const diff = Date.now() - new Date(d).getTime();
  const y = Math.floor(diff / 31557600000);
  return y >= 1 ? `${y} th` : `${Math.max(0, Math.floor(diff / 2629800000))} bln`;
};

const Row: FunctionComponent<{ label: string; value?: string | null }> = ({ label, value }) => (
  <div className="flex justify-between gap-4 border-b border-gray-100 py-2 text-sm"><span className="text-gray-400">{label}</span><span className="text-right font-medium text-gray-800">{value || "-"}</span></div>
);

const PatientList: FunctionComponent = () => {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const name = useDebounced(q);
  const { data, loading } = usePatients(page, name);
  const [form, setForm] = useState<{ open: boolean; patient: Patient | null }>({ open: false, patient: null });
  const [detail, setDetail] = useState<Patient | null>(null);

  const remove = async (p: Patient) => {
    if (!(await ask({ title: `Hapus pasien ${p.name}?`, message: "Rekam medis terkait ikut terhapus.", danger: true, confirmLabel: "Ya, hapus" }))) return;
    notify(await patientApi.remove(p.id), "Pasien dihapus");
  };

  return (
    <div>
      <PageHeader title="Pasien" subtitle="Data identitas pasien klinik."
        action={<button className="btn btn-primary" onClick={() => setForm({ open: true, patient: null })}>+ Pasien</button>} />
      <Card>
        <div className="border-b border-gray-100 p-4"><SearchInput value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Cari nama pasien..." /></div>
        <DataTable<Patient> loading={loading} rows={data?.patients} rowKey={(p) => p.id} empty="Belum ada pasien."
          columns={[
            { header: "Pasien", cell: (p) => <div className="flex items-center gap-3 text-left"><Avatar name={p.name} /><div><p className="font-medium text-gray-800">{p.name}</p><p className="text-xs text-gray-400">{p.phone_number || p.nik || "-"}</p></div></div> },
            { header: "No. RM", cell: (p) => p.medical_record_number ? <span className="font-mono text-xs">{p.medical_record_number}</span> : <span className="text-gray-300">-</span> },
            { header: "Jenis kelamin", cell: (p) => <StatusPill tone={p.gender === "Perempuan" ? "danger" : "info"}>{p.gender}</StatusPill> },
            { header: "Umur", cell: (p) => age(p.birth_date) },
            { header: "", className: "text-right", cell: (p) => (
              <RowActions><ActionBtn onClick={() => setDetail(p)}>Detail</ActionBtn><ActionBtn tone="primary" onClick={() => setForm({ open: true, patient: p })}>Ubah</ActionBtn><ActionBtn tone="danger" onClick={() => remove(p)}>Hapus</ActionBtn></RowActions>) },
          ]} />
        <Pager p={data?.pagination} onPage={setPage} />
      </Card>

      <PatientFormSheet onOpen={form.open} patient={form.patient} onClose={() => setForm({ open: false, patient: null })} />

      <Modal onOpen={!!detail} title="Detail Pasien" modalSize="sm" onClose={() => setDetail(null)}>
        {detail && (
          <div>
            <div className="mb-3 flex items-center gap-3"><Avatar name={detail.name} /><div><p className="font-semibold">{detail.name}</p><p className="text-xs text-gray-400">{detail.medical_record_number ?? "Belum ada No. RM"}</p></div></div>
            <Row label="NIK" value={detail.nik} /><Row label="No. HP" value={detail.phone_number} /><Row label="Email" value={detail.email} />
            <Row label="Tempat, tgl lahir" value={[detail.birth_place, detail.birth_date?.slice(0, 10)].filter(Boolean).join(", ")} />
            <Row label="Agama" value={detail.religion} /><Row label="Status" value={detail.marital_status} /><Row label="Pendidikan" value={detail.education} />
            <Row label="Pekerjaan" value={detail.job} /><Row label="Alamat" value={detail.additional_address} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PatientList;
