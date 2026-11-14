import { useAdminGet, adminSend } from "@/lib/admin-api";

export interface Role { id: number | string; name: string; permissions?: string[] }

export const useRoles = () => useAdminGet<{ roles: Role[] }>("/admin/roles");
export const useAllPermissions = () => useAdminGet<{ permissions: string[] }>("/admin/permissions");

export const roleApi = {
  create: (name: string) => adminSend("post", "/admin/roles", { name }, "/admin/roles"),
  remove: (id: Role["id"]) => adminSend("delete", `/admin/roles/${id}`, undefined, "/admin/roles"),
  setPermissions: (role: string, permissions: string[]) =>
    adminSend("post", "/admin/roles/permissions", { role, permissions }, "/admin/roles"),
  registerUser: (b: Record<string, unknown>) => adminSend("post", "/admin/user/register", b),
};
