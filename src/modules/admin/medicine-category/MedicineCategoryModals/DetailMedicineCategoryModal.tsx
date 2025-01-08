import { FunctionComponent } from "react";
import Modal from "@/components/reusable/Modal";
import { MedicineCategory } from "@/services/admin/medicine-category/interfaces/get-all-medicine-category.types";

interface Props {
  id: string;
  medicine_category: MedicineCategory;
  onOpen: boolean;
  onClose: () => void;
}

const DetailMedicineCategoryModal: FunctionComponent<Props> = ({
  id,
  medicine_category,
  onOpen,
  onClose,
}) => {
  return (
    <>
      <Modal
        onOpen={onOpen}
        title={"Detail Kategori Obat"}
        modalSize="md"
        onClose={onClose}
      >
        <div className="grid grid-cols-1 gap-4">
          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={medicine_category.name}
            />
          </div>

          {/* Userame */}
          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Description
            </label>
            <textarea
              id={`patient-modal-detail-${id}`}
              className="textarea textarea-bordered w-full capitalize"
              disabled
              rows={3.5}
              value={medicine_category.description}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailMedicineCategoryModal;
