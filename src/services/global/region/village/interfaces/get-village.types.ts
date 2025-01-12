export interface IGetVillageResponse {
  village: Village;
}

export interface Village {
  id: string;
  name: string;
  postal_code: string;
}
