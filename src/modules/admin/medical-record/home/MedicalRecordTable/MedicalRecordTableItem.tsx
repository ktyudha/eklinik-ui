import { FunctionComponent } from "react";
import { format as dateFormat } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Medical } from "@/services/admin/medical/interfaces/get-all-medical.types";
import MedicalRecordTableItemMenu from "./MedicalRecordTableItemMenu";

interface Props {
  number: number;
  medical: Medical;
}

const MedicalRecordTableItem: FunctionComponent<Props> = ({
  number,
  medical,
}) => {
  const formattedCheckupDate = medical.checkup_date
    ? dateFormat(new Date(medical.checkup_date), "eeee, dd MMMM yyyy H:mm:ss", {
        locale: localeId,
      })
    : "";
  return (
    <tr>
      <td className="mx-auto text-center">{number}</td>
      <td className="px-6">{medical.patient.mrn}</td>
      <td className="px-6 uppercase">{medical.patient.name}</td>
      <td className="px-6">{formattedCheckupDate}</td>
      <td className="px-6 ">
        <span className="rounded-full border border-[#4bb43a] text-[#4bb43a] hover:bg-[#4bb43a] hover:text-white cursor-pointer ease-in-out duration-300 px-3 py-1">
          {medical.classification.name}
        </span>
      </td>
      <td className="flex flex-row gap-3">
        {/* <label
          htmlFor={`patient-modal-${number}`}
          className="flex items-center justify-center gap-1 hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 rounded-md w-full p-1"
        >
          <UilEye size="15" />
          <span className="text-xs ">Detail</span>
        </label>

        <PatientModal number={number} patient={patient} />

        <button
          type="button"
          className="flex items-center justify-center gap-1 hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 rounded-md w-full p-1"
        >
          <UilPen size="15" />
          <span className="text-xs">Ubah</span>
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-1 hover:bg-red-400 hover:text-white border border-red-400 text-red-400 rounded-md w-full p-1"
        >
          <UilTrashAlt size="15" />
          <span className="text-xs">Hapus</span>
        </button> */}
        <MedicalRecordTableItemMenu medical={medical} />
      </td>
    </tr>
  );
};

export default MedicalRecordTableItem;
