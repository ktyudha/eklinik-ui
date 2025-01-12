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
        <PatientTableItemMenu patient={patient} />
      </td>
    </tr>
  );
};

export default PatientTableItem;
