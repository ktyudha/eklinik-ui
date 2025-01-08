export interface IGetAllSubMenuResponse {
  sub_menus: SubMenu[];
  pagination: Pagination;
}

export interface SubMenu {
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
