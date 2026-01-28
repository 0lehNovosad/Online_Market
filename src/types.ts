export interface ProductSpec {
  label: { uk: string; en: string };
  value: { uk: string; en: string };
}

export interface Product {
  id: number;
  name: { uk: string; en: string };
  price: number;
  description: { uk: string; en: string };
  fullDescription?: { uk: string; en: string };
  image: string;
  categoryKey: string;
  subcategoryKey?: string;
  brand?: string;
  specs?: ProductSpec[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string | null;
}
