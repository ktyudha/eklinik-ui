import { FunctionComponent } from "react";
import { UilPlus } from "@iconscout/react-unicons";
// import CreatePatientModal from "../PatientModals/CreatePatientModal";
import { useNavigate } from "react-router-dom";
import { adminFetcher } from "@/lib/admin-api";
import { downloadCsv } from "@/helpers/export-csv";
import { toast } from "react-toastify";

interface Props {
  setNameCallback: (param: string) => void;
}

const MedicalRecordTableHeader: FunctionComponent<Props> = ({
  setNameCallback,
}) => {
  // const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const exportCsv = async () => {
    try {
      const res = await adminFetcher<{ medicals: { checkup_date: string; patient: { mrn: string; name: string }; classification: { name: string } }[] }>(
        "/admin/medical?page_limit=100"
      );
      downloadCsv(`rekam-medis-${new Date().toISOString().slice(0, 10)}.csv`, res.medicals.map((m) => ({
        Tanggal: String(m.checkup_date).slice(0, 10), "No. RM": m.patient?.mrn, Pasien: m.patient?.name, Klasifikasi: m.classification?.name,
      })));
    } catch { toast.error("Gagal mengekspor"); }
  };
  return (
    <>
      {/* <CreatePatientModal onOpen={open} onClose={() => setOpen(false)} /> */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="font-medium text-lg">Rekam Medis</h1>
        </div>
        <div className="flex md:w-auto w-full flex-wrap items-center gap-3">
          <div className="w-full lg:w-60 md:w-60">
            <input
              className="input input-bordered input-sm h-9 w-full focus:border-primary focus:outline-none"
              type="text"
              placeholder="Cari Pasien..."
              onChange={(e) => setNameCallback(e.target.value)}
            />
          </div>
          <button className="btn btn-outline btn-sm h-9 w-full lg:w-auto" onClick={exportCsv}>Ekspor CSV</button>
          <button
            className="bg-primary hover:bg-brand-dark px-3 py-2 rounded-lg text-sm text-white font-semibold transition-all duration-200 ease-in-out flex items-center justify-center gap-1 w-full lg:w-auto md:w-auto"
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

export default MedicalRecordTableHeader;
