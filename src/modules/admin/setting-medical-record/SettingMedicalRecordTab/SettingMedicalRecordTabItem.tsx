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
    <li className="w-full">
      <div
        className={clsx([
          "inline-block w-full px-4 py-1 active focus:outline-none text-lg rounded-xl md:rounded-full lg:rounded-full cursor-pointer",
          isActive
            ? "bg-gradient-to-r from-[#7e2e9d] to-[#f6abd4] text-white border-2 border-white"
            : "bg-[#7e2e9d] text-white",
        ])}
        aria-current="page"
        onClick={() => setActiveMedicalRecordTab(value)}
      >
        {label}
      </div>
    </li>
  );
};

export default SettingMedicalRecordTabItem;
