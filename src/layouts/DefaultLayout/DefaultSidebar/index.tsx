import { FunctionComponent, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import {
//   UilArrowCircleLeft,
//   UilArrowCircleRight,
// } from "@iconscout/react-unicons";
// import iconTracer from "@/assets/images/icon-tracer.png";
import Logo from "@/assets/logo/logo-bidan-susenowati.svg";
import useGlobalStore from "@/store/useStore";
import sidebarMenus from "./sidebar-menu.constant";

import SidebarItem from "./SidebarItem";

const DefaultSidebar: FunctionComponent = () => {
  const navigate = useNavigate();
  const { user, userRole } = useGlobalStore((state) => ({
    user: state.user,
    userRole: state.userRole,
  }));

  const menuList = useMemo(() => {
    return sidebarMenus;
  }, [userRole, sidebarMenus]);

  const { pathname } = useLocation();
  const pathnameSegments = pathname.split("/").slice(1);

  useEffect(() => {
    // Check School Grade
    {
      if (
        pathnameSegments.length > 1 &&
        pathnameSegments[1] === "alumni-snbp"
      ) {
        navigate("/school/dashboard");
      }
    }
  }, [user, pathnameSegments]);

  return (
    <div className="drawer-side  z-20 mt-[66px] lg:mt-0">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu pt-2 w-80 bg-base-100 min-h-full text-base-content">
        {/* Sidebar content here */}
        <a
          href="/admin/dashboard"
          className="mt-3 mb-6 font-semibold text-xl hidden lg:block mx-auto"
        >
          <img src={Logo} alt="logo-bidan-susenowati" className="max-w-64" />
        </a>

        <li className="gap-1">
          {menuList.map((menu, idx) => {
            const url = menu.url.split("/").slice(1);
            const isActiveMenu = pathnameSegments[1] === url[1];

            return (
              <SidebarItem
                key={`sidebar-item-${idx}`}
                {...menu}
                icon={menu.icon}
                name={menu.name}
                url={menu.url}
                isActiveMenu={isActiveMenu}
              />
            );
          })}
        </li>
      </ul>
    </div>
  );
};

export default DefaultSidebar;
