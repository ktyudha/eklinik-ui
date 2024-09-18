import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
// import useGlobalStore from "@/store/useStore";
import DefaultSidebar from "./DefaultSidebar";
import DefaultNavbar from "./DefaultNavbar";

const DefaultLayout: FunctionComponent = () => {
  // const { isSidebarExpand } = useGlobalStore((state) => ({
  //   isSidebarExpand: state.isSidebarExpand,
  // }));

  return (
    <div className="main-layout">
      <DefaultNavbar />
      <DefaultSidebar />
      <div className="container max-w-full p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
