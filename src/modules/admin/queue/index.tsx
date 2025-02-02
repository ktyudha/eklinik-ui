import { FunctionComponent } from "react";
import QeueuHeader from "./QueueHeader";
import QueueTable from "./QueueTable";

const MedicineCategory: FunctionComponent = () => {
  return (
    <div className="max-w-full px-3">
      <QeueuHeader />

      <div className="mt-10">
        <QueueTable />
      </div>
    </div>
  );
};

export default MedicineCategory;
