import { FunctionComponent } from "react";
import Modal from "@/components/reusable/Modal";
import { Menu } from "@/services/admin/menu/interfaces/get-all-menu.types";

interface Props {
  id: string;
  menu: Menu;
  onOpen: boolean;
  onClose: () => void;
}

const DetailMedicineCategoryModal: FunctionComponent<Props> = ({
  id,
  menu,
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
              value={menu.name}
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
              value={menu.is_active ? "Active" : "Disabled"}
            />
          </div>

          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Klasifikasi Grup
            </label>
            <div>
              {menu.classifications?.map((classification, idx) => {
                return (
                  <button
                    key={idx}
                    className="border border-[#7e2e9d] text-[#7e2e9d] mr-2 mb-2  px-1.5 py-0.5 rounded hover:bg-[#7e2e9d] hover:text-white cursor-pointer transition-colors ease-in-out duration-300"
                  >
                    {classification.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Pertanyaan
            </label>
            <div>
              {menu.submenus?.map((submenu, idx) => {
                return (
                  <button
                    key={idx}
                    className="border border-[#7e2e9d] mr-2 mb-2 text-[#7e2e9d] px-1.5 py-0.5 rounded hover:bg-[#7e2e9d] hover:text-white cursor-pointer transition-colors ease-in-out duration-300"
                  >
                    <div
                      contentEditable="true"
                      dangerouslySetInnerHTML={{ __html: submenu.name }}
                    ></div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailMedicineCategoryModal;
