import { FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecapitulationDetailHeader from "./RecapitulationDetailHeader";
import DomesticUniversityTable from "./DomesticUniversityTable";
import DomesticDepartmentTable from "./DomesticDepartmentTable";
import OverseasUniversityTable from "./OverseasUniversityTable";

const RecapitulationDetail: FunctionComponent = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div className="max-w-full px-3">
      <RecapitulationDetailHeader />

      <div className="flex flex-col gap-5 mt-4">
        {state.location === "domestic" && state.type === "university" ? (
          <DomesticUniversityTable />
        ) : state.location === "domestic" && state.type === "department" ? (
          <DomesticDepartmentTable />
        ) : (
          <OverseasUniversityTable />
        )}
      </div>

      <div className="flex justify-end w-full gap-3 mt-3">
        <button
          type="button"
          className="px-20 py-3 text-base font-medium leading-4 text-white bg-yellow-400 rounded-lg hover:bg-yellow-500"
          onClick={() => navigate("/school/alumni-snbp")}
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default RecapitulationDetail;
