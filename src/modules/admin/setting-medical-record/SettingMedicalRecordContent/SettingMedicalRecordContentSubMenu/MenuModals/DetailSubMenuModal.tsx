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
        title={"Detail Grup Pertanyaan"}
        modalSize="md"
        onClose={onClose}
      >
        <div className="grid grid-cols-2 gap-4">
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
              value={sub_menu.name}
            />
          </div>

          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4 mb-2"
            >
              Status
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={sub_menu.is_active ? "Active" : "Disabled"}
            />
          </div>

          {/* <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Klasifikasi Grup
            </label>
            <div className="flex max-w-xs truncate gap-3">
              {menu.classifications?.map((classification, idx) => {
                return (
                  <span
                    key={idx}
                    className="border border-[#7e2e9d] text-[#7e2e9d] px-1.5 py-0.5 rounded hover:bg-[#7e2e9d] hover:text-white cursor-pointer transition-colors ease-in-out duration-300"
                  >
                    {classification.name}
                  </span>
                );
              })}
            </div>
          </div> */}

          {/* <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Pertanyaan
            </label>
            <div className="flex max-w-xs truncate gap-3">
              {menu.submenus?.map((submenu, idx) => {
                return (
                  <span
                    key={idx}
                    className="border border-[#7e2e9d] text-[#7e2e9d] px-1.5 py-0.5 rounded hover:bg-[#7e2e9d] hover:text-white cursor-pointer transition-colors ease-in-out duration-300"
                  >
                    {submenu.name}
                  </span>
                );
              })}
            </div>
          </div> */}
        </div>
      </Modal>
    </>
  );
};

export default DetailSubMenuModal;
