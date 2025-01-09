import { FunctionComponent } from "react";
import Modal from "@/components/reusable/Modal";
import { Classification } from "@/services/admin/classification/interfaces/get-all-classification.types";

interface Props {
  id: string;
  classification: Classification;
  onOpen: boolean;
  onClose: () => void;
}

const DetailClassificationModal: FunctionComponent<Props> = ({
  id,
  classification,
  onOpen,
  onClose,
}) => {
  return (
    <>
      <Modal
        onOpen={onOpen}
        title={"Detail Klasifikasi"}
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
              value={classification.name}
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
              value={classification.description}
            />
          </div>

          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Harga (Rp)
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={classification.price}
            />
          </div>

          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Grup Pertanyaan
            </label>
            <div className="flex max-w-xs truncate gap-3">
              {classification.menus?.map((menu, idx) => {
                return (
                  <span
                    key={idx}
                    className="border border-[#7e2e9d] text-[#7e2e9d] px-2.5 py-2 rounded hover:bg-[#7e2e9d] hover:text-white cursor-pointer transition-colors ease-in-out duration-300"
                  >
                    {menu.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailClassificationModal;
