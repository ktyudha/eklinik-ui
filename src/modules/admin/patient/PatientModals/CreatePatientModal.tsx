import { FunctionComponent } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "@/components/reusable/Modal";
import Input from "@/components/reusable/Form/Input";
import Select from "@/components/reusable/Form/Select";
import Spinner from "@/components/reusable/Spinner";
import useCreatePatient from "@/services/admin/patient/hooks/useCreatePatient";
import { ICreatePatientPayload } from "@/services/admin/patient/interfaces/create-patient.types";
import PatientSelect from "./PatientSelect";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = ICreatePatientPayload;

const CreatePatientModal: FunctionComponent<Props> = ({ onOpen, onClose }) => {
  const religionOptions = [
    { label: "Islam", value: "islam" },
    { label: "Kristen", value: "kristen" },
    { label: "Katolik", value: "katolik" },
    { label: "Hindu", value: "hindu" },
    { label: "Budha", value: "budha" },
    { label: "Khonghucu", value: "khonghucu" },
  ];

  const maritalStatusOptions = [
    { label: "Belum Menikah", value: "belum menikah" },
    { label: "Menikah", value: "menikah" },
    { label: "Janda/Duda", value: "janda/duda" },
  ];

  const genderOptions = [
    { label: "Laki-laki", value: "laki-laki" },
    { label: "Perempuan", value: "perempuan" },
  ];

  const educationOptions = [
    { label: "TK/KB", value: "TK/KB" },
    { label: "SD/MI", value: "SD/MI" },
    { label: "SMP/MTS", value: "SMP/MTS" },
    { label: "SMA/SMK/MA/MAK", value: "SMA/SMK/MA/MAK" },
    { label: "D1/D2/D3", value: "D1/D2/D3" },
    { label: "D4/S1", value: "D4/S1" },
    { label: "S2", value: "S2" },
    { label: "S3", value: "S3" },
    { label: "--Lainnya--", value: "--Lainnya--" },
  ];

  const jobOptions = [
    { label: "Belum/Tidak Bekerja", value: "Belum/Tidak Bekerja" },
    { label: "Pelajar/Mahasiswa", value: "Pelajar/Mahasiswa" },
    { label: "PNS/POLRI/TNI", value: "PNS/POLRI/TNI" },
    { label: "Pensiunan", value: "Pensiunan" },
    { label: "Wirausaha", value: "Wirausaha" },
    { label: "Karyawan Swasta", value: "Karyawan Swasta" },
    { label: "--Lainnya--", value: "--Lainnya--" },
  ];

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { createPatient } = useCreatePatient();
  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await createPatient({
      ...state,
    });
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
      title="Tambah Pasien"
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
                  placeholder="Nama Lengkap"
                  name="name"
                  isRequired
                />
                <Input
                  label="Username"
                  type="text"
                  placeholder="Username"
                  name="username"
                  isRequired
                />
                <Input
                  label="Tempat Lahir"
                  type="text"
                  placeholder="Mojokerto"
                  name="birth_place"
                  isRequired
                />
                <Input
                  label="Tanggal Lahir"
                  type="text"
                  placeholder="Mojokerto"
                  name="birth_date"
                  isRequired
                />
                <Input
                  label="NIK"
                  type="text"
                  placeholder="xxxxxxxxxxxxxxxx"
                  name="birth_date"
                  isRequired
                />
                <Input
                  label="E-mail"
                  type="email"
                  placeholder="example@gmail.com"
                  name="email"
                  isRequired
                />
                <Input
                  label="Nomor HP"
                  type="text"
                  placeholder="628xxxxxxxx"
                  name="phone_number"
                  isRequired
                />
                <Select
                  label="Agama"
                  name="religion"
                  isRequired
                  selectOptions={religionOptions}
                  defaultValue={"islam"} // Nilai default yang dipilih
                />

                <Select
                  label="Jenis Kelamin"
                  name="gender"
                  isRequired
                  selectOptions={genderOptions}
                />

                <Select
                  label="Status Perkawinan"
                  name="marital_status"
                  isRequired
                  selectOptions={maritalStatusOptions}
                />

                <Select
                  label="Pendidikan"
                  name="education"
                  isRequired
                  selectOptions={educationOptions}
                />
                <Select
                  label="Pekerjaan"
                  name="job"
                  isRequired
                  selectOptions={jobOptions}
                />
                <PatientSelect />
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

export default CreatePatientModal;
