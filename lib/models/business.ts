export interface Business {
  id?: string;
  name: string;
  slug?: string;
  email?: string;
  phone?: string;
  category?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  rating?: number;
  reviewCount?: number;
  views?: number;
  whatsapp?: string;
  isOpen?: boolean;
  services?: string[];
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
