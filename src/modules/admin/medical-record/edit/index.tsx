import { FunctionComponent } from "react";
import MedicalRecordCreateHeader from "./MedicalRecordCreateHeader";
import MedicalRecordCreateContent from "./MedicalRecordCreateContent";

const MedicaleRecordEdit: FunctionComponent = () => {
  return (
    <div className="max-w-full px-3">
      <MedicalRecordCreateHeader />
      <MedicalRecordCreateContent />
    </div>
  );
};

export default MedicaleRecordEdit;
