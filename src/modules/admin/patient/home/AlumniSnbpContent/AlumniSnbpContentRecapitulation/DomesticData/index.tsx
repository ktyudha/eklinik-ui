import { FunctionComponent, useState } from "react";
import { UilPrint, UilFileDownload } from "@iconscout/react-unicons";
import UniversityTable from "./UniversityTable";
import DepartementTable from "./DepartementTable";
import SnbpFilter from "./SnbpFilter";

const DomesticData: FunctionComponent = () => {
  const [type, setType] = useState<string>("university");

  return (
    <div className="flex flex-col gap-5">
      <SnbpFilter />

      <div className="grid grid-cols-12">
        <div className="flex flex-col col-span-12 overflow-auto">
          <div className="w-full overflow-auto h-auto p-3 border border-[#E2E8F0] rounded-md mb-1">
            <div className="flex flex-wrap items-start justify-between gap-2 md:gap-0">
              {/* filter */}
              <div className="flex items-center gap-5">
                <h1 className="text-lg font-medium">Data Berdasarkan</h1>
                <div className="flex flex-row items-center gap-3">
                  <div className="w-72">
                    <select
                      className="border-2 rounded-lg px-2 py-1.5 font-normal text-md w-full focus:outline-none"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="university">Perguruan Tinggi</option>
                      <option value="departement">
                        Program Studi / Bidang Keahlian
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* action */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="flex items-center gap-1 hover:bg-transparent bg-[#35BB5D] px-3 py-1.5 border border-[#35BB5D] rounded-lg text-sm hover:text-[#35BB5D] text-white transition-all duration-200 ease-in-out"
                >
                  <UilFileDownload size={20} />
                  <span className="font-medium">Excel</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 hover:bg-transparent bg-[#3B82F6] px-3 py-1.5 border border-[#3B82F6] rounded-lg text-sm hover:text-[#3B82F6] text-white transition-all duration-200 ease-in-out"
                >
                  <UilPrint size={20} />
                  <span className="font-medium">Cetak</span>
                </button>
              </div>
            </div>

            {type === "university" ? (
              <UniversityTable />
            ) : (
              <DepartementTable />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomesticData;
