import { FunctionComponent } from "react";
import tab_items from "./tab-item-constant";
import SettingMedicalRecordTabItem from "./SettingMedicalRecordTabItem";

const SettingMedicalRecordTab: FunctionComponent = () => {
  return (
    <ul className="text-sm font-medium text-center text-white rounded-xl md:rounded-full lg:rounded-full shadow sm:flex bg-[#7e2e9d] p-1">
      {tab_items.map((tab, idx) => (
        <SettingMedicalRecordTabItem
          key={`tab-item-${idx}`}
          label={tab.label}
          value={tab.value}
        />
      ))}
    </ul>
  );
};

export default SettingMedicalRecordTab;
