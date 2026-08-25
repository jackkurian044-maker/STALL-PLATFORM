export interface Offer {
  id?: string;
  title: string;
  description?: string;
  discountPercent?: number;
  validUntil?: Date;
  isActive?: boolean;
}
