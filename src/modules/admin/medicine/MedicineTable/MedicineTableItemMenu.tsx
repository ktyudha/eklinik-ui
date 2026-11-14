import { FunctionComponent, useState } from "react";
import { UilTrashAlt, UilEye, UilEdit } from "@iconscout/react-unicons";
import { Medicine } from "@/services/admin/medicine/interfaces/get-all-medicine.types";
import DeleteMedicineModal from "../MedicineModals/DeleteMedicineModal";
import DetailMedicineModal from "../MedicineModals/DetailMedicineModal";
import EditMedicineModal from "../MedicineModals/EditMedicineModal";

interface Props {
  medicine: Medicine;
}

const MedicineTableItemMenu: FunctionComponent<Props> = ({ medicine }) => {
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  return (
    <>
      {/* Modals */}
      <DetailMedicineModal
        id={medicine.id}
        medicine={medicine}
        onOpen={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
      />
      <DeleteMedicineModal
        id={medicine.id}
        name={medicine.name}
        onOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      />
      <EditMedicineModal
        medicine={medicine}
        onOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
      />

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-gray-600 transition-colors hover:bg-gray-100"
          onClick={() => setOpenDetailModal(true)}
        >
          {/* <UilEye size="20" color="#3b82f6" /> */}
          <UilEye size="15" />
          <span className="text-xs ">Detail</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-gray-600 transition-colors hover:bg-gray-100"
          onClick={() => setOpenEditModal(true)}
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

export default MedicineTableItemMenu;
