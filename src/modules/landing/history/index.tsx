import { FunctionComponent } from "react";
import useGetAllMedical from "@/services/patient/medical/hooks/useGetAllMedical";

const LandingHistory: FunctionComponent = () => {
  const { medicals } = useGetAllMedical();

  return (
    <>
      <section className="px-4">
        {medicals?.map((medical) => (
          <div className="bg-base-200 rounded-lg px-4 py-2">
            <div className="flex justify-between mb-2">
              <span className="bg-[#9fe194] text-[#285a21] rounded-full px-3 text-sm my-auto">
                {medical.classification.name}
              </span>
              <span className="text-xs my-auto">{medical.patient.mrn}</span>
            </div>
            <h3 className="text-xl font-medium mb-2">{medical.patient.name}</h3>
            <p className="text-xs">{medical.checkup_date}</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default LandingHistory;
