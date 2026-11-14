import { FunctionComponent, Fragment } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import Logo from "@/assets/logo/logo-bidan-susenowati.svg";
import LogoCircle from "@/assets/logo/logo-bidan-susenowati-circle.svg";
import useGlobalStore from "@/store/useStore";
import sidebarMenus from "./sidebar-menu.constant";
import SidebarItem from "./SidebarItem";

const DefaultSidebar: FunctionComponent = () => {
  const { pathname } = useLocation();
  const segment = pathname.split("/")[2];
  const collapsed = !useGlobalStore((s) => s.isSidebarExpand);
  let lastGroup = "";

  return (
    <div className="drawer-side z-20 mt-[64px] lg:mt-0">
      <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay" />
      <aside style={{ transition: "width .3s cubic-bezier(.4,0,.2,1)" }} className={clsx("flex min-h-full w-72 flex-col overflow-x-hidden border-r border-gray-200 bg-white will-change-[width]", collapsed ? "lg:w-[84px]" : "lg:w-72")}>
        {/* dua logo saling memudar */}
        <a href="/admin/dashboard" className="relative hidden h-[88px] shrink-0 items-center justify-center border-b border-gray-100 lg:flex">
          <img src={Logo} alt="Bidan Susenowati" className={clsx("absolute max-w-52 transition-opacity duration-300", collapsed ? "opacity-0" : "opacity-100")} />
          <img src={LogoCircle} alt="" className={clsx("absolute h-10 w-10 transition-opacity duration-300", collapsed ? "opacity-100" : "opacity-0")} />
        </a>

        <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden p-3">
          {sidebarMenus.map((menu) => {
            const showGroup = menu.group !== lastGroup;
            const first = lastGroup === "";
            lastGroup = menu.group;
            return (
              <Fragment key={menu.url}>
                {showGroup && (
                  <div className={clsx("relative transition-all duration-300", first ? "h-6" : "mt-3 h-7")}>
                    <p className={clsx("absolute inset-x-3 bottom-1 whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider text-gray-400 transition-opacity duration-300", collapsed ? "opacity-0" : "opacity-100")}>{menu.group}</p>
                    {!first && <span className={clsx("absolute inset-x-3 bottom-2 border-t border-gray-100 transition-opacity duration-300", collapsed ? "opacity-100" : "opacity-0")} />}
                  </div>
                )}
                <SidebarItem {...menu} collapsed={collapsed} isActiveMenu={segment === menu.url.split("/")[2]} />
              </Fragment>
            );
          })}
        </nav>
      </aside>
    </div>
  );
};

export default DefaultSidebar;
