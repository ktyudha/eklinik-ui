import { FunctionComponent } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "@/components/reusable/Modal";
import Input from "@/components/reusable/Form/Input";
import Textarea from "@/components/reusable/Form/Textarea";
import Spinner from "@/components/reusable/Spinner";
import useUpdateMedicineCategory from "@/services/admin/medicine-category/hooks/useUpdateMedicineCategory";
import { MedicineCategory } from "@/services/admin/medicine-category/interfaces/get-all-medicine-category.types";
import { ICreateOrUpdateMedicineCategoryPayload } from "@/services/admin/medicine-category/interfaces/create-or-update-medicine-category.types";

interface Props {
  medicine_category: MedicineCategory;
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = ICreateOrUpdateMedicineCategoryPayload;

const EditMedicineCategoryModal: FunctionComponent<Props> = ({
  medicine_category,
  onOpen,
  onClose,
}) => {
  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { updateMedicineCategory } = useUpdateMedicineCategory(
    medicine_category.id
  );

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await updateMedicineCategory({ ...state });
    if (error || response) {
      if (error) {
        toast.error("Gagal Memperbarui Kategori Obat", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Sukses Memperbarui Kategori Obat", {
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
      title="Edit Kategori Obat"
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
                  defaultValue={medicine_category.name}
                  isRequired
                />
                <Textarea
                  label="Deskripsi"
                  placeholder="Deskripsi"
                  name="description"
                  defaultValue={medicine_category.description}
                  isRequired
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
