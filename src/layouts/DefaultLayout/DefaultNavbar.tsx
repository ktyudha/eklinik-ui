import { FunctionComponent, useEffect, useState } from "react";
import clsx from "clsx";
import { UilUser, UilSignOutAlt } from "@iconscout/react-unicons";
import ToggleThemeNavbar from "./ToggleThemeNavbar";
import Avatar from "@assets/icons/avatar.png";
import Spinner from "@/components/reusable/Spinner";
import useGlobalStore from "@/store/useStore";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useAdminLogout } from "@/services/auth/admin-login/hooks/useAdminLogout";
import { useLogout } from "@/services/auth/login/hooks/useLogout";
import { useLocation, useNavigate } from "react-router-dom";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const DefaultNavbar: FunctionComponent = () => {
  const { user, userRole, isSidebarExpand, setIsSidebarExpand } =
    useGlobalStore((state) => ({
      user: state.user,
      userRole: state.userRole,
      isSidebarExpand: state.isSidebarExpand,
      setIsSidebarExpand: state.setIsSidebarExpand,
    }));
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const accountRole =
    userRole === "school"
      ? "Sekolah"
      : userRole === "agency"
      ? "Dinas"
      : userRole === "sub-agency"
      ? "Cabang Dinas"
      : "Admin";
  const isShowProfileButton =
    userRole === "agency" || userRole === "sub-agency" ? true : false;

  const wrapperRef = useOutsideClick(() => {
    setActiveDropdown(false);
  });

  const onNavigateToProfile = () => {
    navigate(`/${userRole}/profile`);
  };

  const onHandleAdminLogout = async () => {
    setIsLoading(true);
    const { data, error } = await useAdminLogout();
    if (data || error) {
      if (data) {
        if (userRole === "admin") {
          Cookies.remove("token");
          // location.replace(`${config.BASE_STUDENT_URL}/login`)
        }
        setIsLoading(false);
        navigate("/admin/login", { replace: true });
      } else {
        setIsLoading(false);
        toast.error("Logout Gagal", {
          position: toast.POSITION.TOP_CENTER,
          data: {
            text: error,
          },
        });
      }
    }
  };

  const onHandleLogout = async () => {
    const { data, error } = await useLogout();
    if (data || error) {
      if (data) {
        if (userRole === "school") {
          Cookies.remove("token-school");
          // location.replace(`${config.BASE_STUDENT_URL}/login`)
        } else if (userRole === "agency") {
          Cookies.remove("token-agency");
          // location.replace(`${config.BASE_STUDENT_URL}/login`)
        } else if (userRole === "sub-agency") {
          Cookies.remove("token-sub-agency");
          // location.replace(`${config.BASE_STUDENT_URL}/login`)
        }
        navigate("/login", { replace: true });
      } else {
        toast.error("Logout Gagal", {
          position: toast.POSITION.TOP_CENTER,
          data: {
            text: error,
          },
        });
      }
    }
  };

  useEffect(() => {
    setActiveDropdown(false);
  }, [location]);

  return (
    <div className="navbar bg-base-200 sticky top-0 z-10">
      <div className="flex-none">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            onClick={() => setIsSidebarExpand(!isSidebarExpand)}
            className="btn btn-square btn-ghost drawer-button lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <div className="mx-4">
          <ToggleThemeNavbar />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <div className="px-4 py-3">
              <span className="block text-sm font-semibold">Bonnie Green</span>
              <span className="block text-sm truncate">name@flowbite.com</span>
            </div>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-red-500">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    // <nav className="flex items-center justify-between px-4 py-3 border-b">
    //   <div />
    //   <div className="flex items-center">
    //     <div className="relative">
    //       <button
    //         onClick={() => setActiveDropdown(!activeDropdown)}
    //         className="flex items-center px-3 py-1 rounded-full border border-[#E2E8F0] w-auto"
    //       >
    //         <img src={Avatar} alt="avatar" className="mr-2" loading="lazy" />
    //         <div className="flex flex-col items-center justify-center pe-3">
    //           <p className="w-full text-sm font-semibold text-gray-800">
    //             {user?.name}
    //           </p>
    //           <div className="text-sm font-semibold text-[#64748B] uppercase">
    //             {accountRole}
    //           </div>
    //         </div>
    //       </button>

    //       {activeDropdown && (
    //         <div
    //           ref={wrapperRef}
    //           className="absolute right-0 z-10 w-48 bg-white rounded shadow-md top-14"
    //         >
    //           <ul className="flex flex-col">
    //             {isShowProfileButton && (
    //               <li className="p-3 shadow-sm">
    //                 <button
    //                   type="button"
    //                   className={clsx([
    //                     "block w-full px-4 py-2 rounded-md text-md font-medium text-center text-neutral-900 hover:bg-neutral-200 flex items-center gap-2",
    //                   ])}
    //                   onClick={onNavigateToProfile}
    //                 >
    //                   <UilUser size="20" color="#171717" />
    //                   Profil
    //                 </button>
    //               </li>
    //             )}
    //             <li className="p-3 shadow-sm rounded-lg">
    //               <button
    //                 type="button"
    //                 className={clsx([
    //                   "block w-full px-4 py-2 rounded-md text-md font-medium text-center text-white flex items-center gap-2",
    //                   isLoading
    //                     ? "bg-green-700"
    //                     : "bg-[#006C1C] hover:bg-green-700",
    //                 ])}
    //                 onClick={() => {
    //                   if (userRole === "admin") {
    //                     onHandleAdminLogout();
    //                   } else {
    //                     onHandleLogout();
    //                   }
    //                 }}
    //                 disabled={isLoading}
    //               >
    //                 <UilSignOutAlt size="20" color="white" />
    //                 {!isLoading ? "Logout" : <Spinner />}
    //               </button>
    //             </li>
    //           </ul>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </nav>
  );
};

export default DefaultNavbar;
