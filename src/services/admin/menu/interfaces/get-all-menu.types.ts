export interface IGetAllMenuResponse {
  menus: Menu[];
  pagination: Pagination;
}

export interface Menu {
  id: string;
  name: string;
  is_active: string;
  classifications: Classification[];
  submenus: Submenu[];
}

export interface Classification {
  id: string;
  name: string;
  description: string;
  price: string;
}

export interface Submenu {
  id: string;
  menu_id: string;
  name: string;
  type: string;
  is_active: boolean;
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
