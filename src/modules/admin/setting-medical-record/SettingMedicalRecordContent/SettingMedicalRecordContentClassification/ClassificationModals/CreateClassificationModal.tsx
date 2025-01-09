import { FunctionComponent } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "@/components/reusable/Modal";
import Input from "@/components/reusable/Form/Input";
import Textarea from "@/components/reusable/Form/Textarea";
import SelectTwo from "@/components/reusable/Form/SelectTwo";
import Spinner from "@/components/reusable/Spinner";
import useMapInputOptions from "@/hooks/useMapInputOptions";
import useCreateClassification from "@/services/admin/classification/hooks/useCreateClassification";
import useGetAllMenu from "@/services/admin/menu/hooks/useGetAllMenu";
import { ICreateOrUpdateClassificationPayload } from "@/services/admin/classification/interfaces/create-or-update-classification.types";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = ICreateOrUpdateClassificationPayload;

const CreateClassificationModal: FunctionComponent<Props> = ({
  onOpen,
  onClose,
}) => {
  const { menus } = useGetAllMenu();
  const menuOptions = useMapInputOptions(menus);

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { createClassification } = useCreateClassification();
  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await createClassification({ ...state });
    if (error || response) {
      if (error) {
        console.log(error);
        toast.error("Gagal Menambahkan Klasifikasi", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Sukses Menambahkan Klasifikasi", {
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
      title="Tambah Klasifikasi"
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

                <Input
                  label="Harga (ex:10000)"
                  type="number"
                  placeholder="Harga"
                  name="price"
                  isRequired
                />

                <SelectTwo
                  label="Kategori"
                  name="menu"
                  isSearchable
                  isRequired
                  isMulti
                  selectTwoOptions={menuOptions}
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

export default CreateClassificationModal;
