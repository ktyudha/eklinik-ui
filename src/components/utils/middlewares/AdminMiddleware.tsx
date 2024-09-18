import Loader from "@/components/reusable/Loader";
import { useAdminGetMe } from "@/services/auth/admin-login/hooks/useAdminGetMe";
import useGlobalStore from "@/store/useStore";
import Cookies from "js-cookie";
import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";

const AdminMiddleware: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { user, userRole, setUser, setUserRole } = useGlobalStore(
    (state) => ({
      user: state.user,
      userRole: state.userRole,
      setUser: state.setUser,
      setUserRole: state.setUserRole,
    }),
    shallow
  );
  const [mounted, setMounted] = useState(false);
  const cookie = Cookies.get("token");
  const ignoreRefetch = useRef(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const getAdminData = useCallback(async () => {
    const { data, error, status } = await useAdminGetMe();
    if (!error && status === 200 && data) {
      setUserRole(data.role);
      setUser(data?.user);
    } else {
      navigate("/admin/login", { replace: true });
    }
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cookie && !user && !ignoreRefetch.current) {
      getAdminData();
    } else if (cookie && user) {
      if (pathname === "/admin/login") {
        if (userRole === "admin") {
          navigate("/admin/dashboard");
        }
      }
      setMounted(true);
    } else if (!cookie) {
      if (
        pathname !== "/login" &&
        pathname !== "/admin/login" &&
        pathname !== "/alumni/login"
      ) {
        navigate("/alumni/login");
      }
      setMounted(true);
    }

    ignoreRefetch.current = true;
  }, [cookie, navigate, getAdminData, pathname, user, userRole]);

  return <>{mounted ? children : <Loader />}</>;
};

export default AdminMiddleware;
