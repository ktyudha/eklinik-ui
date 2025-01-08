import { FunctionComponent } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "@/components/reusable/Modal";
import Input from "@/components/reusable/Form/Input";
import Textarea from "@/components/reusable/Form/Textarea";
import Spinner from "@/components/reusable/Spinner";

import useCreateMedicineCategory from "@/services/admin/medicine-category/hooks/useCreateMedicineCategory";
import { ICreateOrUpdateMedicineCategoryPayload } from "@/services/admin/medicine-category/interfaces/create-or-update-medicine-category.types";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = ICreateOrUpdateMedicineCategoryPayload;

const CreateMedicineCategoryModal: FunctionComponent<Props> = ({
  onOpen,
  onClose,
}) => {
  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { createMedicineCategory } = useCreateMedicineCategory();
  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await createMedicineCategory({ ...state });
    if (error || response) {
      if (error) {
        toast.error("Gagal Menambahkan Pasien", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Sukses Menambahkan Pasien", {
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
      title="Tambah Kategori Obat"
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
                <Textarea
                  label="Deskripsi"
                  placeholder="Deskripsi"
                  name="description"
                  isRequired
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
                  ? "bg-[#f9d1e8] cursor-not-allowed focus:outline-none disabled:opacity-100"
                  : "bg-[#f28ec2] hover:bg-[#e64e99]"
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

export default CreateMedicineCategoryModal;
