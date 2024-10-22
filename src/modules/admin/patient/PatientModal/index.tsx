import { FunctionComponent } from "react";
import { Patients } from "@/services/admin/patient/interfaces/get-all-patient.types";

interface Props {
  number: number;
  patient: Patients;
}

const PatientModal: FunctionComponent<Props> = ({ number, patient }) => {
  return (
    <>
      <input
        type="checkbox"
        id={`patient-modal-${number}`}
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold mb-7">
            {patient.medical_record_number} - {patient.name}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-input">
              <label
                htmlFor={`patient-modal-detail-${number}`}
                className="flex gap-1 leading-4  mb-2"
              >
                NIK
              </label>
              <input
                type="text"
                id={`patient-modal-detail-${number}`}
                className="input input-bordered w-full"
                disabled
                value={patient.nik}
              />
            </div>

            {/* Userame */}
            <div className="form-input">
              <label
                htmlFor={`patient-modal-detail-${number}`}
                className="flex gap-1 leading-4  mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id={`patient-modal-detail-${number}`}
                className="input input-bordered w-full"
                disabled
                value={patient.username}
              />
            </div>

            {/* Religion */}
            <div className="form-input">
              <label
                htmlFor={`patient-modal-detail-${number}`}
                className="flex gap-1 leading-4  mb-2"
              >
                Birth Place
              </label>
              <input
                type="text"
                id={`patient-modal-detail-${number}`}
                className="input input-bordered w-full"
                disabled
                value={patient.birth_place}
              />
            </div>

            {/* Phone Number */}
            <div className="form-input">
              <label
                htmlFor={`patient-modal-detail-${number}`}
                className="flex gap-1 leading-4  mb-2"
              >
                Birth Date
              </label>
              <input
                type="text"
                id={`patient-modal-detail-${number}`}
                className="input input-bordered w-full"
                disabled
                value={patient.birth_date}
              />
            </div>
          </div>
          <hr className="mt-6 mb-3" />
          <div className="grid grid-cols-2 gap-4">
            {/* Email */}
            <div className="form-input">
              <label
                htmlFor={`patient-modal-detail-${number}`}
                className="flex gap-1 leading-4  mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id={`patient-modal-detail-${number}`}
                className="input input-bordered w-full"
                disabled
                value={patient.email}
              />
            </div>

            {/* Phone Number */}
            <div className="form-input">
              <label
                htmlFor={`patient-modal-detail-${number}`}
                className="flex gap-1 leading-4  mb-2"
              >
                Phone Number / WhatsApp
              </label>
              <input
                type="text"
                id={`patient-modal-detail-${number}`}
                className="input input-bordered w-full"
                disabled
                value={patient.phone_number}
              />
            </div>

            {/* Religion */}
            <div className="form-input">
              <label
                htmlFor={`patient-modal-detail-${number}`}
                className="flex gap-1 leading-4  mb-2"
              >
                Religion
              </label>
              <input
                type="text"
                id={`patient-modal-detail-${number}`}
                className="input input-bordered w-full"
                disabled
                value={patient.religion}
              />
            </div>

            {/* Phone Number */}
            <div className="form-input">
              <label
                htmlFor={`patient-modal-detail-${number}`}
                className="flex gap-1 leading-4  mb-2"
              >
                Gender
              </label>
              <input
                type="text"
                id={`patient-modal-detail-${number}`}
                className="input input-bordered w-full"
                disabled
                value={patient.gender}
              />
            </div>

            {/* Education */}
            <div className="form-input">
              <label
                htmlFor={`patient-modal-detail-${number}`}
                className="flex gap-1 leading-4  mb-2"
              >
                Education
              </label>
              <input
                type="text"
                id={`patient-modal-detail-${number}`}
                className="input input-bordered w-full"
                disabled
                value={patient.education}
              />
            </div>

            {/* Job */}
            <div className="form-input">
              <label
                htmlFor={`patient-modal-detail-${number}`}
                className="flex gap-1 leading-4  mb-2"
              >
                Job
              </label>
              <input
                type="text"
                id={`patient-modal-detail-${number}`}
                className="input input-bordered w-full"
                disabled
                value={patient.job}
              />
            </div>
          </div>
          <hr className="mt-6 mb-3" />
          <div className="grid grid-cols-2 gap-4">
            {/* Province */}
            <div className="form-input">
              <label
                htmlFor={`patient-modal-detail-${number}`}
                className="flex gap-1 leading-4  mb-2"
              >
                Province
              </label>
              <input
                type="text"
                id={`patient-modal-detail-${number}`}
                className="input input-bordered w-full"
                disabled
                value={patient.province.name}
              />
            </div>

            {/* City */}
            <div className="form-input">
              <label
                htmlFor={`patient-modal-detail-${number}`}
                className="flex gap-1 leading-4  mb-2"
              >
                City
              </label>
              <input
                type="text"
                id={`patient-modal-detail-${number}`}
                className="input input-bordered w-full"
                disabled
                value={patient.city.name}
              />
            </div>

            {/* Sub District */}
            <div className="form-input">
              <label
                htmlFor={`patient-modal-detail-${number}`}
                className="flex gap-1 leading-4  mb-2"
              >
                Sub District
              </label>
              <input
                type="text"
                id={`patient-modal-detail-${number}`}
                className="input input-bordered w-full"
                disabled
                value={patient.sub_district.name}
              />
            </div>

            {/* Village */}
            <div className="form-input">
              <label
                htmlFor={`patient-modal-detail-${number}`}
                className="flex gap-1 leading-4  mb-2"
              >
                Village
              </label>
              <input
                type="text"
                id={`patient-modal-detail-${number}`}
                className="input input-bordered w-full"
                disabled
                value={patient.village}
              />
            </div>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor={`patient-modal-${number}`}>
          Close
        </label>
      </div>
    </>
  );
};

export default PatientModal;
