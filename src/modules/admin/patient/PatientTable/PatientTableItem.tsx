import { FunctionComponent } from "react";
// import { useNavigate } from "react-router-dom";
import { UilEye, UilPen, UilTrashAlt } from "@iconscout/react-unicons";
import { Patients } from "@/services/admin/patient/interfaces/get-all-patient.types";

interface Props {
  number: number;
  patient: Patients;
}

const PatientTableItem: FunctionComponent<Props> = ({ number, patient }) => {
  return (
    <tr>
      <td className="mx-auto text-center">{number}</td>
      <td className="px-6">{patient.no_medical_record}</td>
      <td className="px-6">{patient.name}</td>
      <td className="px-6">{patient.nik}</td>
      <td className="px-6">{patient.gender}</td>
      <td className="px-6">{patient.education}</td>
      <td className="px-6">{patient.job}</td>
      <td className="px-6">{patient.address}</td>
      <td className="flex flex-row gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-1 hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 rounded-md w-full p-1"
        >
          <UilEye size="15" />
          <span className="text-xs ">Detail</span>
        </button>

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
        </button>
      </td>
    </tr>
  );
};

export default PatientTableItem;
