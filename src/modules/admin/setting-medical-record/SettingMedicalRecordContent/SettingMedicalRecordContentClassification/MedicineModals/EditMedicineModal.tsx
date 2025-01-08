import { FunctionComponent } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "@/components/reusable/Modal";
import Input from "@/components/reusable/Form/Input";
import Textarea from "@/components/reusable/Form/Textarea";
import Select from "@/components/reusable/Form/Select";
import Spinner from "@/components/reusable/Spinner";
import useUpdateMedicine from "@/services/admin/medicine/hooks/useUpdateMedicine";
import { Medicine } from "@/services/admin/medicine/interfaces/get-all-medicine.types";
import { ICreateOrUpdateMedicinePayload } from "@/services/admin/medicine/interfaces/create-or-update-medicine.types";
import useMapInputOptions from "@/hooks/useMapInputOptions";
import useGetAllMedicineCategory from "@/services/admin/medicine-category/hooks/useGetAllMedicineCategory";
import { unitOptions } from "./create-or-update-medicine.constant";

interface Props {
  medicine: Medicine;
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = ICreateOrUpdateMedicinePayload;

const EditMedicineCategoryModal: FunctionComponent<Props> = ({
  medicine,
  onOpen,
  onClose,
}) => {
  const { medicine_categories } = useGetAllMedicineCategory();
  const medicineCategoryOptions = useMapInputOptions(medicine_categories);

  const formatExpiredDate = medicine.expired_date
    ? new Date(medicine.expired_date).toISOString().split("T")[0]
    : "";

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { updateMedicine } = useUpdateMedicine(medicine.id);

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await updateMedicine({ ...state });
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
    <Modal onOpen={onOpen} modalSize="md" title="Edit Obat" onClose={onClose}>
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
                  defaultValue={medicine.name}
                  isRequired
                />
                <Textarea
                  label="Deskripsi"
                  placeholder="Deskripsi"
                  name="description"
                  defaultValue={medicine.description}
                  isRequired
                />
                <Input
                  label="Tanggal Kedaluwarsa"
                  type="date"
                  placeholder="Tanggal Kedaluwarsa"
                  name="expired_date"
                  defaultValue={formatExpiredDate}
                  isRequired
                />

                <Select
                  label="Kategori"
                  name="medicine_category_id"
                  isRequired
                  defaultValue={medicine.medicine_category.id}
                  selectOptions={medicineCategoryOptions}
                />

                <div className="grid grid-cols-3 gap-4">
                  <Select
                    label="Unit"
                    name="unit"
                    isRequired
                    selectOptions={unitOptions}
                    defaultValue={medicine.unit}
                  />

                  <Input
                    label="Jumlah Stok"
                    type="number"
                    placeholder="Jumlah Stok"
                    name="stock"
                    defaultValue={medicine.stock}
                    isRequired
                  />

                  <Input
                    label="Harga (ex:10000)"
                    type="number"
                    placeholder="Harga"
                    name="price"
                    defaultValue={medicine.price}
                    isRequired
                  />
                </div>
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

export default EditMedicineCategoryModal;
