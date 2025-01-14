import { FunctionComponent, useState, useEffect } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import useMapInputOptions from "@/hooks/useMapInputOptions";
import Modal from "@/components/reusable/Modal";
import Input from "@/components/reusable/Form/Input";
import Select from "@/components/reusable/Form/Select";
import Textarea from "@/components/reusable/Form/Textarea";
import Spinner from "@/components/reusable/Spinner";
import {
  religionOptions,
  maritalStatusOptions,
  genderOptions,
  educationOptions,
  jobOptions,
} from "./create-or-update-patient.constant";
import useUpdatePatient from "@/services/admin/patient/hooks/useUpdatePatient";
import { Patient } from "@/services/admin/patient/interfaces/get-all-patient.types";
import { IUpdatePatientPayload } from "@/services/admin/patient/interfaces/update-patient.types";
import useGetAllProvince from "@/services/global/region/province/hooks/useGetAllProvince";
import useGetProvince from "@/services/global/region/province/hooks/useGetProvince";
import useGetCity from "@/services/global/region/city/hooks/useGetCity";
import useGetSubDistrict from "@/services/global/region/sub-district/hooks/useGetSubDistrict";

interface Props {
  patient: Patient;
  onOpen: boolean;
  onClose: () => void;
}

type FormFields = IUpdatePatientPayload;

const EditPatientModal: FunctionComponent<Props> = ({
  patient,
  onOpen,
  onClose,
}) => {
  const formattedBirtDate = patient.birth_date
    ? new Date(patient.birth_date).toISOString().split("T")[0]
    : "";

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

  const { provinces } = useGetAllProvince();
  const { province } = useGetProvince(
    selectedProvince || patient.province.id || ""
  );
  const { city } = useGetCity(selectedCity || patient.city.id || "");
  const { sub_district } = useGetSubDistrict(
    selectedSubDistrict || patient.sub_district.id || ""
  );

  const provinceOptions = useMapInputOptions(provinces);
  const cityOptions = useMapInputOptions(province?.cities);
  const subDistrictOptions = useMapInputOptions(city?.sub_districts);
  const villageOptions = useMapInputOptions(sub_district?.villages);

  useEffect(() => {
    setSelectedCity("");
    setSelectedSubDistrict("");
    setSelectedVillage("");
  }, [selectedProvince]);

  useEffect(() => {
    setSelectedSubDistrict("");
    setSelectedVillage("");
  }, [selectedCity]);

  useEffect(() => {
    setSelectedProvince(patient.province.id);
    setSelectedCity(patient.city.id);
    setSelectedSubDistrict(patient.sub_district.id);
    setSelectedVillage(patient.village.id);
  }, [patient.city, patient.province, patient.sub_district, patient.village]);

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { updatePatient } = useUpdatePatient(patient.id);
  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const payload = {
      ...state,
      username: typeof state.name === "string" ? state.name.split(" ")[0] : "",
      province_id: selectedProvince,
      city_id: selectedCity,
      sub_district_id: selectedSubDistrict,
      village_id: selectedVillage,
    };

    const { error, response } = await updatePatient(payload);
    if (error || response) {
      if (error) {
        toast.error("Gagal Memperbarui Pasien", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Sukses Memperbarui Pasien", {
          position: toast.POSITION.TOP_CENTER,
        });

        onClose();
      }
    }
  };

  if (!onOpen) return null;

  return (
    <Modal onOpen={onOpen} modalSize="lg" title="Edit Pasien" onClose={onClose}>
      <FormProvider {...methods}>
        <form className="w-full" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex gap-5 mb-3">
            <div className="flex-1">
              <div className="flex flex-col gap-3 mb-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <Input
                    label="Nama"
                    type="text"
                    placeholder="Nama Lengkap"
                    name="name"
                    defaultValue={patient.name}
                    isRequired
                  />
                  <Input
                    label="NIK"
                    type="text"
                    placeholder="xxxxxxxxxxxxxxxx"
                    name="nik"
                    defaultValue={patient.nik}
                    isRequired
                  />

                  {/* <Input
                    label="Username"
                    type="text"
                    placeholder="Username"
                    name="username"
                    defaultValue={patient.username}
                    isRequired
                  /> */}
                  <Input
                    label="Tempat Lahir"
                    type="text"
                    placeholder="Mojokerto"
                    name="birth_place"
                    defaultValue={patient.birth_place}
                    isRequired
                  />
                  <Input
                    label="Tanggal Lahir"
                    type="date"
                    placeholder="Mojokerto"
                    name="birth_date"
                    defaultValue={formattedBirtDate}
                    isRequired
                  />
                </div>
                <hr className="mt-3 mb-1" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                  <Input
                    label="E-mail"
                    type="email"
                    placeholder="example@gmail.com"
                    name="email"
                    defaultValue={patient.email}
                    isRequired
                  />
                  <Input
                    label="Nomor HP"
                    type="text"
                    placeholder="628xxxxxxxx"
                    name="phone_number"
                    defaultValue={patient.phone_number}
                    isRequired
                  />
                  <Select
                    label="Agama"
                    name="religion"
                    isRequired
                    defaultValue={patient.religion}
                    selectOptions={religionOptions}
                  />

                  <Select
                    label="Jenis Kelamin"
                    name="gender"
                    isRequired
                    defaultValue={patient.gender}
                    selectOptions={genderOptions}
                  />
                  <Select
                    label="Pendidikan"
                    name="education"
                    isRequired
                    defaultValue={patient.education}
                    selectOptions={educationOptions}
                  />
                  <Select
                    label="Pekerjaan"
                    name="job"
                    isRequired
                    defaultValue={patient.job}
                    selectOptions={jobOptions}
                  />

                  <Select
                    label="Status Perkawinan"
                    name="marital_status"
                    isRequired
                    defaultValue={patient.marital_status}
                    selectOptions={maritalStatusOptions}
                  />
                </div>
                <hr className="mt-3 mb-1" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
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
                        <option
                          key={`select-item-${province.value}`}
                          value={province.value}
                          selected={province.value === patient.province.id}
                        >
                          {province.label}
                        </option>
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
                        <option
                          key={`select-item-${city.value}`}
                          value={city.value}
                          selected={city.value === patient.city.id}
                        >
                          {city.label}
                        </option>
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
                        <option
                          key={`select-item-${sub_district.value}`}
                          value={sub_district.value}
                          selected={
                            sub_district.value === patient.sub_district.id
                          }
                        >
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
                        <option
                          key={`select-item-${village.value}`}
                          value={village.value}
                          selected={village.value === patient.village.id}
                        >
                          {village.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <Textarea
                    label="Alamat Tambahan"
                    placeholder=""
                    name="additional_address"
                    defaultValue={patient.additional_address}
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

export default EditPatientModal;
