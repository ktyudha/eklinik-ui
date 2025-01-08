export interface ICreateOrUpdateMedicinePayload {
  name: string;
  description: string;
  medicine_category_id: string;
  expired_date: string;
  unit: number;
  stock: string;
  price: string;
}
