import { FunctionComponent } from "react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Patient } from "@/services/admin/patient/interfaces/get-all-patient.types";
import Modal from "@/components/reusable/Modal";

interface Props {
  id: string;
  patient: Patient;
  onOpen: boolean;
  onClose: () => void;
}

const PatientModal: FunctionComponent<Props> = ({
  id,
  patient,
  onOpen,
  onClose,
}) => {
  const formattedBirthDate = patient.birth_date
    ? format(new Date(patient.birth_date), "eeee, dd MMMM yyyy", {
        locale: localeId,
      })
    : "";

  return (
    <>
      <Modal
        onOpen={onOpen}
        title={patient.medical_record_number + " - " + patient.username}
        modalSize="lg"
        onClose={onClose}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              NIK
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={patient.nik}
            />
          </div>

          {/* Userame */}
          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full capitalize"
              disabled
              value={patient.name}
            />
          </div>

          {/* Religion */}
          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Tempat Lahir
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={patient.birth_place}
            />
          </div>

          {/* Phone Number */}
          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Tanggal Lahir
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={formattedBirthDate}
            />
          </div>
        </div>
        <hr className="mt-4 mb-3" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Email */}
          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              E-Mail
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={patient.email}
            />
          </div>

          {/* Phone Number */}
          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Nomor HP
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={patient.phone_number}
            />
          </div>

          {/* Religion */}
          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Agama
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={patient.religion}
            />
          </div>

          {/* Phone Number */}
          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Jenis Kelamin
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={patient.gender}
            />
          </div>

          {/* Education */}
          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Pendidikan
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={patient.education}
            />
          </div>

          {/* Job */}
          <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Pekerjaan
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={patient.job}
            />
          </div>

          <div className="form-input col-span-2">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Alamat
            </label>
            <textarea
              id={`patient-modal-detail-${id}`}
              className="textarea textarea-bordered w-full capitalize"
              disabled
              rows={3}
              value={`Ds. ${patient.village.name}, Kec. ${
                patient.sub_district.name
              }, ${patient.city.name}, ${patient.province.name} ${
                patient.village.postal_code
              }\n${patient.additional_address ?? ""}`}
            />
          </div>
          
        </div>
        {/* <hr className="mt-4 mb-1" /> */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> */}
        {/* Province */}
        {/* <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Provinsi
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={patient.province.name}
            />
          </div> */}

        {/* City */}
        {/* <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Kabupaten/Kota
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={patient.city.name}
            />
          </div> */}

        {/* Sub District */}
        {/* <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Kecamatan
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={patient.sub_district.name}
            />
          </div> */}

        {/* Village */}
        {/* <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Desa
            </label>
            <input
              type="text"
              id={`patient-modal-detail-${id}`}
              className="input input-bordered w-full"
              disabled
              value={patient.village.name}
            />
          </div> */}
        {/* </div> */}

        {/* <div className="grid grid-cols-2"> */}
        {/* Job */}
        {/* <div className="form-input">
            <label
              htmlFor={`patient-modal-detail-${id}`}
              className="flex gap-1 leading-4  mb-2"
            >
              Alamat
            </label>
            <textarea
              id={`patient-modal-detail-${id}`}
              className="textarea textarea-bordered w-full capitalize"
              disabled
              rows={3}
              value={`Ds. ${patient.village.name}, Kec. ${patient.sub_district.name}, ${patient.city.name}, ${patient.province.name} ${patient.village.postal_code}\n${patient.additional_address}`}
            />
          </div> */}
        {/* </div> */}
      </Modal>
    </>
  );
};

export default PatientModal;
