import { FunctionComponent, useState } from "react";
import Modal from "@/components/reusable/Modal";
import useDeletePatient from "@/services/admin/patient/hooks/useDeletePatient";
import { toast } from "react-toastify";

interface Props {
  id: string;
  name: string;
  onOpen: boolean;
  onClose: () => void;
}

const DeleteMedicalRecordModal: FunctionComponent<Props> = ({
  id,
  name,
  onOpen,
  onClose,
}) => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const { deletePatient } = useDeletePatient();
  const onDelete = async () => {
    setIsSubmit(true);
    const { error, response } = await deletePatient(id);
    if (error || response) {
      if (error) {
        toast.error("Gagal Menghapus Rekam Medis", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Sukses Menghapus Rekam Medis", {
          position: toast.POSITION.TOP_CENTER,
        });

        onClose();
      }
    }
    setIsSubmit(false);
  };

  return (
    <Modal
      onOpen={onOpen}
      title="Hapus Rekam Medis"
      modalSize="sm"
      onClose={onClose}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="font-base w-[200px] text-center mr-4">
          Anda yakin menghapus Rekam Medis
          <span className="font-semibold capitalize"> {name}</span> ?
        </div>
      </div>

      <div className="w-full flex gap-5 justify-center">
        <button
          type="button"
          className="w-full bg-gray-500 hover:bg-gray-600 rounded-lg py-2 font-medium text-base text-white"
          onClick={onClose}
        >
          Tutup
        </button>
        <button
          type="submit"
          className={`w-full  rounded-lg py-2 font-medium text-base text-white ${
            isSubmit
              ? "bg-red-300 cursor-not-allowed focus:outline-none disabled:opacity-100"
              : "bg-red-500 hover:bg-red-600"
          }`}
          onClick={() => onDelete()}
          disabled={isSubmit}
        >
          Hapus
        </button>
      </div>
    </Modal>
  );
};

export default DeleteMedicalRecordModal;
