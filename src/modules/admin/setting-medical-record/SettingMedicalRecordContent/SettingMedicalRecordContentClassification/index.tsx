import { FunctionComponent } from "react";
import MedicineHeader from "./MedicineHeader";
import MedicineTable from "./MedicineTable";

const Medicine: FunctionComponent = () => {
  return (
    <div className="max-w-full px-3">
      <MedicineHeader />

      <div className="mt-10">
        <MedicineTable />
      </div>
    </div>
  );
};

export default Medicine;
