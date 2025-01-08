import { FunctionComponent } from "react";
import Modal from "@/components/reusable/Modal";
import { SubMenu } from "@/services/admin/menu/interfaces/get-all-sub-menu.types";

interface Props {
  id: string;
  sub_menu: SubMenu;
  onOpen: boolean;
  onClose: () => void;
}

const DetailSubMenuModal: FunctionComponent<Props> = ({
  id,
  sub_menu,
  onOpen,
  onClose,
}) => {
  return (
    <>
      <Modal
        onOpen={onOpen}
        title={"Detail Pertanyaan"}
        modalSize="md"
        onClose={onClose}
      >
        <div className="form-input">
          <label
            htmlFor={`submenu-modal-detail-${id}`}
            className="flex gap-1 leading-4  mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id={`submenu-modal-detail-${id}`}
            className="input input-bordered w-full"
            disabled
            value={sub_menu.name}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-input">
            <label
              htmlFor={`submenu-modal-detail-${id}`}
              className="flex gap-1 leading-4 mb-2"
            >
              Status
            </label>
            <input
              type="text"
              id={`submenu-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={sub_menu.is_active ? "Active" : "Disabled"}
            />
          </div>
          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4 mb-2"
            >
              Tipe Form
            </label>
            <input
              type="text"
              id={`submenu-modal-detail-${id}`}
              className="input input-bordered w-full capitalize"
              disabled
              value={sub_menu.type}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailSubMenuModal;
