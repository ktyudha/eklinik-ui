export interface IGetAllProvinceResponse {
  provinces: Province[]
}

export interface Province {
  id: string
  name: string
  cities: City[]
}

interface City {
  id: string
  name: string
}