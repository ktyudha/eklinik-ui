import { FunctionComponent } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "@/components/reusable/Modal";
import Input from "@/components/reusable/Form/Input";
import Textarea from "@/components/reusable/Form/Textarea";
import Select from "@/components/reusable/Form/Select";
import Spinner from "@/components/reusable/Spinner";
import useMapInputOptions from "@/hooks/useMapInputOptions";
import useCreateMedicine from "@/services/admin/medicine/hooks/useCreateMedicine";
import useGetAllMedicineCategory from "@/services/admin/medicine-category/hooks/useGetAllMedicineCategory";
import { ICreateOrUpdateMedicinePayload } from "@/services/admin/medicine/interfaces/create-or-update-medicine.types";
import { unitOptions } from "./create-or-update-medicine.constant";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = ICreateOrUpdateMedicinePayload;

const CreateMedicineCategoryModal: FunctionComponent<Props> = ({
  onOpen,
  onClose,
}) => {
  const { medicine_categories } = useGetAllMedicineCategory();
  const medicineCategoryOptions = useMapInputOptions(medicine_categories);

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { createMedicine } = useCreateMedicine();
  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await createMedicine({ ...state });
    if (error || response) {
      if (error) {
        toast.error("Gagal Menambahkan Obat", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Sukses Menambahkan Obat", {
          position: toast.POSITION.TOP_CENTER,
        });

        onClose();
        methods.reset();
      }
    }
  };

  if (!onOpen) return null;

  return (
    <Modal onOpen={onOpen} modalSize="md" title="Tambah Obat" onClose={onClose}>
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
                <Input
                  label="Tanggal Kedaluwarsa"
                  type="date"
                  placeholder="Tanggal Kedaluwarsa"
                  name="expired_date"
                  isRequired
                />

                <Select
                  label="Kategori"
                  name="medicine_category_id"
                  isRequired
                  selectOptions={medicineCategoryOptions}
                />

                <div className="grid grid-cols-3 gap-4">
                  <Select
                    label="Unit"
                    name="unit"
                    isRequired
                    selectOptions={unitOptions}
                  />

                  <Input
                    label="Jumlah Stok"
                    type="number"
                    placeholder="Jumlah Stok"
                    name="stock"
                    isRequired
                  />

                  <Input
                    label="Harga (ex:10000)"
                    type="number"
                    placeholder="Harga"
                    name="price"
                    isRequired
                  />
                </div>
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
                  ? "bg-blue-300 cursor-not-allowed focus:outline-none disabled:opacity-100"
                  : "bg-blue-500 hover:bg-blue-600"
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
