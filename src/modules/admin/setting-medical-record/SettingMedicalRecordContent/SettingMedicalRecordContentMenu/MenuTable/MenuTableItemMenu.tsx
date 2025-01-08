import { FunctionComponent, useState } from "react";
import { UilTrashAlt, UilEye, UilEdit } from "@iconscout/react-unicons";
import { Menu } from "@/services/admin/menu/interfaces/get-all-menu.types";
import DeleteMedicineModal from "../MenuModals/DeleteMenuModal";
import DetailMenuModal from "../MenuModals/DetailMenuModal";
import EditMedicineModal from "../MenuModals/EditMenuModal";

interface Props {
  menu: Menu;
}

const MedicineTableItemMenu: FunctionComponent<Props> = ({ menu }) => {
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  return (
    <>
      {/* Modals */}
      <DetailMenuModal
        id={menu.id}
        menu={menu}
        onOpen={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
      />
      <DeleteMedicineModal
        id={menu.id}
        name={menu.name}
        onOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      />
      <EditMedicineModal
        menu={menu}
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

export default MedicineTableItemMenu;
