import { FunctionComponent } from "react";
import tab_items from "./tab-item-constant";
import SettingMedicalRecordTabItem from "./SettingMedicalRecordTabItem";

/** Kontrol segmen: sederhana dan jelas tab mana yang aktif. */
const SettingMedicalRecordTab: FunctionComponent = () => (
  <ul className="flex w-full gap-1 rounded-xl bg-gray-100 p-1 sm:w-fit">
    {tab_items.map((tab, idx) => (
      <SettingMedicalRecordTabItem key={`tab-item-${idx}`} label={tab.label} value={tab.value} />
    ))}
  </ul>
);

export default SettingMedicalRecordTab;
