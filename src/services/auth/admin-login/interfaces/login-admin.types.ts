export type IMeAdminResponse = Omit<ILoginAdminResponse, "token">;
export interface ILoginAdminResponse {
  user: User;
  role: "admin";
  token: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string | null;
  medical_record_number: string;
  nik: string;
  religion: string;
  birth_date: string;
  birth_place: string;
  gender: string;
  marital_status: string;
  education: string;
  job: string;
  phone_number: string;
  province: Province | null;
  city: City | null;
  sub_district: SubDistrict | null;
  village: Village | null;
  additional_address: string | null;
}

interface Province {
  id: string;
  name: string;
}

interface City {
  id: string;
  name: string;
}

interface SubDistrict {
  id: string;
  name: string;
}

interface Village {
  id: string;
  name: string;
  postal_code: string;
}
