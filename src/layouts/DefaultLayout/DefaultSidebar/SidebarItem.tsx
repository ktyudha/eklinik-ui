import { FunctionComponent, useEffect, useState } from "react";
import { UilAngleDown } from "@iconscout/react-unicons";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import type { SidebarMenu } from "./sidebar-menu.constant";

type Props = Omit<SidebarMenu, "group"> & { isActiveMenu: boolean; collapsed?: boolean };

/** Label ikut mengecil (lebar + opacity) alih-alih dicabut, supaya transisi collapse mulus. */
const Label: FunctionComponent<{ collapsed: boolean; children: React.ReactNode; className?: string }> = ({ collapsed, children, className }) => (
  <span className={clsx("overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out", collapsed ? "max-w-0 opacity-0" : "max-w-[180px] opacity-100", className)}>{children}</span>
);

const SidebarItem: FunctionComponent<Props> = ({ icon: Icon, name, url, isActiveMenu, isDropdown, hasSubmenu, submenuLinks, collapsed = false }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(isActiveMenu);

  // saat mode ikon, submenu menutup; saat dibuka lagi, kembali sesuai halaman aktif
  useEffect(() => { if (collapsed) setOpen(false); else setOpen(isActiveMenu); }, [collapsed]); // eslint-disable-line react-hooks/exhaustive-deps

  const base = "flex w-full items-center gap-3 rounded-lg px-5 py-2.5 text-[13px] font-medium transition-colors duration-200";
  const state = isActiveMenu ? "bg-brand-50 text-brand-500" : "text-gray-700 hover:bg-gray-100";
  const icon = <Icon size={20} className="shrink-0" />;

  if (!isDropdown || !hasSubmenu) {
    return (
      <NavLink to={url} title={collapsed ? name : undefined} className={clsx(base, state)}>
        {icon}<Label collapsed={collapsed}>{name}</Label>
      </NavLink>
    );
  }

  return (
    <div>
      <button type="button" title={collapsed ? name : undefined} aria-expanded={open} className={clsx(base, state)}
        onClick={() => (collapsed ? navigate(submenuLinks?.[0]?.subUrl ?? url) : setOpen((o) => !o))}>
        {icon}
        <Label collapsed={collapsed} className="flex-1 text-left">{name}</Label>
        <UilAngleDown size={18} className={clsx("shrink-0 transition-all duration-300", open && "rotate-180", collapsed && "w-0 opacity-0")} />
      </button>
      <div className={clsx("grid transition-[grid-template-rows,opacity] duration-300 ease-in-out", open && !collapsed ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <ul className="ml-5 min-h-0 space-y-0.5 overflow-hidden border-l border-gray-200 pl-3">
          {submenuLinks?.map((sub) => (
            <li key={sub.subUrl}>
              <button type="button" tabIndex={open && !collapsed ? 0 : -1} onClick={() => navigate(sub.subUrl)}
                className={clsx("w-full rounded-md px-3 py-2 text-left text-sm transition-colors", pathname.startsWith(sub.subUrl) ? "bg-brand-50 font-medium text-brand-500" : "text-gray-500 hover:text-gray-900")}>
                {sub.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarItem;
