import { FunctionComponent } from "react";

import { UilPrint, UilFileDownload } from "@iconscout/react-unicons";
import useSchoolStore from "@modules/school/_store/useSchoolStore";

import AlumniTab from "./AlumniTab";
import UniversityTable from "./DomesticUniversityTable";
import DepartementTable from "./DomesticDepartmentTable";
import SnbpFilter from "./SnbpFilter";
import DomesticUniversitySelect from "./DomesticUniversityTable/DomesticUniversitySelect";
import DomesticDepartmentSelect from "./DomesticDepartmentTable/DomesticDepartmentSelect";

const AlumniSnbpContentTracking: FunctionComponent = () => {
  const { activeRecapitulationAlumniSnbpStudyType } = useSchoolStore(
    (state) => ({
      activeRecapitulationAlumniSnbpStudyType: state.activeRecapitulationAlumniSnbpStudyType,
    })
  );

  // const onDownload = async (fileType: string) => {
  //   await useExportRecapitualtionStudy({
  //     fileType,
  //     location: "domestic",
  //     schoolId: user?.id,
  //   });
  // };

  return (
    <div className="flex flex-col gap-5">
      <AlumniTab />
      <div className="flex flex-col gap-2">
        <SnbpFilter />
        <div className="w-full h-auto p-3 border border-[#E2E8F0] rounded-md mb-1">
          <div className="flex flex-wrap items-start justify-between gap-2 md:gap-0">
            {/* Search */}
            <div className="flex flex-row items-center gap-3">
              <div className="w-72">
                {activeRecapitulationAlumniSnbpStudyType === "university" ? (
                  <DomesticUniversitySelect />
                ) : (
                  <DomesticDepartmentSelect />
                )}
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-1 hover:bg-transparent bg-[#35BB5D] px-3 py-1.5 border border-[#35BB5D] rounded-lg text-sm hover:text-[#35BB5D] text-white transition-all duration-200 ease-in-out"
                // onClick={() => onDownload("excel")}
              >
                <UilFileDownload size={20} />
                <span className="font-medium">Excel</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1 hover:bg-transparent bg-[#3B82F6] px-3 py-1.5 border border-[#3B82F6] rounded-lg text-sm hover:text-[#3B82F6] text-white transition-all duration-200 ease-in-out"
                // onClick={() => onDownload("pdf")}
              >
                <UilPrint size={20} />
                <span className="font-medium">Cetak</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {activeRecapitulationAlumniSnbpStudyType === "university" ? (
        <UniversityTable />
      ) : (
        <DepartementTable />
      )}
    </div>
  );
};

export default AlumniSnbpContentTracking;
