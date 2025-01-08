import { FunctionComponent, useState, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "@/components/reusable/Modal";
import Input from "@/components/reusable/Form/Input";
import Select from "@/components/reusable/Form/Select";
import Spinner from "@/components/reusable/Spinner";
import {
  religionOptions,
  maritalStatusOptions,
  genderOptions,
  educationOptions,
  jobOptions,
} from "./create-or-update-patient.constant";
import useCreatePatient from "@/services/admin/patient/hooks/useCreatePatient";
import { ICreatePatientPayload } from "@/services/admin/patient/interfaces/create-patient.types";
import useGetAllProvince from "@/services/global/region/province/hooks/useGetAllProvince";
import useGetProvince from "@/services/global/region/province/hooks/useGetProvince";
import useGetCity from "@/services/global/region/city/hooks/useGetCity";
import useMapInputOptions from "@/hooks/useMapInputOptions";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = ICreatePatientPayload;

const CreatePatientModal: FunctionComponent<Props> = ({ onOpen, onClose }) => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState("");

  const { provinces } = useGetAllProvince();
  const { province } = useGetProvince(selectedProvince || "");
  const { city } = useGetCity(selectedCity || "");

  const provinceOptions = useMapInputOptions(provinces);
  const cityOptions = useMapInputOptions(province?.cities);
  const subDistrictOptions = useMapInputOptions(city?.sub_districts);

  useEffect(() => {
    setSelectedCity("");
    setSelectedSubDistrict("");
  }, [selectedProvince]);

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { createPatient } = useCreatePatient();
  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const payload = {
      ...state,
      province_id: selectedProvince,
      city_id: selectedCity,
      sub_district_id: selectedSubDistrict,
    };

    const { error, response } = await createPatient(payload);
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
      modalSize="lg"
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
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
              type="date"
              placeholder="Mojokerto"
              name="birth_date"
              isRequired
            />
          </div>
          <hr className="mt-6 mb-3" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="flex flex-col">
              <label
                htmlFor={"province_id"}
                className="flex gap-1 font-normal text-md leading-4 text-[#1E293B] mb-2"
              >
                Provinsi <div className="text-red-500">*</div>
              </label>
              <select
                className={`flex gap-1 border-2 py-2 px-3 rounded-lg outline-none bg-white text-md font-normal`}
                required
                onChange={(e) => setSelectedProvince(e.target.value)}
              >
                <option value="" selected>
                  Pilih Provinsi
                </option>
                {provinceOptions.map((province) => (
                  <option value={province.value}>{province.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor={"city_id"}
                className="flex gap-1 font-normal text-md leading-4 text-[#1E293B] mb-2"
              >
                Kabupaten/Kota <div className="text-red-500">*</div>
              </label>
              <select
                className={`flex gap-1 border-2 py-2 px-3 rounded-lg outline-none bg-white text-md font-normal`}
                required
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="" selected>
                  Pilih Kabupaten/Kota
                </option>
                {cityOptions.map((city) => (
                  <option value={city.value}>{city.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor={"city_id"}
                className="flex gap-1 font-normal text-md leading-4 text-[#1E293B] mb-2"
              >
                Kecamatan <div className="text-red-500">*</div>
              </label>
              <select
                className={`flex gap-1 border-2 py-2 px-3 rounded-lg outline-none bg-white text-md font-normal`}
                required
                onChange={(e) => setSelectedSubDistrict(e.target.value)}
              >
                <option value="" selected>
                  Pilih Kecamatan
                </option>
                {subDistrictOptions.map((sub_district) => (
                  <option value={sub_district.value}>
                    {sub_district.label}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Desa"
              type="text"
              placeholder="Nama Desa"
              name="village"
              isRequired
            />
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

export default CreatePatientModal;
