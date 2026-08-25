export interface Service {
  id?: string;
  businessId: string;
  title: string;
  description?: string;
  price?: number;
  duration?: string;
  isActive?: boolean;
}
