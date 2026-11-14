import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UilTrashAlt, UilEdit } from "@iconscout/react-unicons";
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
  const navigate = useNavigate();

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
        {/* <button
          type="button"
          className="flex items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-gray-600 transition-colors hover:bg-gray-100"
          onClick={() => setOpenDetailModal(true)}
        >
          <UilEye size="20" color="#3b82f6" />
          <UilEye size="15" />
          <span className="text-xs ">Detail</span>
        </button> */}
        <button
          type="button"
          className="flex items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-gray-600 transition-colors hover:bg-gray-100"
          onClick={() => navigate(`edit/${medical.id}`)}
        >
          {/* <UilEdit size="20" color="#eab308" /> */}
          <UilEdit size="15" />
          <span className="text-xs">Ubah</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-error-600 transition-colors hover:bg-error-50"
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
