import { FunctionComponent } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "@/components/reusable/Modal";
import Input from "@/components/reusable/Form/Input";
import Select from "@/components/reusable/Form/Select";
import Spinner from "@/components/reusable/Spinner";
import useCreateSubMenu from "@/services/admin/menu/hooks/useCreateSubMenu";
import { ICreateOrUpdateSubMenuPayload } from "@/services/admin/menu/interfaces/create-or-update-sub-menu.types";
import {
  statusOptions,
  typeOptions,
} from "./create-or-update-sub-menu.constant";
import useGetAllMenu from "@/services/admin/menu/hooks/useGetAllMenu";
import useMapInputOptions from "@/hooks/useMapInputOptions";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = ICreateOrUpdateSubMenuPayload;

const CreateSubMenuCategoryModal: FunctionComponent<Props> = ({
  onOpen,
  onClose,
}) => {
  const { menus } = useGetAllMenu();
  const menuOptions = useMapInputOptions(menus);

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { createSubMenu } = useCreateSubMenu();
  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await createSubMenu({ ...state });
    if (error || response) {
      if (error) {
        toast.error("Gagal Menambahkan Pertanyaan", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Sukses Menambahkan Pertanyaan", {
          position: toast.POSITION.TOP_CENTER,
        });

        onClose();
        methods.reset();
      }
    }
  };

  if (!onOpen) return null;

  return (
    <Modal
      onOpen={onOpen}
      modalSize="md"
      title="Tambah Pertanyaan"
      onClose={onClose}
    >
      <FormProvider {...methods}>
        <form className="w-full" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex gap-5 mb-3">
            <div className="flex-1">
              <div className="flex flex-col gap-3 mb-3">
                <Input
                  label="Nama"
                  type="text"
                  placeholder="Nama"
                  name="name"
                  isRequired
                />
                <Select
                  label="Status"
                  name="is_active"
                  isRequired
                  selectOptions={statusOptions}
                />
                <Select
                  label="Tipe Form"
                  name="type"
                  isRequired
                  selectOptions={typeOptions}
                />
                <Select
                  label="Grup Pertanyaan"
                  name="menu_id"
                  isRequired
                  selectOptions={menuOptions}
                />
              </div>
            </div>
          </div>

          <div className="w-full mt-6 mb-3 flex gap-5 justify-center">
            <button
              type="button"
              className="w-full bg-gray-500 hover:bg-gray-600 rounded-lg py-2 font-medium text-base text-white"
              onClick={onClose}
            >
              Tutup
            </button>
            <button
              type="submit"
              className={`w-full rounded-lg py-2 font-medium text-base text-white ${
                !isValid || isSubmitting
                  ? "bg-[#9fe194] cursor-not-allowed focus:outline-none disabled:opacity-100"
                  : "bg-[#4bb43a] hover:bg-[#379029]"
              }`}
              disabled={!isValid || isSubmitting}
            >
              {!isSubmitting ? "Submit" : <Spinner />}
            </button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CreateSubMenuCategoryModal;
