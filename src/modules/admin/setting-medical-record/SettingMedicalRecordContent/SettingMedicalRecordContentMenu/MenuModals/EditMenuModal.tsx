import { FunctionComponent } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "@/components/reusable/Modal";
import Input from "@/components/reusable/Form/Input";
import Select from "@/components/reusable/Form/Select";
import Spinner from "@/components/reusable/Spinner";
import useUpdateMenu from "@/services/admin/menu/hooks/useUpdateMenu";
import { Menu } from "@/services/admin/menu/interfaces/get-all-menu.types";
import { ICreateOrUpdateMenuPayload } from "@/services/admin/menu/interfaces/create-or-update-menu.types";
import { statusOptions } from "./create-or-update-menu.constant";

interface Props {
  menu: Menu;
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = ICreateOrUpdateMenuPayload;

const EditMedicineCategoryModal: FunctionComponent<Props> = ({
  menu,
  onOpen,
  onClose,
}) => {
  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { updateMenu } = useUpdateMenu(menu.id);

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await updateMenu({ ...state });
    if (error || response) {
      if (error) {
        toast.error("Gagal Memperbarui Grup Pertanyaan", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Sukses Memperbarui Grup Pertanyaan", {
          position: toast.POSITION.TOP_CENTER,
        });

        onClose();
      }
    }
  };

  if (!onOpen) return null;

  return (
    <Modal
      onOpen={onOpen}
      modalSize="md"
      title="Edit Grup Pertanyaan"
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
                  defaultValue={menu.name}
                  isRequired
                />
                <Select
                  label="Status"
                  name="is_active"
                  isRequired
                  defaultValue={menu.is_active}
                  selectOptions={statusOptions}
                />
              </div>
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

export default EditMedicineCategoryModal;
