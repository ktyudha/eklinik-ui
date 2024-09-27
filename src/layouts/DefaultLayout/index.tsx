import { FunctionComponent } from "react";

import useGlobalStore from "@/store/useStore";
import DefaultSidebar from "./DefaultSidebar";
import DefaultPage from "./DefaultPage";

const DefaultLayout: FunctionComponent = () => {
  const { isSidebarExpand } = useGlobalStore((state) => ({
    isSidebarExpand: state.isSidebarExpand,
  }));

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <DefaultSidebar />
      <DefaultPage />
    </div>
  );
};

export default DefaultLayout;
