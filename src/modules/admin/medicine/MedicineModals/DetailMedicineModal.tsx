import { FunctionComponent } from "react";
import { format, differenceInDays } from "date-fns";
import { id as localeId } from "date-fns/locale";
import Modal from "@/components/reusable/Modal";
import { Medicine } from "@/services/admin/medicine/interfaces/get-all-medicine.types";

interface Props {
  id: string;
  medicine: Medicine;
  onOpen: boolean;
  onClose: () => void;
}

const DetailMedicineCategoryModal: FunctionComponent<Props> = ({
  id,
  medicine,
  onOpen,
  onClose,
}) => {
  const expiredDate = new Date(medicine.expired_date);
  const daysRemaining = differenceInDays(expiredDate, new Date());

  const formattedExpiredDate = medicine.expired_date
    ? format(expiredDate, "eeee, dd MMMM yyyy", {
        locale: localeId,
      }) + ` (${daysRemaining < 0 ? "Expired" : daysRemaining})`
    : "";

  return (
    <>
      <Modal
        onOpen={onOpen}
        title={"Detail Obat"}
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
              value={medicine.name}
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
              value={medicine.description}
            />
          </div>

          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Tanggal Kedaluwarsa
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={formattedExpiredDate}
            />
          </div>
          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Kategori
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={medicine.medicine_category.name}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="form-input">
              <label
                htmlFor={`patient-modal-detail-${id}`}
                className="flex gap-1 leading-4  mb-2"
              >
                Unit
              </label>
              <input
                type="text"
                id={`patient-modal-detail-${id}`}
                className="input input-bordered w-full capitalize"
                disabled
                value={medicine.unit}
              />
            </div>
            <div className="form-input">
              <label
                htmlFor={`patient-modal-detail-${id}`}
                className="flex gap-1 leading-4  mb-2"
              >
                Stok
              </label>
              <input
                type="text"
                id={`patient-modal-detail-${id}`}
                className="input input-bordered w-full"
                disabled
                value={medicine.stock}
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
                value={medicine.price}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailMedicineCategoryModal;
