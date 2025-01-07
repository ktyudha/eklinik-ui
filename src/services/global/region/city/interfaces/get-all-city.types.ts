export interface IGetAllCityResponse {
  cities: City[]
}

export interface City {
  id: string
  name: string
  sub_districts: SubDistrict[]
}

interface SubDistrict {
  id: string
  name: string
}