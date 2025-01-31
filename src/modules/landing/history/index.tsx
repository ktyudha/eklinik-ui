import { FunctionComponent } from "react";
import { isEmpty } from "lodash";
import { formattedDateTime2 } from "@/helpers/date";
import useGetAllMedical from "@/services/patient/medical/hooks/useGetAllMedical";
import EmptyIcon from "@/assets/icons/empty.png";
const LandingHistory: FunctionComponent = () => {
  const { medicals } = useGetAllMedical();
  return (
    <>
      <section className="md:mx-auto bg-white max-w-screen-xl">
        <div className="mx-4 md:px-4 pt-4">
          {isEmpty(medicals) ? (
            <div className="flex flex-col items-center justify-center gap-3 h-full">
              <img src={EmptyIcon} alt="Icon" className="md:w-36 w-20" />
              <h1 className="font-semibold md:text-lg text-base">
                Tidak Ada Data
              </h1>
            </div>
          ) : (
            medicals?.map((medical) => (
              <div className="bg-gray-50 rounded-lg px-4 py-3">
                <div className="flex justify-between mb-2">
                  <span className="bg-[#4bb43a] text-white rounded-full px-3 text-sm my-auto">
                    {medical.classification.name}
                  </span>
                  <span className="text-xs my-auto">
                    NRM/{medical.patient.mrn}
                  </span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-medium mb-2 uppercase">
                      {medical.patient.name}
                    </h3>
                    <p className="text-xs">
                      {formattedDateTime2(medical.checkup_date)}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <button
                      type="button"
                      className="text-xs font-medium flex gap-6 hover:underline"
                    >
                      Lihat Detail
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-chevron-right w-3 h-3 my-auto text-[#4bb43a]"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default LandingHistory;
