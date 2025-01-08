export interface IGetAllMedicineResponse {
  medicines: Medicine[];
  // pagination: Pagination;
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  expired_date: string;
  unit: string;
  stock: string;
  price: number;
  medicine_category: MedicineCategory;
}

export interface MedicineCategory {
  id: string;
  name: string;
  description: string;
}

export interface Pagination {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
