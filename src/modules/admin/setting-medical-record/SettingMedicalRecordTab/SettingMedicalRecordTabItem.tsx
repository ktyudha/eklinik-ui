import { FunctionComponent } from "react";
import clsx from "clsx";
import useAdminStore from "@/modules/admin/_store/useAdminStore";

interface Props {
  label: string;
  value: string;
}

const SettingMedicalRecordTabItem: FunctionComponent<Props> = ({
  label,
  value,
}) => {
  const { activeMedicalRecordTab, setActiveMedicalRecordTab } = useAdminStore(
    (state) => ({
      activeMedicalRecordTab: state.activeMedicalRecordTab,
      setActiveMedicalRecordTab: state.setActiveMedicalRecordTab,
    })
  );

  const isActive = activeMedicalRecordTab === value;

  return (
    <li className="flex-1 sm:flex-none">
      <button
        type="button"
        className={clsx([
          "w-full whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all",
          isActive ? "bg-white text-brand-600 shadow-sm" : "text-gray-500 hover:text-gray-800",
        ])}
        aria-current={isActive ? "page" : undefined}
        onClick={() => setActiveMedicalRecordTab(value)}
      >
        {label}
      </button>
    </li>
  );
};

export default SettingMedicalRecordTabItem;
