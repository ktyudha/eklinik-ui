import { FunctionComponent, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "@/components/reusable/Modal";
import Input from "@/components/reusable/Form/Input";
import Textarea from "@/components/reusable/Form/Textarea";
import Select from "@/components/reusable/Form/Select";
import Spinner from "@/components/reusable/Spinner";
// import {
//   religionOptions,
//   maritalStatusOptions,
//   genderOptions,
//   educationOptions,
//   jobOptions,
// } from "./create-or-update-patient.constant";\
import {
  RELIGION,
  MARITAL_STATUS,
  GENDER,
  EDUCATION,
  JOB,
} from "@/constant/utils";
import useCreatePatient from "@/services/admin/patient/hooks/useCreatePatient";
import { ICreatePatientPayload } from "@/services/admin/patient/interfaces/create-patient.types";
import useGetAllProvince from "@/services/global/region/province/hooks/useGetAllProvince";
import useGetProvince from "@/services/global/region/province/hooks/useGetProvince";
import useGetCity from "@/services/global/region/city/hooks/useGetCity";
import useMapInputOptions from "@/hooks/useMapInputOptions";
import useGetSubDistrict from "@/services/global/region/sub-district/hooks/useGetSubDistrict";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = ICreatePatientPayload;

const CreatePatientModal: FunctionComponent<Props> = ({ onOpen, onClose }) => {
  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { provinces } = useGetAllProvince();
  const { province } = useGetProvince(methods.getValues("province_id") || "");
  const { city } = useGetCity(methods.getValues("city_id") || "");
  const { sub_district } = useGetSubDistrict(
    methods.getValues("sub_district_id") || ""
  );

  const provinceOptions = useMapInputOptions(provinces);
  const cityOptions = useMapInputOptions(province?.cities);
  const subDistrictOptions = useMapInputOptions(city?.sub_districts);
  const villageOptions = useMapInputOptions(sub_district?.villages);

  useEffect(() => {
    methods.setValue("city_id", "");
    methods.setValue("sub_district_id", "");
    methods.setValue("village_id", "");
  }, [methods.getValues("province_id")]);

  useEffect(() => {
    methods.setValue("sub_district_id", "");
    methods.setValue("village_id", "");
  }, [methods.watch("city_id")]);

  useEffect(() => {
    methods.watch("province_id");
    methods.watch("city_id");
    methods.watch("sub_district_id");
    methods.watch("village_id");
  }, [methods]);

  const { createPatient } = useCreatePatient();
  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const payload = {
      ...state,
      username: typeof state.name === "string" ? state.name.split(" ")[0] : "",
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <Input
              label="Nama"
              type="text"
              placeholder="Nama Lengkap"
              name="name"
              isRequired
            />
            <Input
              label="NIK"
              type="text"
              placeholder="xxxxxxxxxxxxxxxx"
              name="nik"
              isRequired
            />

            {/* <Input
              label="Username"
              type="text"
              placeholder="Username"
              name="username"
              isRequired
            /> */}
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
              selectOptions={RELIGION}
            />

            <Select
              label="Jenis Kelamin"
              name="gender"
              isRequired
              selectOptions={GENDER}
            />
            <Select
              label="Pendidikan"
              name="education"
              isRequired
              selectOptions={EDUCATION}
            />
            <Select
              label="Pekerjaan"
              name="job"
              isRequired
              selectOptions={JOB}
            />

            <Select
              label="Status Perkawinan"
              name="marital_status"
              isRequired
              selectOptions={MARITAL_STATUS}
            />
          </div>
          <hr className="mt-6 mb-3" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
            <Select
              label="Provinsi"
              name="province_id"
              isRequired
              selectOptions={provinceOptions}
            />
            <Select
              label="Kabupaten/Kota"
              name="city_id"
              isRequired
              selectOptions={cityOptions}
            />

            <Select
              label="Kecamatan"
              name="sub_district_id"
              isRequired
              selectOptions={subDistrictOptions}
            />

            <Select
              label="Desa"
              name="village_id"
              isRequired
              selectOptions={villageOptions}
            />
            {/* <div className="flex flex-col">
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
            </div> */}

            {/* <div className="flex flex-col">
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

            <div className="flex flex-col">
              <label
                htmlFor={"village_id"}
                className="flex gap-1 font-normal text-md leading-4 text-[#1E293B] mb-2"
              >
                Desa <div className="text-red-500">*</div>
              </label>
              <select
                className={`flex gap-1 border-2 py-2 px-3 rounded-lg outline-none bg-white text-md font-normal`}
                required
                onChange={(e) => setSelectedVillage(e.target.value)}
              >
                <option value="" selected>
                  Pilih Desa
                </option>
                {villageOptions.map((village) => (
                  <option value={village.value}>{village.label}</option>
                ))}
              </select>
            </div> */}
          </div>
          <div className="grid grid-cols-2">
            <Textarea
              label="Alamat Tambahan"
              placeholder=""
              name="additional_address"
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

export default CreatePatientModal;
