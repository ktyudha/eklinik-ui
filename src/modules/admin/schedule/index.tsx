import { ask } from "@/components/reusable/ConfirmSheet";
import { FunctionComponent, useState } from "react";
import { DAYS, Schedule, scheduleApi, useSchedules } from "@/services/admin/schedule/schedule";
import { PageHeader, Field, FormModal, notify } from "../_ui";

const hhmm = (t: string | null) => (t ? t.slice(0, 5) : "");
type Form = { id?: string; day: string; start_time: string; end_time: string; specific_date: string; information: string; is_active: boolean };
const blank = (day = "Monday"): Form => ({ day, start_time: "08:00", end_time: "14:00", specific_date: "", information: "", is_active: true });

const ScheduleBoard: FunctionComponent = () => {
  const { data, loading } = useSchedules();
  const [form, setForm] = useState<Form | null>(null);
  const [busy, setBusy] = useState(false);
  const list = data?.schedules ?? [];

  const save = async () => {
    if (!form) return;
    setBusy(true);
    const { id, ...rest } = form;
    const body = { ...rest, specific_date: rest.specific_date || null, information: rest.information || null };
    const r = id ? await scheduleApi.update(id, body) : await scheduleApi.create(body);
    setBusy(false);
    if (notify(r, "Jadwal tersimpan")) setForm(null);
  };
  const toggle = async (s: Schedule) => {
    notify(await scheduleApi.update(s.id, {
      day: s.day, start_time: hhmm(s.start_time) || null, end_time: hhmm(s.end_time) || null,
      specific_date: s.specific_date ? String(s.specific_date).slice(0, 10) : null, information: s.information, is_active: !s.is_active,
    }), s.is_active ? "Jadwal dinonaktifkan" : "Jadwal diaktifkan");
  };
  const remove = async (s: Schedule) => { if (await ask({ title: "Hapus jadwal ini?", danger: true, confirmLabel: "Ya, hapus" })) notify(await scheduleApi.remove(s.id), "Jadwal dihapus"); };
  const edit = (s: Schedule) => setForm({
    id: s.id, day: s.day, start_time: hhmm(s.start_time), end_time: hhmm(s.end_time),
    specific_date: s.specific_date ? String(s.specific_date).slice(0, 10) : "", information: s.information ?? "", is_active: !!s.is_active,
  });

  return (
    <div>
      <PageHeader title="Jadwal Bidan" subtitle="Atur jam praktik per hari. Pasien melihat jadwal ini di halaman utama."
        action={<button className="btn btn-primary" onClick={() => setForm(blank())}>+ Tambah jadwal</button>} />

      {loading && <p className="text-slate-400">Memuat...</p>}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {DAYS.map((d) => {
          const items = list.filter((s) => s.day === d.key);
          return (
            <section key={d.key} className="surface p-5">
              <header className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-lg">{d.label}</h2>
                <button className="btn btn-xs btn-ghost text-primary" onClick={() => setForm(blank(d.key))}>+ Jam</button>
              </header>
              {items.length === 0 ? (
                <p className="rounded-xl bg-slate-50 py-6 text-center text-sm text-slate-400">Libur / belum ada jadwal</p>
              ) : (
                <ul className="space-y-2">
                  {items.map((s) => (
                    <li key={s.id} className={`rounded-xl border p-3 transition-opacity ${s.is_active ? "border-brand-100 bg-brand-50" : "border-slate-200 bg-slate-50 opacity-60"}`}>
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold text-primary">{hhmm(s.start_time) || "--:--"} – {hhmm(s.end_time) || "--:--"}</p>
                        <input type="checkbox" className="toggle toggle-sm toggle-primary" checked={!!s.is_active} onChange={() => toggle(s)} aria-label="Aktif" />
                      </div>
                      {(s.information || s.specific_date) && (
                        <p className="mt-1 text-sm text-slate-600">{s.specific_date && <span className="badge badge-sm badge-warning mr-1">{String(s.specific_date).slice(0, 10)}</span>}{s.information}</p>
                      )}
                      <div className="mt-2 flex gap-1">
                        <button className="btn btn-xs btn-ghost" onClick={() => edit(s)}>Ubah</button>
                        <button className="btn btn-xs btn-ghost text-error" onClick={() => remove(s)}>Hapus</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      <FormModal open={!!form} title={form?.id ? "Ubah Jadwal" : "Tambah Jadwal"} onClose={() => setForm(null)} onSubmit={save} busy={busy}>
        {form && (<>
          <Field label="Hari">
            <select className="select select-bordered" value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })}>
              {DAYS.map((d) => <option key={d.key} value={d.key}>{d.label}</option>)}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Buka"><input type="time" required className="input input-bordered" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} /></Field>
            <Field label="Tutup"><input type="time" required className="input input-bordered" value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} /></Field>
          </div>
          <Field label="Catatan (opsional)"><input className="input input-bordered" placeholder="Mis. Praktik pagi" value={form.information} onChange={(e) => setForm({ ...form, information: e.target.value })} /></Field>
          <Field label="Hanya berlaku di tanggal tertentu (opsional)"><input type="date" className="input input-bordered" value={form.specific_date} onChange={(e) => setForm({ ...form, specific_date: e.target.value })} /></Field>
          <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="toggle toggle-primary" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /><span className="text-sm font-medium">Jadwal aktif</span></label>
        </>)}
      </FormModal>
    </div>
  );
};

export default ScheduleBoard;
