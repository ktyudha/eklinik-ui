import { ask } from "@/components/reusable/ConfirmSheet";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { roleApi, useAllPermissions, useRoles } from "@/services/admin/role/role";
import { useUsers } from "@/services/admin/pharmacy/pharmacy";
import { PageHeader, Card, Field, Pager, FormModal, notify } from "../_ui";

/** "medicines read" -> modul "medicines", aksi "read" */
const split = (p: string) => {
  const i = p.lastIndexOf(" ");
  return i < 0 ? [p, "akses"] : [p.slice(0, i), p.slice(i + 1)];
};

const RolePermissions: FunctionComponent = () => {
  const roles = useRoles();
  const all = useAllPermissions();
  const [active, setActive] = useState<string>("");
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [newRole, setNewRole] = useState<string | null>(null);
  const [userForm, setUserForm] = useState<Record<string, string> | null>(null);

  const [userPage, setUserPage] = useState(1);
  const users = useUsers(userPage);
  const list = roles.data?.roles ?? [];
  const current = list.find((r) => r.name === active);

  useEffect(() => { if (!active && list.length) setActive(list[0].name); }, [list, active]);
  useEffect(() => { setChecked(new Set(current?.permissions ?? [])); }, [current?.name, current?.permissions?.join("|")]);

  const modules = useMemo(() => {
    const m = new Map<string, { action: string; full: string }[]>();
    (all.data?.permissions ?? []).forEach((p) => {
      const [mod, action] = split(p);
      m.set(mod, [...(m.get(mod) ?? []), { action, full: p }]);
    });
    return [...m.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [all.data]);

  const toggle = (p: string) => setChecked((s) => { const n = new Set(s); n.has(p) ? n.delete(p) : n.add(p); return n; });
  const toggleModule = (items: { full: string }[]) => setChecked((s) => {
    const n = new Set(s); const every = items.every((i) => n.has(i.full));
    items.forEach((i) => (every ? n.delete(i.full) : n.add(i.full))); return n;
  });

  const save = async () => {
    setSaving(true);
    notify(await roleApi.setPermissions(active, [...checked]), "Hak akses disimpan");
    setSaving(false);
  };
  const addRole = async () => { if (newRole && notify(await roleApi.create(newRole), "Role dibuat")) { setActive(newRole); setNewRole(null); } };
  const removeRole = async () => {
    if (current && (await ask({ title: `Hapus role ${current.name}?`, danger: true, confirmLabel: "Ya, hapus" }))) { notify(await roleApi.remove(current.id), "Role dihapus"); setActive(""); }
  };
  const registerUser = async () => {
    if (!userForm) return;
    const r = await roleApi.registerUser(userForm);
    if (notify(r, "Pengguna terdaftar")) setUserForm(null);
    else toast.info("Periksa kembali isian pengguna");
  };

  return (
    <div>
      <PageHeader title="Pengguna & Hak Akses" subtitle="Atur peran tenaga kesehatan dan apa yang boleh mereka lakukan."
        action={<div className="flex gap-2">
          <button className="btn btn-outline" onClick={() => setUserForm({ name: "", initials: "", username: "", email: "", password: "", role: active })}>+ Pengguna</button>
          <button className="btn btn-primary" onClick={() => setNewRole("")}>+ Role</button>
        </div>} />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <Card className="p-2 h-fit">
          {list.map((r) => (
            <button key={r.id} onClick={() => setActive(r.name)}
              className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium ${active === r.name ? "bg-primary text-primary-content" : "hover:bg-slate-100"}`}>
              {r.name}
            </button>
          ))}
        </Card>

        <Card>
          <header className="flex items-center justify-between px-5 py-4 border-b border-base-300">
            <h2 className="font-semibold">Izin untuk <span className="text-primary">{active || "-"}</span> <span className="text-slate-400 font-normal">({checked.size} dipilih)</span></h2>
            <div className="flex gap-2">
              <button className="btn btn-sm btn-ghost text-error" onClick={removeRole} disabled={!current}>Hapus role</button>
              <button className="btn btn-sm btn-primary" onClick={save} disabled={saving || !current}>{saving ? "Menyimpan..." : "Simpan izin"}</button>
            </div>
          </header>
          <div className="divide-y divide-base-300">
            {modules.map(([mod, items]) => (
              <div key={mod} className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3">
                <label className="w-56 flex items-center gap-2 font-medium capitalize cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" checked={items.every((i) => checked.has(i.full))} onChange={() => toggleModule(items)} />
                  {mod}
                </label>
                {items.map((i) => (
                  <label key={i.full} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" className="checkbox checkbox-xs" checked={checked.has(i.full)} onChange={() => toggle(i.full)} />
                    {i.action}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <header className="px-5 py-4 border-b border-base-300"><h2 className="font-semibold">Daftar pengguna</h2></header>
        <div className="overflow-x-auto"><table className="table">
          <thead><tr><th>Nama</th><th>Username</th><th>Email</th><th>Role</th></tr></thead>
          <tbody>
            {users.data?.users.map((u) => (
              <tr key={u.id} className="hover"><td className="font-medium">{u.name}</td><td>{u.username}</td><td>{u.email}</td>
                <td>{u.roles?.map((r) => <span key={r} className="badge badge-outline mr-1">{r}</span>)}</td></tr>
            ))}
            {users.data && users.data.users.length === 0 && <tr><td colSpan={4} className="text-center py-6 text-slate-400">Belum ada pengguna.</td></tr>}
          </tbody>
        </table></div>
        <Pager p={users.data?.pagination} onPage={setUserPage} />
      </Card>

      <FormModal open={newRole !== null} title="Role Baru" onClose={() => setNewRole(null)} onSubmit={addRole}>
        <Field label="Nama role"><input className="input input-bordered" required value={newRole ?? ""} onChange={(e) => setNewRole(e.target.value)} /></Field>
      </FormModal>

      <FormModal open={!!userForm} title="Daftarkan Pengguna" onClose={() => setUserForm(null)} onSubmit={registerUser}>
        {userForm && (<>
          {(["name", "initials", "username", "email", "password"] as const).map((k) => (
            <Field key={k} label={{ name: "Nama", initials: "Inisial (untuk paraf)", username: "Username", email: "Email", password: "Password (min. 8)" }[k]}>
              <input className="input input-bordered" type={k === "password" ? "password" : k === "email" ? "email" : "text"} required={k !== "initials"}
                value={userForm[k]} onChange={(e) => setUserForm({ ...userForm, [k]: e.target.value })} />
            </Field>
          ))}
          <Field label="Role">
            <select className="select select-bordered" value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}>
              {list.map((r) => <option key={r.id}>{r.name}</option>)}
            </select>
          </Field>
        </>)}
      </FormModal>
    </div>
  );
};

export default RolePermissions;
