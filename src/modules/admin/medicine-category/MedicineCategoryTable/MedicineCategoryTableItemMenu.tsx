import { FunctionComponent, useState } from "react";
import { UilTrashAlt, UilEye, UilEdit } from "@iconscout/react-unicons";
import { MedicineCategory } from "@/services/admin/medicine-category/interfaces/get-all-medicine-category.types";
import DeleteMedicineCategoryModal from "../MedicineCategoryModals/DeleteMedicineCategoryModal";
import DetailMedicineCategoryModal from "../MedicineCategoryModals/DetailMedicineCategoryModal";
import EditMedicineCategoryModal from "../MedicineCategoryModals/EditMedicineCategoryModal";

interface Props {
  medicine_category: MedicineCategory;
}

const MedicineCategoryTableItemMenu: FunctionComponent<Props> = ({
  medicine_category,
}) => {
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  return (
    <>
      {/* Modals */}
      <DetailMedicineCategoryModal
        id={medicine_category.id}
        medicine_category={medicine_category}
        onOpen={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
      />
      <DeleteMedicineCategoryModal
        id={medicine_category.id}
        name={medicine_category.name}
        onOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      />
      <EditMedicineCategoryModal
        medicine_category={medicine_category}
        onOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
      />

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-1 hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 rounded-md w-full p-1"
          onClick={() => setOpenDetailModal(true)}
        >
          {/* <UilEye size="20" color="#3b82f6" /> */}
          <UilEye size="15" />
          <span className="text-xs ">Detail</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1 hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 rounded-md w-full p-1"
          onClick={() => setOpenEditModal(true)}
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

export default MedicineCategoryTableItemMenu;
