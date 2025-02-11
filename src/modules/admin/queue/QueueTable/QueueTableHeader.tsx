import { FunctionComponent } from "react";
import { UilPlus } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

interface Props {
  setPatientNameCallback: (param: string) => void;
}

const QueueTableHeader: FunctionComponent<Props> = ({
  setPatientNameCallback,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="font-medium text-lg">Antrian</h1>
        </div>
        <div className="flex md:w-auto w-full flex-wrap items-center gap-3">
          <div className="w-full lg:w-60 md:w-60">
            <input
              className="border-2 rounded-lg px-2 py-1.5 font-normal text-md w-full focus:outline-none"
              type="text"
              placeholder="Cari Pasien..."
              onChange={(e) => setPatientNameCallback(e.target.value)}
            />
          </div>
          <button
            className="bg-[#4bb43a] hover:bg-[#4bb43a] px-3 py-2 rounded-lg text-sm text-white font-semibold transition-all duration-200 ease-in-out flex items-center justify-center gap-1 w-full lg:w-auto md:w-auto"
            onClick={() => navigate("create")}
          >
            <UilPlus size="20" color="white" />
            <span className="mb-0.5">Tambah</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default QueueTableHeader;
