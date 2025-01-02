import { FunctionComponent, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "@/components/reusable/Modal";
import Input from "@/components/reusable/Form/Input";
import Select from "@/components/reusable/Form/Select";
import SelectTwo from "@/components/reusable/Form/SelectTwo";
import Spinner from "@/components/reusable/Spinner";
import useCreatePatient from "@/services/admin/patient/hooks/useCreatePatient";
import { ICreatePatientPayload } from "@/services/admin/patient/interfaces/create-patient.types";
import useGetAllProvince from "@/services/global/region/province/hooks/useGetAllProvince";
import useGetProvince from "@/services/global/region/province/hooks/useGetProvince";
import useGetCity from "@/services/global/region/city/hooks/useGetCity";
import useGetAllSubDistrict from "@/services/global/region/sub-district/hooks/useGetAllSubDistrict";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}
export interface OptionValue {
  label: string;
  value: string;
}
type FormFields = ICreatePatientPayload;

const CreatePatientModal: FunctionComponent<Props> = ({ onOpen, onClose }) => {
  const religionOptions = [
    { label: "Islam", value: "Islam" },
    { label: "Kristen", value: "kristen" },
    { label: "Katolik", value: "katolik" },
    { label: "Hindu", value: "hindu" },
    { label: "Budha", value: "budha" },
    { label: "Khonghucu", value: "khonghucu" },
  ];

  const maritalStatusOptions = [
    { label: "Belum Menikah", value: "single" },
    { label: "Menikah", value: "menikah" },
    { label: "Janda/Duda", value: "janda/duda" },
  ];

  const genderOptions = [
    { label: "Laki-laki", value: "L" },
    { label: "Perempuan", value: "P" },
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

  // const [selectedProvince, setSelectedProvince] = useState<OptionValue | null>(
  //   null
  // );
  // const [selectedCity, setSelectedCity] = useState<OptionValue | null>(null);
  // const [selectSubDistrict, setSelectedSubDistrict] =
  //   useState<OptionValue | null>(null);

  // const { provinces } = useGetAllProvince();
  // const { province } = useGetProvince(selectedProvince?.value || "");
  // const { city } = useGetCity(selectedCity?.value || "");
  // console.log(city);

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
          <Input
            label="Nama"
            type="text"
            placeholder="Nama Lengkap"
            name="name"
            isRequired
          />
          <div className="grid grid-cols-4 gap-4 mt-4">
            <Input
              label="NIK"
              type="text"
              placeholder="xxxxxxxxxxxxxxxx"
              name="nik"
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
          </div>
          <hr className="mt-6 mb-3" />
          <div className="grid grid-cols-4 gap-4 mt-4">
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
            />

            <Select
              label="Jenis Kelamin"
              name="gender"
              isRequired
              selectOptions={genderOptions}
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

            <Select
              label="Status Perkawinan"
              name="marital_status"
              isRequired
              selectOptions={maritalStatusOptions}
            />
          </div>
          <hr className="mt-6 mb-3" />
          <div className="grid grid-cols-4 gap-4 mt-4">
            <Input
              label="Provinsi"
              type="text"
              placeholder="628xxxxxxxx"
              name="province_id"
              defaultValue={"050000"}
              isRequired
            />
            <Input
              label="Kabupaten/Kota"
              type="text"
              placeholder="628xxxxxxxx"
              name="city_id"
              defaultValue={"050200"}
              isRequired
            />
            <Input
              label="Kecamatan"
              type="text"
              placeholder="628xxxxxxxx"
              name="sub_district_id"
              defaultValue={"050203"}
              isRequired
            />
            <Input
              label="Desa"
              type="text"
              placeholder="628xxxxxxxx"
              name="village"
              defaultValue={"Kandangan"}
              isRequired
            />

            {/* <SelectTwo
                  label="Provinsi"
                  name="province_id"
                  selectOptions={provinces}
                  isRequired
                  isSearchable
                  isClearable
                  value={selectedProvince}
                  onChange={(value) => {
                    setSelectedProvince(value); // Update provinsi
                    setSelectedCity(null); // Reset city ketika provinsi berubah
                    setSelectedSubDistrict(null); // Update provinsi
                    console.log(value);
                  }}
                />
                <SelectTwo
                  label="Kabupaten/Kota"
                  name="city_id"
                  selectOptions={province?.cities}
                  isRequired
                  isSearchable
                  isClearable
                  value={selectedCity}
                  onChange={(value) => {
                    setSelectedCity(value); // Update provinsi
                    setSelectedSubDistrict(null);
                    console.log(value);
                  }}
                />
                <SelectTwo
                  label="Kecamatan"
                  name="sub_district_id"
                  selectOptions={city?.sub_districts}
                  value={selectSubDistrict}
                  isRequired
                  isSearchable
                  isClearable
                  onChange={(value) => {
                    setSelectedSubDistrict(value); // Update provinsi
                    console.log(value);
                  }}
                /> */}
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

export default CreatePatientModal;
