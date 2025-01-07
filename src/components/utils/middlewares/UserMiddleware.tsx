import Loader from "@/components/reusable/Loader";
import { useGetMe } from "@/services/auth/login/hooks/useGetMe";
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

const UserMiddleware: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const {
    user,
    userRole,
    userCreatedAt,
    userUpdatedAt,
    setUser,
    setUserRole,
    setUserCreatedAt,
    setUserUpdatedAt,
  } = useGlobalStore(
    (state) => ({
      user: state.user,
      userRole: state.userRole,
      userCreatedAt: state.userCreatedAt,
      userUpdatedAt: state.userUpdatedAt,
      setUser: state.setUser,
      setUserRole: state.setUserRole,
      setUserCreatedAt: state.setUserCreatedAt,
      setUserUpdatedAt: state.setUserUpdatedAt,
    }),
    shallow
  );
  const [mounted, setMounted] = useState(false);
  const cookie =
    Cookies.get("token-school") ||
    Cookies.get("token-agency") ||
    Cookies.get("token-sub-agency");
  const ignoreRefetch = useRef(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const getUserData = useCallback(async () => {
    const { data, error, status } = await useGetMe();
    if (!error && status === 200 && data) {
      setUserRole(data.role);
      if (
        data.role === "school" ||
        data.role === "sub-agency" ||
        data.role === "agency"
      ) {
        setUser(data?.user);
      }
      setUserCreatedAt(data.created_at);
      setUserUpdatedAt(data.updated_at);
    } else {
      navigate("/login", { replace: true });
    }
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cookie && !user && !ignoreRefetch.current) {
      getUserData();
    } else if (cookie && user) {
      if (pathname === "/login") {
        if (userRole === "school") {
          navigate("/school/dashboard");
        } else if (userRole === "agency") {
          navigate("/agency/dashboard");
        } else {
          navigate("/sub-agency/dashboard");
        }
      } else {
        if (userRole === "school" && userCreatedAt === userUpdatedAt) {
          navigate("/school/profile/change-password");
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
  }, [cookie, pathname, user, userRole, navigate, getUserData]);

  return <>{mounted ? children : <Loader />}</>;
};

export default UserMiddleware;
