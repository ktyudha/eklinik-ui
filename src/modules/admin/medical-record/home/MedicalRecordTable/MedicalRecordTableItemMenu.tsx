import { FunctionComponent, useState } from "react";
import { UilTrashAlt, UilEye, UilEdit } from "@iconscout/react-unicons";
import { Medical } from "@/services/admin/medical/interfaces/get-all-medical.types";
import DeleteMedicalReocordModal from "../MedicalRecordModals/DeleteMedicalRecordModal";
// import DetailPatientModal from "../PatientModals/DetailPatientModal";
// import EditPatientModal from "../PatientModals/EditPatientModal";

interface Props {
  medical: Medical;
}

const MedicalRecordTableItemMenu: FunctionComponent<Props> = ({ medical }) => {
  // const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  // const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  return (
    <>
      {/* Modals */}
      {/* <DetailPatientModal
        id={medical.id}
        patient={medical}
        onOpen={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
      /> */}
      <DeleteMedicalReocordModal
        id={medical.id}
        name={medical.patient.name}
        onOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      />
      {/* <EditPatientModal
        patient={medical}
        onOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
      /> */}

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-1 hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 rounded-md w-full p-1"
          // onClick={() => setOpenDetailModal(true)}
        >
          {/* <UilEye size="20" color="#3b82f6" /> */}
          <UilEye size="15" />
          <span className="text-xs ">Detail</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1 hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 rounded-md w-full p-1"
          // onClick={() => setOpenEditModal(true)}
        >
          {/* <UilEdit size="20" color="#eab308" /> */}
          <UilEdit size="15" />
          <span className="text-xs">Ubah</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1 hover:bg-red-400 hover:text-white border border-red-400 text-red-400 rounded-md w-full p-1"
          onClick={() => setOpenDeleteModal(true)}
        >
          {/* <UilTrashAlt size="20" color="#ef4444" /> */}
          <UilTrashAlt size="15" />
          <span className="text-xs">Hapus</span>
        </button>
      </div>
    </>
  );
};

export default MedicalRecordTableItemMenu;
