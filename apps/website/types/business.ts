export interface Business {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  views?: number;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  state: string;
  isOpen: boolean;
  description: string;
  services: string[];
  images: string[];
}