export interface IGetAllVillageResponse {
  villages: Village[];
}

export interface Village {
  id: string;
  name: string;
  postal_code: string;
}
