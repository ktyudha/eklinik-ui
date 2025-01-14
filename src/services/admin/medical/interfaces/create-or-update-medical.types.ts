export interface ICreateOrUpdateMedicinePayload {
  patient_id: string;
  classification_id: string;
  checkup_date: string;
  submenu: string[];
}
