export interface IGetMedicalResponse {
  medical: Medical;
}

export interface Medical {
  id: string;
  checkup_date: string;
  classification: Classification;
  patient: Patient;
  // submenu: string[];
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