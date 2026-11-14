import { FunctionComponent, useEffect, useState } from "react";
import type { Patient } from "@/services/admin/crud/crud";
import { adminSend } from "@/lib/admin-api";
import { RELIGION, MARITAL_STATUS, EDUCATION, JOB } from "@/constant/utils";
import { FormModal, Field, notify } from "@/modules/admin/_ui";

interface Props { onOpen: boolean; onClose: () => void; patient?: Patient | null }

const blank = {
  name: "", gender: "Perempuan", birth_date: "", phone_number: "",
  nik: "", email: "", birth_place: "", religion: "", marital_status: "", education: "", job: "", additional_address: "",
};

const Select: FunctionComponent<{ value: string; onChange: (v: string) => void; options: { label: string; value: string | number }[] }> = ({ value, onChange, options }) => (
  <select className="select select-bordered w-full" value={value} onChange={(e) => onChange(e.target.value)}>
    <option value="">Pilih</option>
    {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

/** Form cepat: hanya 4 isian wajib. Data lengkap boleh menyusul. */
const CreatePatientModal: FunctionComponent<Props> = ({ onOpen, onClose, patient }) => {
  const [f, setF] = useState(blank);
  const [more, setMore] = useState(false);
  const [busy, setBusy] = useState(false);
  const editing = !!patient;

  useEffect(() => {
    if (!onOpen) return;
    if (patient) {
      setF({
        name: patient.name ?? "", gender: patient.gender ?? "Perempuan", birth_date: patient.birth_date ? String(patient.birth_date).slice(0, 10) : "",
        phone_number: patient.phone_number ?? "", nik: patient.nik ?? "", email: patient.email ?? "", birth_place: patient.birth_place ?? "",
        religion: patient.religion ?? "", marital_status: patient.marital_status ?? "", education: patient.education ?? "", job: patient.job ?? "",
        additional_address: patient.additional_address ?? "",
      });
      setMore(true);
    } else { setF(blank); setMore(false); }
  }, [onOpen, patient]);

  const set = (k: keyof typeof blank) => (v: string) => setF((s) => ({ ...s, [k]: v }));

  const close = () => { setF(blank); setMore(false); onClose(); };

  const save = async () => {
    setBusy(true);
    // kirim hanya isian yang terisi
    const body = Object.fromEntries(Object.entries(f).filter(([, v]) => v !== ""));
    const r = editing
      ? await adminSend("put", `/admin/patients/${patient!.id}`, { ...f }, "/admin/patients")
      : await adminSend("post", "/admin/patients", body, "/admin/patients");
    setBusy(false);
    if (notify(r, editing ? "Data pasien diperbarui" : "Pasien berhasil ditambahkan")) close();
  };

  return (
    <FormModal open={onOpen} title={editing ? "Ubah Pasien" : "Pasien Baru"} onClose={close} onSubmit={save} busy={busy}>
      <Field label="Nama lengkap">
        <input className="input input-bordered" required autoFocus placeholder="Mis. Siti Nurhaliza" value={f.name} onChange={(e) => set("name")(e.target.value)} />
      </Field>

      <div>
        <span className="label-text mb-1 block font-medium">Jenis kelamin</span>
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
          {["Perempuan", "Laki-laki"].map((g) => (
            <button key={g} type="button" onClick={() => set("gender")(g)}
              className={`rounded-lg py-2 text-sm font-semibold transition-all ${f.gender === g ? "bg-white text-primary shadow-sm" : "text-slate-500"}`}>{g}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Tanggal lahir"><input type="date" required className="input input-bordered" value={f.birth_date} onChange={(e) => set("birth_date")(e.target.value)} /></Field>
        <Field label="No. HP"><input type="tel" required inputMode="tel" placeholder="08xxxxxxxxxx" className="input input-bordered" value={f.phone_number} onChange={(e) => set("phone_number")(e.target.value)} /></Field>
      </div>

      <button type="button" className="text-sm font-semibold text-primary" onClick={() => setMore((m) => !m)}>
        {more ? "− Sembunyikan data tambahan" : "+ Tambah data lengkap (opsional)"}
      </button>

      {more && (
        <div className="space-y-3 rounded-2xl bg-slate-50 p-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="NIK"><input className="input input-bordered" value={f.nik} onChange={(e) => set("nik")(e.target.value)} /></Field>
            <Field label="Email"><input type="email" className="input input-bordered" value={f.email} onChange={(e) => set("email")(e.target.value)} /></Field>
            <Field label="Tempat lahir"><input className="input input-bordered" value={f.birth_place} onChange={(e) => set("birth_place")(e.target.value)} /></Field>
            <Field label="Agama"><Select value={f.religion} onChange={set("religion")} options={RELIGION} /></Field>
            <Field label="Status pernikahan"><Select value={f.marital_status} onChange={set("marital_status")} options={MARITAL_STATUS} /></Field>
            <Field label="Pendidikan"><Select value={f.education} onChange={set("education")} options={EDUCATION} /></Field>
          </div>
          <Field label="Pekerjaan"><Select value={f.job} onChange={set("job")} options={JOB} /></Field>
          <Field label="Alamat"><textarea className="textarea textarea-bordered" rows={2} value={f.additional_address} onChange={(e) => set("additional_address")(e.target.value)} /></Field>
        </div>
      )}
    </FormModal>
  );
};

export default CreatePatientModal;
