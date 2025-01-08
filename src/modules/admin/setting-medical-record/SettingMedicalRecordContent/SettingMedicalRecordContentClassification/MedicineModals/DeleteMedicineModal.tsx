import { FunctionComponent, useState } from "react";
import Modal from "@/components/reusable/Modal";
import useDeleteMedicine from "@/services/admin/medicine/hooks/useDeleteMedicine";
import { toast } from "react-toastify";

interface Props {
  id: string;
  name: string;
  onOpen: boolean;
  onClose: () => void;
}

const DeleteMedicineModal: FunctionComponent<Props> = ({
  id,
  name,
  onOpen,
  onClose,
}) => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const { deleteMedicine } = useDeleteMedicine();
  const onDelete = async () => {
    setIsSubmit(true);
    const { error, response } = await deleteMedicine(id);
    if (error || response) {
      if (error) {
        toast.error("Gagal Menghapus Obat", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Sukses Menghapus Obat", {
          position: toast.POSITION.TOP_CENTER,
        });

        onClose();
      }
    }
    setIsSubmit(false);
  };

  return (
    <Modal onOpen={onOpen} title="Hapus Obat" modalSize="sm" onClose={onClose}>
      <div className="flex flex-col items-center gap-3">
        <div className="font-base w-[200px] text-center mr-4">
          Anda yakin menghapus Obat
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

export default DeleteMedicineModal;
