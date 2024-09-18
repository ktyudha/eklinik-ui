import { FunctionComponent, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  UilArrowCircleLeft,
  UilArrowCircleRight,
} from "@iconscout/react-unicons";
import iconTracer from "@/assets/images/icon-tracer.png";
import logoTracer from "@/assets/images/logo-tracer.png";
import useGlobalStore from "@store/useStore";
import sidebarMenus from "./sidebar-menu.constant";
import sidebarAgencyMenus from "./sidebar-agency-menu.constant";
import sidebarSchoolMenus from "./sidebar-school-menu.constant";
import sidebarSubAgencyMenus from "./sidebar-sub-agency-menu.constant";
import SidebarItem from "./SidebarItem";

const DefaultSidebar: FunctionComponent = () => {
  const navigate = useNavigate();
  const { user, userRole, isSidebarExpand } = useGlobalStore((state) => ({
    user: state.user,
    userRole: state.userRole,
    isSidebarExpand: state.isSidebarExpand,
    // setIsSidebarExpand: state.setIsSidebarExpand,
  }));
  console.log(isSidebarExpand);

  const menuList = useMemo(() => {
    if (userRole === "school") {
      if (
        user?.grade?.name !== "SMK" &&
        user?.grade?.name !== "SMA" &&
        user?.grade?.name !== "MA"
      ) {
        return sidebarSchoolMenus.filter(
          (menu) => menu.url !== "/school/alumni-snbp"
        );
      }
      return sidebarSchoolMenus;
    } else if (userRole === "agency") {
      return sidebarAgencyMenus;
    } else if (userRole === "sub-agency") {
      return sidebarSubAgencyMenus;
    } else {
      return sidebarMenus;
    }
  }, [
    userRole,
    sidebarSchoolMenus,
    sidebarAgencyMenus,
    sidebarSubAgencyMenus,
    sidebarMenus,
  ]);

  const { pathname } = useLocation();
  const pathnameSegments = pathname.split("/").slice(1);

  useEffect(() => {
    // Check School Grade
    if (
      user?.grade?.name !== "SMK" &&
      user?.grade?.name !== "SMA" &&
      user?.grade?.name !== "MA"
    ) {
      if (
        pathnameSegments.length > 1 &&
        pathnameSegments[1] === "alumni-snbp"
      ) {
        navigate("/school/dashboard");
      }
    }
  }, [user, pathnameSegments]);

  return (
    <div
      className={`drawer ${isSidebarExpand ? "drawer-open" : "drawer-close"}`}
    >
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side">
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
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
        </ul>
      </div>
    </div>
    // <aside>
    //   <nav
    //     className={`main-menu flex flex-col bg-[#006C1C] gap-4 text-white h-full md:h-screen fixed top-0 left-0 transition-all ${
    //       isSidebarExpand && "w-[240px]"
    //     } overflow-y-auto`}
    //   >
    //     <div className="flex items-center justify-center px-3 pt-5">
    //       {isSidebarExpand ? (
    //         <div className="w-auto">
    //           <img src={logoTracer} alt="Logo" width="150" />
    //         </div>
    //       ) : (
    //         <img src={iconTracer} alt="Logo" width="40" />
    //       )}
    //     </div>

    //     {isSidebarExpand && (
    //       <div className="px-3">
    //         <div className="pb-3 font-semibold text-center border-b-2">
    //           MENU UTAMA
    //         </div>
    //       </div>
    //     )}

    //     {menuList.map((menu, idx) => {
    //       const url = menu.url.split("/").slice(1);
    //       const isActiveMenu = pathnameSegments[1] === url[1];

    //       return (
    //         <SidebarItem
    //           key={`sidebar-item-${idx}`}
    //           {...menu}
    //           icon={menu.icon}
    //           name={menu.name}
    //           url={menu.url}
    //           isActiveMenu={isActiveMenu}
    //         />
    //       );
    //     })}

    //     <div className="flex items-center justify-center w-full mb-5">
    //       <button
    //         onClick={() => setIsSidebarExpand(!isSidebarExpand)}
    //         className="px-2 py-1 rounded"
    //       >
    //         {isSidebarExpand ? (
    //           <UilArrowCircleLeft size="30" />
    //         ) : (
    //           <UilArrowCircleRight size="30" />
    //         )}
    //       </button>
    //     </div>
    //   </nav>
    // </aside>
  );
};

export default DefaultSidebar;
