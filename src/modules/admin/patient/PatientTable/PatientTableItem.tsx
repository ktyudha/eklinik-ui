import { FunctionComponent } from "react";
import { Patient } from "@/services/admin/patient/interfaces/get-all-patient.types";
import PatientTableItemMenu from "./PatientTableItemMenu";

interface Props {
  number: number;
  patient: Patient;
}

const PatientTableItem: FunctionComponent<Props> = ({ number, patient }) => {
  return (
    <tr>
      <td className="mx-auto text-center">{number}</td>
      <td className="px-6">{patient.medical_record_number}</td>
      <td className="px-6 uppercase">{patient.name}</td>
      <td className="px-6">{patient.nik}</td>
      <td className="px-6 text-center">{patient.gender}</td>
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
        <PatientTableItemMenu patient={patient} />
      </td>
    </tr>
  );
};

export default PatientTableItem;
