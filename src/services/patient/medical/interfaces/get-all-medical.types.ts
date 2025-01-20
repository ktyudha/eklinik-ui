export interface IGetAllMedicalResponse {
  medicals: Medical[];
  pagination: Pagination;
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

export interface Pagination {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
