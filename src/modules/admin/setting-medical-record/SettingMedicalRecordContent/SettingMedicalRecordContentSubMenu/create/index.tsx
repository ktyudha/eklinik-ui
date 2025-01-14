import { FunctionComponent } from "react";
import SubMenuCreateHeader from "./SubMenuCreateHeader";
import SubMenuCreateContent from "./SubMenuCreateContent";

const MedicaleRecordCreate: FunctionComponent = () => {
  return (
    <div className="max-w-full px-3">
      <SubMenuCreateHeader />
      <SubMenuCreateContent />
    </div>
  );
};

export default MedicaleRecordCreate;
