export class CreateCandidateDto {
  source?: string;
  externalId?: string;
  name!: string;
  category?: string;
  address?: string;
  neighbourhood?: string;
  phone?: string;
  whatsapp?: string;
  latitude?: number;
  longitude?: number;
  rating?: number;
  reviewCount?: number;
  notes?: string;
}
