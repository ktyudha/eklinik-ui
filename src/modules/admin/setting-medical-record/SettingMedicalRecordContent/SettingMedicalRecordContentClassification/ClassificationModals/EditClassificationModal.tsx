import { FunctionComponent } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "@/components/reusable/Modal";
import Input from "@/components/reusable/Form/Input";
import Textarea from "@/components/reusable/Form/Textarea";
import Select from "@/components/reusable/Form/Select";
import Spinner from "@/components/reusable/Spinner";
import useUpdateClassification from "@/services/admin/classification/hooks/useUpdateClassification";
import { Classification } from "@/services/admin/classification/interfaces/get-all-classification.types";
import { ICreateOrUpdateClassificationPayload } from "@/services/admin/classification/interfaces/create-or-update-classification.types";
import useMapInputOptions from "@/hooks/useMapInputOptions";
import useGetAllMenu from "@/services/admin/menu/hooks/useGetAllMenu";

interface Props {
  classification: Classification;
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = ICreateOrUpdateClassificationPayload;

const EditMedicineCategoryModal: FunctionComponent<Props> = ({
  classification,
  onOpen,
  onClose,
}) => {
  const { menus } = useGetAllMenu();
  const menuOptions = useMapInputOptions(menus);

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { updateClassification } = useUpdateClassification(classification.id);

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await updateClassification({ ...state });
    if (error || response) {
      if (error) {
        toast.error("Gagal Memperbarui Klasifikasi", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Sukses Memperbarui Klasifikasi", {
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
      title="Edit Klasifikasi"
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
                  defaultValue={classification.name}
                  isRequired
                />
                <Textarea
                  label="Deskripsi"
                  placeholder="Deskripsi"
                  name="description"
                  defaultValue={classification.description}
                  isRequired
                />

                <Input
                  label="Harga (ex:10000)"
                  type="number"
                  placeholder="Harga"
                  name="price"
                  defaultValue={classification.price}
                  isRequired
                />

                <Select
                  label="Grup Pertanyaan"
                  name="menu"
                  isRequired
                  defaultValue={classification.menus}
                  selectOptions={menuOptions}
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
