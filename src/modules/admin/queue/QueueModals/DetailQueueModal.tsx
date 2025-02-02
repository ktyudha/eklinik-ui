import { FunctionComponent } from "react";
import Modal from "@/components/reusable/Modal";
import { Queue } from "@/services/admin/queue/interfaces/get-all-queue.types";

interface Props {
  id: string;
  queue: Queue;
  onOpen: boolean;
  onClose: () => void;
}

const DetailQueueModal: FunctionComponent<Props> = ({
  id,
  queue,
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
              htmlFor={`queue-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Antrian
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={queue.queue_number}
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
              value={queue.description}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailQueueModal;
