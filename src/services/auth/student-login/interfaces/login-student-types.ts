export type IMeStudentResponse = Omit<ILoginStudentResponse, 'token'>
export interface ILoginStudentResponse {
  user: Student
  token: string
  role: 'student'
}

export interface Student {
  id: string
  name: string
  age: number | null
  nisn: string
  nik: number
  family_card_number: number
  gender: string
  religion: string
  birthdate: string
  birth_place: string
  address: string
  province: Province
  city: City
  sub_district: SubDistrict
  village: string
  rt: string
  rw: string
  marital_status: string
  email: string
  phone_number: string
  grade: Grade
  education_level: number
  survey_status: string
  graduation_year: number | null
  education_field: string | null
  education_program: string | null
  education_competence: string | null
  mother_name: string | null
  school: School
  profile_tracer: ProfileTracer
}

export interface School {
  id: string
  name: string
  npsn: string
  education_type: string
  education_status: string
  village: string
  address: string
  principal_name: string
  province: Province
  city: City
  sub_district: SubDistrict
}

export interface Grade {
  id: string
  name: string
}

export interface School {
  id: string
  name: string
}

export interface Province {
  id: string
  name: string
}

export interface City {
  id: string
  name: string
}

export interface SubDistrict {
  id: string
  name: string
}

interface ProfileTracer {
  id: string
  name: string
  package: Package
}

interface Package {
  id: string
  name: string
}