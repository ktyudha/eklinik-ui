import { FunctionComponent } from "react";
import useAdminStore from "@/modules/admin/_store/useAdminStore";
import SettingMedicalRecordHeader from "./SettingMedicalRecordHeader";
import SettingMedicalRecordTab from "./SettingMedicalRecordTab";
import SettingMedicalRecordContentMenu from "./SettingMedicalRecordContent/SettingMedicalRecordContentMenu";

const SettingMedicalRecord: FunctionComponent = () => {
  const { activeMedicalRecordTab } = useAdminStore((state) => ({
    activeMedicalRecordTab: state.activeMedicalRecordTab,
  }));
  return (
    <>
      <div className="max-w-full px-3">
        <SettingMedicalRecordHeader />
        <div className="mt-4">
          <SettingMedicalRecordTab />
          {activeMedicalRecordTab === "menu-setting-medical-record" ? (
            <SettingMedicalRecordContentMenu />
          ) : activeMedicalRecordTab === "menu-setting-medical-record" ? (
            <SettingMedicalRecordContentMenu />
          ) : (
            <SettingMedicalRecordContentMenu />
          )}
        </div>
      </div>
    </>
  );
};

export default SettingMedicalRecord;
