export interface IGetAllCountryResponse {
  countries: Country[]
}

export interface Country {
  id: string
  code: string
  name: string
}