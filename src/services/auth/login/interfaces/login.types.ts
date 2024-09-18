export type IMeResponse = Omit<ILoginResponse, 'token'>
export interface ILoginResponse {
  user: User
  role: 'agency' | 'sub-agency' | 'school'
  created_at: string
  updated_at: string
  token: string
}

export interface User {
  id: string
  role: string
  name: string
  npsn: string | null
  grade: Grade | null
  education_type: string | null
  education_status: string | null
  username: string
  email: string
  sp_code: string
  province: Province | null
  city: City | null
  sub_district: SubDistrict | null
  village: string | null
  address: string | null
  principal_name: string | null
  account_type: string
  grades: Grade[]
  cities: City[]
}

interface Grade {
  id: string
  name: string
}

interface Province {
  id: string
  name: string
}

interface City {
  id: string
  name: string
}

interface SubDistrict {
  id: string
  name: string
}