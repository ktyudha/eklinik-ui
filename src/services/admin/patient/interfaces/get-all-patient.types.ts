export interface IGetAllPatientResponse {
  patients: Patient[];
  pagination: Pagination;
}

export interface Patient {
  id: string;
  medical_record_number: string;
  name: string;
  username: string;
  email: string;
  phone_number: string;
  birth_place: string;
  birth_date: string;
  nik: string;
  religion: string;
  education: string;
  marital_status: string;
  job: string;
  gender: string;
  additional_address: string;
  province: Province;
  city: City;
  sub_district: SubDistrict;
  village: Village;
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

export interface Province {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
}

export interface SubDistrict {
  id: string;
  name: string;
}

export interface Village {
  id: string;
  name: string;
  postal_code: string;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
