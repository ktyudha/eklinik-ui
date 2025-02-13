export interface ICreateOrUpdateMedicalPayload {
  patient_id: string;
  classification_id: string;
  checkup_date: string;
  submenu: { id: string;  value:string}[];
}
