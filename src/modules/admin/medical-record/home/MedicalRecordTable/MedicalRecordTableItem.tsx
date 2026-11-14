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
        <span className="rounded-full border  text-center border-[#4bb43a] text-[#4bb43a] hover:bg-primary hover:text-white cursor-pointer ease-in-out duration-300 px-3 py-1">
          {medical.classification.name}
        </span>
      </td>
      <td className="flex flex-row gap-3">
        {/* <label
          htmlFor={`patient-modal-${number}`}
          className="flex items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-gray-600 transition-colors hover:bg-gray-100"
        >
          <UilEye size="15" />
          <span className="text-xs ">Detail</span>
        </label>

        <PatientModal number={number} patient={patient} />

        <button
          type="button"
          className="flex items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-gray-600 transition-colors hover:bg-gray-100"
        >
          <UilPen size="15" />
          <span className="text-xs">Ubah</span>
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-error-600 transition-colors hover:bg-error-50"
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
