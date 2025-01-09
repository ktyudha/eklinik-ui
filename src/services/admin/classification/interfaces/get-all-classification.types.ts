export interface IGetAllClassificationResponse {
  classifications: Classification[];
  pagination: Pagination;
}

export interface Classification {
  id: string;
  name: string;
  description: string;
  price: number;
  menus: Menu[];
}

export interface Menu {
  id: string;
  name: string;
  is_active: string;
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
