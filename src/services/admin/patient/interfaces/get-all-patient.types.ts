export interface IGetAllPatientResponse {
  patients: Patients[];
  //   pagination: Pagination;
}

export interface Patients {
  id: string;
  no_medical_record: string;
  name: string;
  date_of_birth: string;
  nik: string;
  education: string;
  job: string;
  gender: string;
  address: string;
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
