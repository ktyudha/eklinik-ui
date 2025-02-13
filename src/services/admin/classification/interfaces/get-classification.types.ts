export interface IGetClassificationResponse {
  classification: Classification;
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
  submenus: SubMenu[]
}

export interface SubMenu {
  id: string;
  menu_id: string;
  name: string;
  type: string;
  is_active: boolean;
}