import { FunctionComponent, useEffect, useState } from "react";
import Modal from "@/components/reusable/Modal";
import { FieldInput } from "../medical-record/MedicalRecordFormPage";
import { OPTION_PRESETS, QUESTION_TYPES, hasOptions, questionApi } from "@/services/admin/form-builder/builder";
import type { SubMenu } from "@/services/admin/medical-record/medical-record";
import { notify } from "../_ui";

interface Props { open: boolean; menuId: string; nextOrder: number; question: SubMenu | null; onClose: () => void }
type Opt = { id?: string; label: string };

const slug = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "opsi";

/** Satu sheet untuk tambah & ubah pertanyaan: jenis jawaban -> opsi (bila perlu) -> pratinjau. */
const QuestionSheet: FunctionComponent<Props> = ({ open, menuId, nextOrder, question, onClose }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("input:text");
  const [required, setRequired] = useState(false);
  const [opts, setOpts] = useState<Opt[]>([{ label: "" }, { label: "" }]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (question) {
      setName(question.name.replace(/<\/?[^>]+(>|$)/g, ""));
      setType(question.type === "input" ? "input:text" : question.type);
      setRequired(!!question.is_required);
      setOpts(question.options?.length ? question.options.map((o) => ({ id: o.id, label: o.label })) : [{ label: "" }, { label: "" }]);
    } else { setName(""); setType("input:text"); setRequired(false); setOpts([{ label: "" }, { label: "" }]); }
  }, [open, question]);

  const choice = hasOptions(type);
  const cleanOpts = opts.filter((o) => o.label.trim());
  const setOpt = (i: number, label: string) => setOpts((a) => a.map((o, j) => (j === i ? { ...o, label } : o)));
  const addOpt = (focus = true) => { setOpts((a) => [...a, { label: "" }]); if (focus) setTimeout(() => document.querySelector<HTMLInputElement>("[data-opt]:last-of-type input")?.focus(), 30); };
  const valid = name.trim() && (!choice || cleanOpts.length >= 2);

  const save = async () => {
    setBusy(true);
    const used = new Set<string>();
    const options = choice ? cleanOpts.map((o, i) => {
      let v = slug(o.label); while (used.has(v)) v += "-2"; used.add(v);
      return { ...(o.id ? { id: o.id } : {}), label: o.label.trim(), value: v, order: i + 1, is_active: true };
    }) : undefined;
    const body = { menu_id: menuId, name: name.trim(), type, is_required: required, is_active: true, order: question?.order ?? nextOrder, ...(choice ? { options } : { options: [] }) };
    const r = question ? await questionApi.update(question.id, body) : await questionApi.create(body);
    setBusy(false);
    if (notify(r, question ? "Pertanyaan diperbarui" : "Pertanyaan ditambahkan")) onClose();
  };

  const previewQ: SubMenu = { id: "preview", name, type, is_active: true, is_required: required, order: 0,
    options: cleanOpts.map((o, i) => ({ id: String(i), label: o.label, value: String(i) })) };

  return (
    <Modal onOpen={open} title={question ? "Ubah Pertanyaan" : "Pertanyaan Baru"} modalSize="md" onClose={onClose}>
      <label className="block">
        <span className="label-text mb-1 block font-medium">Pertanyaan</span>
        <input className="input w-full" autoFocus placeholder="Mis. Apakah sedang hamil?" value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <div>
        <span className="label-text mb-2 block font-medium">Jenis jawaban</span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {QUESTION_TYPES.map((t) => (
            <button key={t.type} type="button" onClick={() => setType(t.type)} title={t.hint}
              className={`rounded-xl border p-3 text-left transition-all ${type === t.type ? "border-brand-500 bg-brand-50 ring-2 ring-brand-500/20" : "border-gray-200 hover:border-brand-300"}`}>
              <span className="block text-lg leading-none">{t.icon}</span>
              <span className="mt-1.5 block text-sm font-semibold text-gray-800">{t.label}</span>
              <span className="block text-[11px] text-gray-400">{t.hint}</span>
            </button>
          ))}
        </div>
      </div>

      {choice && (
        <div className="rounded-2xl bg-gray-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-800">Pilihan jawaban</span>
            <span className="text-xs text-gray-400">minimal 2</span>
          </div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {OPTION_PRESETS.map((p) => (
              <button key={p.label} type="button" onClick={() => setOpts(p.options.map((label) => ({ label })))}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-600 ring-1 ring-brand-100 hover:bg-brand-50">{p.label}</button>
            ))}
          </div>
          <div className="space-y-2">
            {opts.map((o, i) => (
              <div key={i} data-opt className="flex items-center gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-semibold text-gray-400 ring-1 ring-gray-200">{i + 1}</span>
                <input className="input w-full" placeholder={`Pilihan ${i + 1}`} value={o.label} onChange={(e) => setOpt(i, e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (i === opts.length - 1) addOpt(); } }} />
                <button type="button" aria-label="Hapus pilihan" disabled={opts.length <= 2} onClick={() => setOpts((a) => a.filter((_, j) => j !== i))}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-gray-400 hover:bg-white hover:text-error-600 disabled:opacity-30">✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addOpt()} className="mt-3 text-sm font-semibold text-brand-600">+ Tambah pilihan</button>
        </div>
      )}

      <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
        <span><span className="block text-sm font-medium text-gray-800">Wajib diisi</span><span className="text-xs text-gray-400">Petugas tidak bisa menyimpan bila kosong</span></span>
        <input type="checkbox" className="toggle toggle-primary" checked={required} onChange={(e) => setRequired(e.target.checked)} />
      </label>

      {name.trim() && (
        <div className="rounded-2xl border border-dashed border-gray-300 p-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Pratinjau</p>
          <span className="label-text mb-1 block font-medium">{name}{required && <span className="text-error-500"> *</span>}</span>
          <div className="pointer-events-none"><FieldInput s={previewQ} value={undefined} onChange={() => {}} /></div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-1">
        <button type="button" className="btn btn-ghost" onClick={onClose}>Batal</button>
        <button type="button" className="btn btn-primary" disabled={!valid || busy} onClick={save}>{busy ? "Menyimpan..." : "Simpan pertanyaan"}</button>
      </div>
    </Modal>
  );
};

export default QuestionSheet;
