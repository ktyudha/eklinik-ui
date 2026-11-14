import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { adminFetcher, useAdminGet } from "@/lib/admin-api";
import { appointmentApi } from "@/services/admin/crud/crud";
import { recipeApi, rupiah, useMedicineOptions } from "@/services/admin/pharmacy/pharmacy";
import {
  medicalApi, useClassification, useClassifications, useMedical, usePatientsLite,
  isChoice, isMultiple, SubMenu,
} from "@/services/admin/medical-record/medical-record";
import { PageHeader, Field, notify } from "../_ui";

type Answers = Record<string, string | string[]>;
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const addDays = (iso: string, n: number) => { const d = new Date(iso.slice(0, 10) + "T00:00:00"); d.setDate(d.getDate() + n); return ymd(d); };
/** Interval kembali suntik KB (hari) — mengikuti eklinik legacy. */
const KB_DAYS: [RegExp, number][] = [[/cyclofem/i, 28], [/gestin/i, 53], [/tryclofem/i, 80]];
/** Kata kunci produk KB -> obat di stok. */
const KB_KEYWORD = (label: string) => (label.match(/cyclofem|gestin|tryclofem|pil|implant|iud|kondom/i)?.[0] ?? "").toLowerCase();
const plain = (s: string) => s.replace(/<\/?[^>]+(>|$)/g, "");
const nowLocal = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 16); };

/** Satu komponen untuk tambah & ubah: field dibangun dari master form klasifikasi. */
export const FieldInput: FunctionComponent<{ s: SubMenu; value: string | string[] | undefined; onChange: (v: string | string[]) => void }> = ({ s, value, onChange }) => {
  const v = (value ?? "") as string;
  if (s.type === "radio") {
    return (
      <div className="flex flex-wrap gap-2">
        {s.options?.map((o) => (
          <button key={o.id} type="button" onClick={() => onChange(o.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium ring-1 transition-all ${v === o.id ? "bg-brand-600 text-white ring-brand-600" : "bg-white text-gray-600 ring-gray-300 hover:ring-brand-300"}`}>{o.label}</button>
        ))}
      </div>
    );
  }
  if (s.type === "checkbox") {
    const sel = (value as string[]) ?? [];
    return (
      <div className="flex flex-wrap gap-2">
        {s.options?.map((o) => {
          const on = sel.includes(o.id);
          return (
            <button key={o.id} type="button" onClick={() => onChange(on ? sel.filter((x) => x !== o.id) : [...sel, o.id])}
              className={`rounded-full px-4 py-2 text-sm font-medium ring-1 transition-all ${on ? "bg-brand-50 text-brand-700 ring-brand-400" : "bg-white text-gray-600 ring-gray-300 hover:ring-brand-300"}`}>{on ? "✓ " : ""}{o.label}</button>
          );
        })}
      </div>
    );
  }
  if (s.type === "select" || s.type === "combobox") {
    return (
      <select className="select w-full" value={v} onChange={(e) => onChange(e.target.value)}>
        <option value="">Pilih</option>
        {s.options?.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
      </select>
    );
  }
  if (s.type === "textarea" || s.type === "textrich") {
    return <textarea className="textarea w-full" rows={3} value={v} onChange={(e) => onChange(e.target.value)} />;
  }
  const map: Record<string, string> = { "input:number": "number", "input:email": "email", "input:phone": "tel", date: "date", datetime: "datetime-local", time: "time" };
  return <input className="input w-full" type={map[s.type] ?? "text"} step={s.type === "input:number" ? "any" : undefined} value={v} onChange={(e) => onChange(e.target.value)} />;
};

type Row = { id: string; quantity: string };
const ageOf = (d?: string | null) => { if (!d) return "-"; const y = Math.floor((Date.now() - new Date(d).getTime()) / 31557600000); return y >= 1 ? `${y} th` : `${Math.max(0, Math.floor((Date.now() - new Date(d).getTime()) / 2629800000))} bln`; };

const MedicalRecordFormPage: FunctionComponent = () => {
  const { id } = useParams();
  const [params] = useSearchParams();
  const editing = !!id;
  const navigate = useNavigate();
  const patients = usePatientsLite();
  const classifications = useClassifications();
  const existing = useMedical(id);
  const medicines = useMedicineOptions();

  const [patientId, setPatientId] = useState(params.get("patient") ?? "");
  const queueId = params.get("queue");
  const [classificationId, setClassificationId] = useState("");
  const [checkup, setCheckup] = useState(nowLocal());
  const [answers, setAnswers] = useState<Answers>({});
  const [rows, setRows] = useState<Row[]>([]);
  const [rxNote, setRxNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const form = useClassification(classificationId);
  const menus = useMemo(() => (form.data?.classification.menus ?? []).filter((m) => m.is_active && m.submenus.length), [form.data]);
  const patient = useAdminGet<{ patient: { id: string; name: string; medical_record_number: string | null; gender: string; birth_date: string | null; phone_number: string | null; job: string | null } }>(patientId ? `/admin/patients/${patientId}` : null).data?.patient;
  const existingRecipe = existing.data?.medical.recipes?.[0] as { id: string; status: string } | undefined;
  const rxLocked = existingRecipe?.status === "completed";
  const medOpts = medicines.data?.medicines ?? [];
  const rxTotal = rows.reduce((t, r) => t + Number(medOpts.find((m) => m.id === r.id)?.price ?? 0) * Number(r.quantity || 0), 0);

  // ---- isian otomatis (bisa ditimpa manual) ----
  const touched = useRef<Set<string>>(new Set());
  const autoMed = useRef<string | null>(null);
  const field = useMemo(() => {
    const m = new Map<string, SubMenu>();
    menus.forEach((mn) => mn.submenus.forEach((sm) => m.set(norm(sm.name), sm)));
    return m;
  }, [menus]);
  const auto = useMemo(() => new Set(["tanggal kembali", "hpl (hari perkiraan lahir)", "usia kehamilan (minggu)"].map((n) => field.get(n)?.id).filter(Boolean) as string[]), [field]);

  const setAuto = (sm: SubMenu | undefined, value: string) => {
    if (!sm || touched.current.has(sm.id)) return;
    setAnswers((a) => (a[sm.id] === value ? a : { ...a, [sm.id]: value }));
  };

  useEffect(() => {
    const day = checkup.slice(0, 10);
    // KB: obat + tanggal kembali
    const method = field.get("metode kb");
    if (method) {
      const label = method.options?.find((o) => o.id === answers[method.id])?.label ?? "";
      const days = KB_DAYS.find(([re]) => re.test(label))?.[1];
      setAuto(field.get("tanggal kembali"), days && day ? addDays(day, days) : "");
      if (!rxLocked) {
        const kw = KB_KEYWORD(label);
        const med = kw ? medOpts.find((m) => m.name.toLowerCase().includes(kw)) : undefined;
        if (med?.id !== autoMed.current) {
          const prev = autoMed.current; // ditangkap sekarang: updater berjalan setelah ref berganti
          setRows((rs) => {
            const rest = rs.filter((r) => r.id !== prev);
            return med && !rest.some((r) => r.id === med.id) ? [...rest, { id: med.id, quantity: "1" }] : rest;
          });
          autoMed.current = med?.id ?? null;
        }
      }
    }
    // Kehamilan: HPL = HPHT + 280 hari, usia kehamilan (minggu)
    const hpht = field.get("hpht");
    const h = hpht ? (answers[hpht.id] as string) : "";
    if (h && field.get("hpl (hari perkiraan lahir)")) {
      setAuto(field.get("hpl (hari perkiraan lahir)"), addDays(h, 280));
      const weeks = Math.floor((new Date(day).getTime() - new Date(h).getTime()) / 604800000);
      setAuto(field.get("usia kehamilan (minggu)"), weeks >= 0 && weeks < 45 ? String(weeks) : "");
    }
  }, [answers, checkup, field, medOpts.length, rxLocked]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const m = existing.data?.medical;
    if (!editing || !m || loaded) return;
    setPatientId(m.patient?.id ?? "");
    setClassificationId(m.classification?.id ?? "");
    setCheckup(String(m.checkup_date).slice(0, 16));
    const a: Answers = {};
    m.answers?.forEach((r) => {
      if (r.option_ids) a[r.sub_menu.id] = r.option_ids.map((o) => o.id);
      else if (r.option_id) a[r.sub_menu.id] = r.option_id.id;
      else a[r.sub_menu.id] = r.value ?? r.answer ?? "";
    });
    Object.keys(a).forEach((k) => touched.current.add(k));
    setAnswers(a);
    const rc = m.recipes?.[0] as { description?: string; medicines?: { id: string; quantity: number }[] } | undefined;
    if (rc) { setRxNote(rc.description ?? ""); setRows((rc.medicines ?? []).map((x) => ({ id: x.id, quantity: String(x.quantity) }))); }
    setLoaded(true);
  }, [existing.data, editing, loaded]);

  const setRow = (i: number, p: Partial<Row>) => setRows((a) => a.map((r, j) => (j === i ? { ...r, ...p } : r)));

  const submit = async () => {
    type Ans = { sub_menu_id: string; value?: string; option_id?: string; option_ids?: string[] };
    const payloadAnswers: Ans[] = menus.flatMap((m) => m.submenus.filter((s) => s.is_active)).flatMap((s): Ans[] => {
      const v = answers[s.id];
      const empty = v === undefined || v === "" || (Array.isArray(v) && v.length === 0);
      if (empty) return [];
      if (isMultiple(s.type)) return [{ sub_menu_id: s.id, option_ids: v as string[] }];
      if (isChoice(s.type)) return [{ sub_menu_id: s.id, option_id: v as string }];
      return [{ sub_menu_id: s.id, value: String(v) }];
    });
    const missing = menus.flatMap((m) => m.submenus).filter((s) => s.is_required && !payloadAnswers.find((a) => a.sub_menu_id === s.id));
    if (missing.length) { notify({ error: `Lengkapi: ${missing.map((s) => plain(s.name)).join(", ")}` }, ""); return; }
    const rxRows = rows.filter((r) => r.id && Number(r.quantity) > 0);

    setBusy(true);
    const body = { patient_id: patientId, classification_id: classificationId, checkup_date: checkup, answers: payloadAnswers };
    const r = editing ? await medicalApi.update(id!, body) : await medicalApi.create(body);
    if (r.error) { setBusy(false); notify(r, ""); return; }
    const medicalId = editing ? id! : ((r.data as { medical?: { id: string } })?.medical?.id ?? "");

    // resep ikut tersimpan bersama pemeriksaan
    if (!rxLocked && medicalId) {
      const rx = { patient_id: patientId, medical_id: medicalId, description: rxNote || null, medicine: rxRows.map((x) => ({ id: x.id, quantity: Number(x.quantity) })) };
      if (existingRecipe && rxRows.length) await recipeApi.update(existingRecipe.id, { ...rx, status: existingRecipe.status });
      else if (existingRecipe && !rxRows.length) await recipeApi.remove(existingRecipe.id);
      else if (rxRows.length) await recipeApi.create(rx);
    }
    // pemeriksaan dari antrian -> antrian selesai
    if (queueId && !editing) {
      try {
        const q = await adminFetcher<{ appointment: { queue_date: string; description: string } }>(`/admin/appointments/${queueId}`);
        await appointmentApi.update(queueId, { queue_date: q.appointment.queue_date, description: q.appointment.description, status: "finished" });
      } catch { /* antrian tetap bisa diselesaikan manual */ }
    }
    setBusy(false);
    notify({ error: null }, editing ? "Rekam medis diperbarui" : "Rekam medis tersimpan");
    navigate(`/admin/medical-record/${medicalId}`);
  };

  const ready = patientId && classificationId && checkup;

  return (
    <div className="mx-auto max-w-3xl pb-24">
      <Link to="/admin/medical-record" className="text-sm font-medium text-brand-600">← Rekam medis</Link>
      <PageHeader title={editing ? "Ubah Pemeriksaan" : "Pemeriksaan Baru"} subtitle="Isi anamnesa, pemeriksaan, diagnosa, tindakan, dan resep dalam satu form." />

      {patient && (
        <div className="surface mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 bg-gradient-to-r from-brand-50 to-white p-4">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-600 font-bold text-white">{patient.name.slice(0, 2).toUpperCase()}</span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-900">{patient.name}</p>
            <p className="text-xs text-gray-500">No. RM {patient.medical_record_number ?? "-"} · {patient.gender} · {ageOf(patient.birth_date)}</p>
          </div>
          <p className="text-xs text-gray-500">{patient.phone_number} {patient.job && `· ${patient.job}`}</p>
        </div>
      )}

      <div className="surface space-y-4 p-5">
        <Field label="Pasien">
          <select className="select" disabled={editing || !!queueId} value={patientId} onChange={(e) => setPatientId(e.target.value)}>
            <option value="">Pilih pasien</option>
            {patients.data?.patients.map((p) => <option key={p.id} value={p.id}>{p.name}{p.medical_record_number ? ` · ${p.medical_record_number}` : ""}</option>)}
          </select>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Kategori pemeriksaan">
            <select className="select" disabled={editing} value={classificationId} onChange={(e) => { setClassificationId(e.target.value); setAnswers({}); }}>
              <option value="">Pilih kategori</option>
              {classifications.data?.classifications.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Tanggal & jam"><input type="datetime-local" className="input" value={checkup} onChange={(e) => setCheckup(e.target.value)} /></Field>
        </div>
      </div>

      {!classificationId && <p className="mt-8 text-center text-gray-400">Pilih kategori untuk menampilkan form pemeriksaan.</p>}
      {classificationId && form.loading && <p className="mt-8 text-center text-gray-400">Memuat form...</p>}

      {menus.map((m) => (
        <section key={m.id} className="surface mt-4 p-5">
          <h2 className="mb-4 text-base font-semibold text-gray-800">{m.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {m.submenus.filter((s) => s.is_active).sort((a, b) => a.order - b.order).map((s) => (
              <div key={s.id} className={["textarea", "textrich", "radio", "checkbox"].includes(s.type) ? "sm:col-span-2" : ""}>
                <span className="label-text mb-1 block font-medium">{plain(s.name)}{s.is_required && <span className="text-error-500"> *</span>}{auto.has(s.id) && !touched.current.has(s.id) && <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-600">otomatis</span>}</span>
                <FieldInput s={s} value={answers[s.id]} onChange={(v) => { touched.current.add(s.id); setAnswers((a) => ({ ...a, [s.id]: v })); }} />
              </div>
            ))}
          </div>
        </section>
      ))}

      {classificationId && (
        <section className="surface mt-4 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-800">Resep obat</h2>
            {rxLocked ? <span className="text-xs font-medium text-success-600">Obat sudah diserahkan</span> : <span className="text-xs text-gray-400">Opsional</span>}
          </div>
          <div className="space-y-2">
            {rows.map((r, i) => {
              const med = medOpts.find((m) => m.id === r.id);
              return (
                <div key={i} className="flex flex-wrap items-center gap-2">
                  <select className="select min-w-0 flex-1" disabled={rxLocked} value={r.id} onChange={(e) => setRow(i, { id: e.target.value })}>
                    <option value="">Pilih obat</option>
                    {medOpts.map((m) => <option key={m.id} value={m.id}>{m.name} — stok {m.stock} {m.unit}</option>)}
                  </select>
                  <input type="number" min="1" step="any" disabled={rxLocked} className="input w-24" value={r.quantity} onChange={(e) => setRow(i, { quantity: e.target.value })} aria-label="Jumlah" />
                  <span className="w-24 text-right text-sm text-gray-500">{med ? rupiah(Number(med.price) * Number(r.quantity || 0)) : ""}</span>
                  {!rxLocked && <button type="button" aria-label="Hapus obat" onClick={() => setRows((a) => a.filter((_, j) => j !== i))} className="grid h-9 w-9 place-items-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-error-600">✕</button>}
                </div>
              );
            })}
          </div>
          {!rxLocked && <button type="button" className="mt-3 text-sm font-semibold text-brand-600" onClick={() => setRows((a) => [...a, { id: "", quantity: "1" }])}>+ Tambah obat</button>}
          {rows.length > 0 && (
            <>
              <Field label="Aturan pakai"><textarea className="textarea mt-3" rows={2} disabled={rxLocked} placeholder="Mis. 3×1 sesudah makan" value={rxNote} onChange={(e) => setRxNote(e.target.value)} /></Field>
              <p className="mt-3 text-right text-sm text-gray-500">Perkiraan biaya obat: <b className="text-gray-900">{rupiah(rxTotal)}</b></p>
            </>
          )}
        </section>
      )}

      {classificationId && menus.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white/90 p-3 backdrop-blur lg:left-72">
          <div className="mx-auto flex max-w-3xl justify-end gap-2">
            <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>Batal</button>
            <button type="button" className="btn btn-primary" disabled={!ready || busy} onClick={submit}>{busy ? "Menyimpan..." : "Simpan pemeriksaan"}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordFormPage;
