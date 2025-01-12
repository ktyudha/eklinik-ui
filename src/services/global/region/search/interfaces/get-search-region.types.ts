export interface IGetSearchRegionResponse {
  regions: Village[];
}

export interface Village {
  id: string;
  name: string;
  postal_code: string;
  sub_district: SubDistrict;
  city: City;
  province: Province;
}

export interface SubDistrict {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
}

export interface Province {
  id: string;
  name: string;
}
