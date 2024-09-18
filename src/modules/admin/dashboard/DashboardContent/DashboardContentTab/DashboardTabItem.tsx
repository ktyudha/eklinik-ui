import useAdminStore from "@/modules/admin/_store/useAdminStore";
import { FunctionComponent } from "react";

interface Props {
  label: string;
  value: string;
}

const DashboardTabItem: FunctionComponent<Props> = ({ label, value }) => {
  const { activeDashboardTab, setActiveDasboardTab } = useAdminStore(
    (state) => ({
      activeDashboardTab: state.activeDashboardTab,
      setActiveDasboardTab: state.setActiveDasboardTab,
    })
  );

  const isActive = activeDashboardTab === value;

  return (
    <li className="w-full">
      <a
        href="#"
        className={`inline-block w-full px-4 py-1 active focus:outline-none text-lg rounded-full ${
          isActive
            ? "bg-[#006C1C] text-white border-2 border-white"
            : "bg-[#006C1C] text-white text-gray-900"
        }`}
        aria-current="page"
        onClick={() => setActiveDasboardTab(value)}
      >
        {label}
      </a>
    </li>
  );
};

export default DashboardTabItem;
