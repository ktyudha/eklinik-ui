import { FunctionComponent } from "react";
import { isEmpty } from "lodash";
import { formattedDateTime2 } from "@/helpers/date";
import useGetAllMedical from "@/services/patient/medical/hooks/useGetAllMedical";

const LandingHistory: FunctionComponent = () => {
  const { medicals } = useGetAllMedical();

  return (
    <section className="mx-auto min-h-[80vh] max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Riwayat pemeriksaan</h1>
      <p className="mt-1 text-gray-500">Catatan kunjungan Anda di klinik.</p>

      {isEmpty(medicals) ? (
        <div className="mt-16 text-center text-gray-400">
          <p className="text-5xl">🗂️</p>
          <p className="mt-3 font-medium text-gray-500">Belum ada riwayat</p>
          <p className="text-sm">Riwayat akan muncul setelah pemeriksaan pertama.</p>
        </div>
      ) : (
        <ol className="relative mt-8 space-y-4 border-l-2 border-brand-100 pl-6">
          {medicals?.map((m) => (
            <li key={m.id} className="relative">
              <span className="absolute -left-[33px] top-5 h-3 w-3 rounded-full bg-brand-600 ring-4 ring-white" />
              <div className="surface surface-hover p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{m.classification.name}</span>
                  <span className="text-xs text-gray-400">No. RM {m.patient.mrn}</span>
                </div>
                <p className="mt-3 font-semibold text-gray-900">{m.patient.name}</p>
                <p className="text-sm text-gray-500">{formattedDateTime2(m.checkup_date)}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};

export default LandingHistory;
