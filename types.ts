export interface Menu {
  id: number | string;
  name: string;
  price: number;
}

export interface MenuCategory {
  id: number;
  name: string;
  isAvailable: boolean;
}
