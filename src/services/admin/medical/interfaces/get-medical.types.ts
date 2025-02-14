export interface IGetMedicalResponse {
  medical: Medical;
}

export interface Medical {
  id: string;
  checkup_date: string;
  classification: Classification;
  patient: Patient;
  submenu: { id: string; name: string; value:string}[];
}

export interface Patient {
  id: string;
  mrn: string;
  name: string;
}
export interface Classification {
  id: string;
  name: string;
}