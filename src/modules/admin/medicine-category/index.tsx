import { FunctionComponent } from "react";
import MedicineCategoryHeader from "./MedicineCategoryHeader";
import MedicineCategoryTable from "./MedicineCategoryTable";

const MedicineCategory: FunctionComponent = () => {
  return (
    <div className="max-w-full px-3">
      <MedicineCategoryHeader />

      <div className="mt-10">
        <MedicineCategoryTable />
      </div>
    </div>
  );
};

export default MedicineCategory;
