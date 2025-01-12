export interface IGetSubDistrictResponse {
  sub_district: SubDistrict;
}

export interface SubDistrict {
  id: string;
  name: string;
  villages: Village[];
}

interface Village {
  id: string;
  name: string;
  postal_code: string;
}
