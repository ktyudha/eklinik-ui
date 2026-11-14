import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UilTrashAlt, UilEdit } from "@iconscout/react-unicons";
import { Queue } from "@/services/admin/queue/interfaces/get-all-queue.types";
import DeleteQueueModal from "../QueueModals/DeleteQueueModal";
// import DetailQueueModal from "../QueueModals/DetailQueueModal";

interface Props {
  appointment: Queue;
}

const QueueTableItemMenu: FunctionComponent<Props> = ({ appointment }) => {
  const navigate = useNavigate();
  // const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  return (
    <>
      {/* Modals */}
      {/* <DetailQueueModal
        id={appointment.id}
        queue={appointment}
        onOpen={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
      /> */}
      <DeleteQueueModal
        id={appointment.id}
        queue_number={appointment.queue_number}
        name={appointment.patient.name}
        onOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      />

      <div className="flex items-center justify-center gap-3">
        {/* <button
          type="button"
          className="flex items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-gray-600 transition-colors hover:bg-gray-100"
          onClick={() => setOpenDetailModal(true)}
        >
          <UilEye size="15" />
          <span className="text-xs ">Detail</span>
        </button> */}
        <button
          type="button"
          className="flex items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-gray-600 transition-colors hover:bg-gray-100"
          onClick={() => navigate("edit/" + appointment.id)}
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

export default QueueTableItemMenu;
