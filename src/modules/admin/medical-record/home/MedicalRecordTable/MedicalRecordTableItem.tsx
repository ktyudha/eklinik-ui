import { FunctionComponent } from "react";
import { Medical } from "@/services/admin/medical/interfaces/get-all-medical.types";
// import PatientTableItemMenu from "./MedicalRecordTableItemMenu";

interface Props {
  number: number;
  medical: Medical;
}

const MedicalRecordTableItem: FunctionComponent<Props> = ({
  number,
  medical,
}) => {
  return (
    <tr>
      <td className="mx-auto text-center">{number}</td>
      <td className="px-6">{medical.patient.medical_record_number}</td>
      <td className="px-6 uppercase">{medical.patient.name}</td>
      <td className="px-6">{medical.checkup_date}</td>
      <td className="px-6 text-center">{medical.classification_id}</td>
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
        {/* <PatientTableItemMenu patient={patient} /> */}
      </td>
    </tr>
  );
};

export default MedicalRecordTableItem;
