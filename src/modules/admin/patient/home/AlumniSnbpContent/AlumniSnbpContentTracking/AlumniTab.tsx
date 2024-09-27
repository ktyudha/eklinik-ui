import { FunctionComponent } from "react";
import useSchoolStore from "@modules/school/_store/useSchoolStore";

const AlumniTab: FunctionComponent = () => {
  const { activeRecapitulationAlumniSnbpStudyType, setActiveRecapitulationAlumniSnbpStudyType } = useSchoolStore((state) => ({
    activeRecapitulationAlumniSnbpStudyType: state.activeRecapitulationAlumniSnbpStudyType,
    setActiveRecapitulationAlumniSnbpStudyType: state.setActiveRecapitulationAlumniSnbpStudyType,
  }));

  return (
    <div className="border-b border-gray-200">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
        <li className="me-2">
          <button
            type="button"
            className={`inline-flex items-center justify-center p-4 py-2 border-b-2 rounded-t-lg group ${
              activeRecapitulationAlumniSnbpStudyType === "university"
                ? "active text-white bg-orange-500 rounded-t-lg"
                : "bg-gray-200 text-gray-900"
            }`}
            onClick={() => setActiveRecapitulationAlumniSnbpStudyType("university")}
          >
            Perguruan Tinggi
          </button>
        </li>
        <li className="me-2">
          <button
            type="button"
            className={`inline-flex items-center justify-center p-4 py-2 border-b-2 rounded-t-lg group ${
              activeRecapitulationAlumniSnbpStudyType === "department"
                ? "active text-white bg-orange-500 rounded-t-lg"
                : "bg-gray-200 text-gray-900"
            }`}
            onClick={() => setActiveRecapitulationAlumniSnbpStudyType("department")}
          >
            Program Studi
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AlumniTab;
