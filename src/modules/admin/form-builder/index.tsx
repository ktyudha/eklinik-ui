import { FunctionComponent, useEffect, useState } from "react";
import { ask } from "@/components/reusable/ConfirmSheet";
import {
  categoryBuilderApi, questionApi, sectionApi, typeLabel, useAllMenus, useCategories, BuilderCategory,
} from "@/services/admin/form-builder/builder";
import { useClassification, SubMenu } from "@/services/admin/medical-record/medical-record";
import { ActionBtn, Field, FormModal, PageHeader, notify } from "../_ui";
import Modal from "@/components/reusable/Modal";
import QuestionSheet from "./QuestionSheet";

const plain = (s: string) => s.replace(/<\/?[^>]+(>|$)/g, "");

const FormBuilder: FunctionComponent = () => {
  const cats = useCategories();
  const allMenus = useAllMenus();
  const [activeId, setActiveId] = useState("");
  const detail = useClassification(activeId || undefined);
  const category = detail.data?.classification;

  const [catForm, setCatForm] = useState<{ id?: string; name: string; price: string } | null>(null);
  const [sectionSheet, setSectionSheet] = useState(false);
  const [newSection, setNewSection] = useState("");
  const [rename, setRename] = useState<{ id: string; name: string } | null>(null);
  const [q, setQ] = useState<{ menuId: string; nextOrder: number; question: SubMenu | null } | null>(null);
  const [busy, setBusy] = useState(false);

  const list: BuilderCategory[] = cats.data?.classifications ?? [];
  useEffect(() => { if (!activeId && list.length) setActiveId(list[0].id); }, [list, activeId]);

  const menuIds = (category?.menus ?? []).map((m) => m.id);
  const available = (allMenus.data?.menus ?? []).filter((m) => !menuIds.includes(m.id));

  const saveCategory = async () => {
    if (!catForm) return;
    setBusy(true);
    const body = { name: catForm.name, price: String(catForm.price || 0), menu: catForm.id ? menuIds : [] };
    const r = catForm.id ? await categoryBuilderApi.update(catForm.id, body) : await categoryBuilderApi.create(body);
    setBusy(false);
    if (notify(r, "Kategori tersimpan")) setCatForm(null);
  };
  const removeCategory = async () => {
    if (!category || !(await ask({ title: `Hapus kategori ${category.name}?`, message: "Rekam medis lama tetap tersimpan.", danger: true, confirmLabel: "Ya, hapus" }))) return;
    if (notify(await categoryBuilderApi.remove(category.id), "Kategori dihapus")) setActiveId("");
  };
  const syncMenus = async (ids: string[]) => category && categoryBuilderApi.update(category.id, { name: category.name, price: String(category.price ?? 0), menu: ids });
  const addExistingSection = async (id: string) => { const r = await syncMenus([...menuIds, id]); if (r && notify(r, "Bagian ditambahkan")) setSectionSheet(false); };
  const createSection = async () => {
    if (!newSection.trim()) return;
    setBusy(true);
    const r = await sectionApi.create(newSection.trim());
    if (r.error) { setBusy(false); notify(r, ""); return; }
    const id = (r.data as any)?.menu?.id ?? (r.data as any)?.id;
    const r2 = id ? await syncMenus([...menuIds, id]) : null;
    setBusy(false);
    if (!r2 || notify(r2, "Bagian dibuat")) { setNewSection(""); setSectionSheet(false); }
  };
  const detachSection = async (id: string, name: string) => {
    if (await ask({ title: `Lepas bagian "${name}"?`, message: "Bagian dan pertanyaannya tidak terhapus, hanya tidak dipakai di kategori ini.", confirmLabel: "Ya, lepas" }))
      notify((await syncMenus(menuIds.filter((m) => m !== id)))!, "Bagian dilepas");
  };
  const renameSection = async () => { if (rename) { setBusy(true); const r = await sectionApi.rename(rename.id, rename.name); setBusy(false); if (notify(r, "Nama bagian diubah")) setRename(null); } };
  const removeQuestion = async (s: SubMenu) => { if (await ask({ title: `Hapus pertanyaan "${plain(s.name)}"?`, danger: true, confirmLabel: "Ya, hapus" })) notify(await questionApi.remove(s.id), "Pertanyaan dihapus"); };
  const move = async (menuId: string, list: SubMenu[], i: number, dir: -1 | 1) => {
    const a = list[i], b = list[i + dir];
    if (!b) return;
    const body = (s: SubMenu, order: number) => ({ menu_id: menuId, name: s.name, type: s.type === "input" ? "input:text" : s.type, is_required: !!s.is_required, is_active: true, order,
      ...(s.options?.length ? { options: s.options.map((o, k) => ({ id: o.id, label: o.label, value: o.value, order: k + 1, is_active: true })) } : { options: [] }) });
    await questionApi.update(a.id, body(a, b.order || i + 1 + dir));
    await questionApi.update(b.id, body(b, a.order || i + 1));
  };

  return (
    <div>
      <PageHeader title="Form Rekam Medis" subtitle="Atur pertanyaan yang diisi petugas untuk tiap kategori pemeriksaan."
        action={<button className="btn btn-primary" onClick={() => setCatForm({ name: "", price: "50000" })}>+ Kategori</button>} />

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="surface h-fit p-2">
          {list.map((c) => (
            <button key={c.id} onClick={() => setActiveId(c.id)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${activeId === c.id ? "bg-brand-50 text-brand-600" : "text-gray-700 hover:bg-gray-100"}`}>
              <span>{c.name}</span><span className="text-xs text-gray-400">{c.menus?.length ?? 0} bagian</span>
            </button>
          ))}
          {list.length === 0 && <p className="p-4 text-center text-sm text-gray-400">Belum ada kategori.</p>}
        </aside>

        <div className="space-y-4">
          {category && (
            <div className="surface flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                <p className="text-sm text-gray-500">Biaya Rp {Number(category.price ?? 0).toLocaleString("id-ID")} · {category.menus.length} bagian</p>
              </div>
              <div className="flex gap-1">
                <ActionBtn tone="primary" onClick={() => setCatForm({ id: category.id, name: category.name, price: String(category.price ?? 0) })}>Ubah</ActionBtn>
                <ActionBtn tone="danger" onClick={removeCategory}>Hapus</ActionBtn>
              </div>
            </div>
          )}

          {category?.menus.map((menu) => {
            const qs = [...menu.submenus].sort((a, b) => a.order - b.order);
            return (
              <section key={menu.id} className="surface">
                <header className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
                  <h3 className="font-semibold text-gray-900">{menu.name}</h3>
                  <div className="flex gap-1">
                    <ActionBtn onClick={() => setRename({ id: menu.id, name: menu.name })}>Ubah nama</ActionBtn>
                    <ActionBtn tone="danger" onClick={() => detachSection(menu.id, menu.name)}>Lepas</ActionBtn>
                  </div>
                </header>
                <ul className="divide-y divide-gray-100">
                  {qs.map((s, i) => (
                    <li key={s.id} className="flex items-center gap-3 px-5 py-3">
                      <div className="flex flex-col">
                        <button aria-label="Naikkan" disabled={i === 0} onClick={() => move(menu.id, qs, i, -1)} className="text-[10px] leading-none text-gray-400 hover:text-brand-600 disabled:opacity-20">▲</button>
                        <button aria-label="Turunkan" disabled={i === qs.length - 1} onClick={() => move(menu.id, qs, i, 1)} className="text-[10px] leading-none text-gray-400 hover:text-brand-600 disabled:opacity-20">▼</button>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-gray-800">{plain(s.name)}{s.is_required && <span className="text-error-500"> *</span>}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">{typeLabel(s.type === "input" ? "input:text" : s.type)}</span>
                          {s.options?.map((o) => <span key={o.id} className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] text-brand-700">{o.label}</span>)}
                        </div>
                      </div>
                      <ActionBtn tone="primary" onClick={() => setQ({ menuId: menu.id, nextOrder: qs.length + 1, question: s })}>Ubah</ActionBtn>
                      <ActionBtn tone="danger" onClick={() => removeQuestion(s)}>Hapus</ActionBtn>
                    </li>
                  ))}
                  {qs.length === 0 && <li className="px-5 py-6 text-center text-sm text-gray-400">Belum ada pertanyaan di bagian ini.</li>}
                </ul>
                <div className="border-t border-gray-100 px-5 py-3">
                  <button className="text-sm font-semibold text-brand-600" onClick={() => setQ({ menuId: menu.id, nextOrder: qs.length + 1, question: null })}>+ Tambah pertanyaan</button>
                </div>
              </section>
            );
          })}

          {category && (
            <button onClick={() => setSectionSheet(true)} className="w-full rounded-2xl border-2 border-dashed border-gray-300 py-4 text-sm font-semibold text-gray-500 transition-colors hover:border-brand-400 hover:text-brand-600">+ Tambah bagian</button>
          )}
          {!category && !cats.loading && list.length === 0 && <div className="surface p-10 text-center text-gray-400">Buat kategori pertama untuk mulai menyusun form.</div>}
        </div>
      </div>

      <QuestionSheet open={!!q} menuId={q?.menuId ?? ""} nextOrder={q?.nextOrder ?? 1} question={q?.question ?? null} onClose={() => setQ(null)} />

      <FormModal open={!!catForm} title={catForm?.id ? "Ubah Kategori" : "Kategori Baru"} onClose={() => setCatForm(null)} onSubmit={saveCategory} busy={busy}>
        {catForm && (<>
          <Field label="Nama kategori"><input className="input" required autoFocus placeholder="Mis. ANC, KB, Anak" value={catForm.name} onChange={(e) => setCatForm({ ...catForm, name: e.target.value })} /></Field>
          <Field label="Biaya pemeriksaan (Rp)"><input type="number" min="0" className="input" value={catForm.price} onChange={(e) => setCatForm({ ...catForm, price: e.target.value })} /></Field>
        </>)}
      </FormModal>

      <FormModal open={!!rename} title="Ubah Nama Bagian" onClose={() => setRename(null)} onSubmit={renameSection} busy={busy}>
        {rename && <Field label="Nama bagian"><input className="input" required autoFocus value={rename.name} onChange={(e) => setRename({ ...rename, name: e.target.value })} /></Field>}
      </FormModal>

      <Modal onOpen={sectionSheet} title="Tambah Bagian" modalSize="sm" onClose={() => setSectionSheet(false)}>
        <p className="text-sm text-gray-500">Bagian adalah kelompok pertanyaan, mis. "Anamnesa" atau "Pemeriksaan Fisik".</p>
        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); createSection(); }}>
          <input className="input w-full" placeholder="Nama bagian baru" value={newSection} onChange={(e) => setNewSection(e.target.value)} />
          <button className="btn btn-primary" disabled={!newSection.trim() || busy}>Buat</button>
        </form>
        {available.length > 0 && (<>
          <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Atau pakai yang sudah ada</p>
          <div className="flex flex-wrap gap-2">
            {available.map((m) => <button key={m.id} onClick={() => addExistingSection(m.id)} className="rounded-full bg-gray-100 px-3.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-700">+ {m.name}</button>)}
          </div>
        </>)}
      </Modal>
    </div>
  );
};

export default FormBuilder;
