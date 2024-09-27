import { FunctionComponent, useEffect } from "react";
import useMapInputOptions from "@hooks/useMapInputOptions";
import useSchoolStore from "@modules/school/_store/useSchoolStore";
import useGetAllAcademicYear from "@services/global/academic-year/hooks/useGetAllAcademicYear";

const SnbpFilter: FunctionComponent = () => {
  const { snbpFilterYear, setSnbpFilterYear } = useSchoolStore((state) => ({
    snbpFilterYear: state.snbpFilterYear,
    setSnbpFilterYear: state.setSnbpFilterYear,
  }));
  const { academic_years } = useGetAllAcademicYear()
  const academicYearOptions  = useMapInputOptions(academic_years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: 5 },
    (_, idx) => parseInt(snbpFilterYear) - 5 + idx
  );

  const selectedYearCheck = () => {
    if (snbpFilterYear === "") {
      setSnbpFilterYear(currentYear.toString())
    }
  }

  useEffect(() => {
    selectedYearCheck()
  }, [])
  
  return (
    <div className="flex flex-col gap-2">
      {/* Academic Year Filter */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg">SNBP Tahun</h1>
          <div className="flex flex-row items-center gap-3">
            <div className="w-60">
              <select
                className="border-2 rounded-lg px-2 py-1.5 font-normal text-md w-full focus:outline-none"
                value={snbpFilterYear}
                onChange={(e) => setSnbpFilterYear(e.target.value)}
              >
                {/* <option value='' selected>Pilih Tahun</option> */}
                {academicYearOptions?.map((option, idx) => {
                  const formattedYear = option.label.split('/')[1]

                  return (
                    <option
                      key={`option-item-${idx}`}
                      value={formattedYear}
                      selected={formattedYear === snbpFilterYear}
                    >
                      {formattedYear}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
      </div>
      {/* Year List */}
      <div className="flex items-center gap-3">
        <span className="italic font-medium text-lg">
          **Data Alumni Tracking melalui jalur SNBP 5 tahun terakhir.
        </span>
        <div className="flex items-center bg-neutral-300 py-1 px-2">
          {yearOptions.map((yearOption, idx) => (
            <div key={`year-item-${idx}`} className="font-semibold">
              <span>{yearOption}</span>
              <span className="mr-1">
                {idx !== yearOptions.length - 1 ? "," : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default SnbpFilter;
