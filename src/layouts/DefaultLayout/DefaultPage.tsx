import { FunctionComponent, useEffect, useState } from "react";
import clsx from "clsx";
import { Outlet } from "react-router-dom";
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
import DefaultNavbar from "./DefaultNavbar";

const DefaultPage: FunctionComponent = () => {
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
    <div className="drawer-content flex flex-col h-screen">
      <DefaultNavbar />
      <main className="flex-1 overflow-y-auto px-4 py-8 md:p-12 bg-base-200">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultPage;
