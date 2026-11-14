import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminFetcher } from "@/lib/admin-api";
import { downloadCsv } from "@/helpers/export-csv";
import { ask } from "@/components/reusable/ConfirmSheet";
import { medicalApi, useMedicals, Medical } from "@/services/admin/medical-record/medical-record";
import { ActionBtn, Avatar, Card, DataTable, PageHeader, Pager, RowActions, SearchInput, StatusPill, notify, useDebounced } from "../_ui";

const fmt = (d: string) => new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(d));

const MedicalRecordListPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const name = useDebounced(q);
  const { data, loading } = useMedicals(page, name);

  const remove = async (m: Medical) => {
    if (!(await ask({ title: `Hapus rekam medis ${m.patient?.name}?`, message: "Data tidak dapat dikembalikan.", danger: true, confirmLabel: "Ya, hapus" }))) return;
    notify(await medicalApi.remove(m.id), "Rekam medis dihapus");
  };
  const exportCsv = async () => {
    const res = await adminFetcher<{ medicals: Medical[] }>("/admin/medical?page_limit=100");
    downloadCsv(`rekam-medis-${new Date().toISOString().slice(0, 10)}.csv`, res.medicals.map((m) => ({
      Tanggal: String(m.checkup_date).slice(0, 16).replace("T", " "), "No. RM": m.patient?.medical_record_number ?? "", Pasien: m.patient?.name ?? "", Kategori: m.classification?.name ?? "",
    })));
  };

  return (
    <div>
      <PageHeader title="Rekam Medis" subtitle="Riwayat pemeriksaan semua pasien."
        action={<div className="flex flex-wrap gap-2">
          <button className="btn btn-outline btn-primary" onClick={exportCsv}>Ekspor CSV</button>
          <button className="btn btn-primary" onClick={() => navigate("create")}>+ Pemeriksaan</button>
        </div>} />
      <Card>
        <div className="border-b border-gray-100 p-4"><SearchInput value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Cari nama pasien..." /></div>
        <DataTable<Medical> loading={loading} rows={data?.medicals} rowKey={(m) => m.id} empty="Belum ada rekam medis."
          columns={[
            { header: "Pasien", cell: (m) => <div className="flex items-center gap-3 text-left"><Avatar name={m.patient?.name ?? ""} /><div><p className="font-medium text-gray-800">{m.patient?.name}</p><p className="text-xs text-gray-400">{m.patient?.medical_record_number ?? "Belum ada No. RM"}</p></div></div> },
            { header: "Kategori", cell: (m) => <StatusPill tone="info">{m.classification?.name ?? "-"}</StatusPill> },
            { header: "Tanggal kunjungan", cell: (m) => fmt(m.checkup_date) },
            { header: "", className: "text-right", hideOnMobile: false, cell: (m) => (
              <RowActions><ActionBtn onClick={() => navigate(m.id)}>Lihat</ActionBtn><ActionBtn tone="primary" onClick={() => navigate(`edit/${m.id}`)}>Ubah</ActionBtn><ActionBtn tone="danger" onClick={() => remove(m)}>Hapus</ActionBtn></RowActions>) },
          ]} />
        <Pager p={data?.pagination} onPage={setPage} />
      </Card>
    </div>
  );
};

export default MedicalRecordListPage;
