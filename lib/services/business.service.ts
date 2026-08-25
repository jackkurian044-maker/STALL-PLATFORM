import type { Business } from '../models/business';
import { businessRepository } from '../repositories/business.repository';

type FirestoreDocument = Record<string, unknown>;

export class BusinessService {
  private readonly cache = new Map<string, Business[]>();

  constructor(private readonly repository = businessRepository) {}

  async getBusinesses(forceRefresh = false): Promise<Business[]> {
    if (!forceRefresh) {
      const cachedBusinesses = this.cache.get('businesses');
      if (cachedBusinesses) {
        return cachedBusinesses;
      }
    }

    const businesses = await this.repository.getBusinesses();
    const normalizedBusinesses = businesses
      .map((business) => this.normalizeBusiness(business))
      .sort((left, right) => left.name.localeCompare(right.name));

    this.cache.set('businesses', normalizedBusinesses);
    return normalizedBusinesses;
  }

  async getBusinessById(id: string): Promise<Business | null> {
    const cachedBusinesses = this.cache.get('businesses');
    if (cachedBusinesses) {
      const cachedBusiness = cachedBusinesses.find((business) => business.id === id);
      if (cachedBusiness) {
        return cachedBusiness;
      }
    }

    const cachedBusinessById = this.cache.get(`business:${id}`);
    if (cachedBusinessById?.length) {
      return cachedBusinessById[0];
    }

    const business = await this.repository.getBusiness(id);
    if (!business) {
      return null;
    }

    const normalizedBusiness = this.normalizeBusiness(business);
    this.cache.set(`business:${id}`, [normalizedBusiness]);
    if (cachedBusinesses) {
      this.cache.set('businesses', [...cachedBusinesses, normalizedBusiness]);
    }
    return normalizedBusiness;
  }

  async saveBusiness(business: Business): Promise<Business | null> {
    const validatedBusiness = this.validateBusiness(business);
    const normalizedBusiness = this.normalizeBusiness(validatedBusiness);
    const firestoreDocument = this.toFirestoreDocument(normalizedBusiness);
    const persistedBusiness = this.fromFirestoreDocument(firestoreDocument);

    const savedBusiness = normalizedBusiness.id
      ? await this.repository.updateBusiness(normalizedBusiness.id, persistedBusiness)
      : await this.repository.createBusiness(persistedBusiness);

    this.invalidateCache();
    return savedBusiness;
  }

  async removeBusiness(id: string): Promise<boolean> {
    const removed = await this.repository.deleteBusiness(id);
    if (removed) {
      this.invalidateCache();
    }

    return removed;
  }

  async searchBusinesses(query: string): Promise<Business[]> {
    const businesses = await this.getBusinesses();
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return businesses;
    }

    return businesses.filter((business) => {
      const haystack = [
        business.name,
        business.category,
        business.city,
        business.state,
        business.address,
        business.description,
        business.phone,
        business.whatsapp,
        ...(business.services ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }

  async getBusinessesByCategory(category: string): Promise<Business[]> {
    const cacheKey = `category:${category.toLowerCase()}`;
    const cachedBusinesses = this.cache.get(cacheKey);
    if (cachedBusinesses) {
      return cachedBusinesses;
    }

    const businesses = await this.getBusinesses();
    const filteredBusinesses = businesses.filter(
      (business) => business.category?.toLowerCase() === category.toLowerCase()
    );

    this.cache.set(cacheKey, filteredBusinesses);
    return filteredBusinesses;
  }

  async getBusinessesByCity(city: string): Promise<Business[]> {
    const cacheKey = `city:${city.toLowerCase()}`;
    const cachedBusinesses = this.cache.get(cacheKey);
    if (cachedBusinesses) {
      return cachedBusinesses;
    }

    const businesses = await this.getBusinesses();
    const filteredBusinesses = businesses.filter(
      (business) => business.city?.toLowerCase() === city.toLowerCase()
    );

    this.cache.set(cacheKey, filteredBusinesses);
    return filteredBusinesses;
  }

  async incrementViews(id: string): Promise<void> {
    const business = await this.repository.getBusiness(id);

    if (!business) {
      return;
    }

    await this.repository.updateBusiness(id, {
      views: (business.views ?? 0) + 1,
    });

    this.invalidateCache();
  }

  async toggleBusinessStatus(id: string): Promise<boolean> {
    const business = await this.repository.getBusiness(id);

    if (!business) {
      return false;
    }

    await this.repository.updateBusiness(id, {
      isOpen: !business.isOpen,
    });

    this.invalidateCache();
    return true;
  }

  async getFeaturedBusinesses(limit = 8): Promise<Business[]> {
    return (await this.getBusinesses())
      .sort((left, right) => (right.rating ?? 0) - (left.rating ?? 0))
      .slice(0, limit);
  }

  async getRecentBusinesses(limit = 10): Promise<Business[]> {
    return (await this.getBusinesses())
      .filter((business) => business.createdAt)
      .sort((left, right) => (right.createdAt?.getTime() ?? 0) - (left.createdAt?.getTime() ?? 0))
      .slice(0, limit);
  }

  toFirestoreDocument(business: Business): FirestoreDocument {
    return {
      ...business,
      createdAt: business.createdAt instanceof Date ? business.createdAt.toISOString() : business.createdAt,
      updatedAt: business.updatedAt instanceof Date ? business.updatedAt.toISOString() : business.updatedAt,
      services: business.services ?? [],
      images: business.images ?? [],
    };
  }

  fromFirestoreDocument(document: FirestoreDocument): Business {
    return {
      ...document,
      id: typeof document.id === 'string' ? document.id : undefined,
      name: typeof document.name === 'string' ? document.name : '',
      category: typeof document.category === 'string' ? document.category : undefined,
      city: typeof document.city === 'string' ? document.city : undefined,
      state: typeof document.state === 'string' ? document.state : undefined,
      description: typeof document.description === 'string' ? document.description : undefined,
      address: typeof document.address === 'string' ? document.address : undefined,
      phone: typeof document.phone === 'string' ? document.phone : undefined,
      whatsapp: typeof document.whatsapp === 'string' ? document.whatsapp : undefined,
      email: typeof document.email === 'string' ? document.email : undefined,
      slug: typeof document.slug === 'string' ? document.slug : undefined,
      rating: typeof document.rating === 'number' ? document.rating : undefined,
      reviewCount: typeof document.reviewCount === 'number' ? document.reviewCount : undefined,
      views: typeof document.views === 'number' ? document.views : undefined,
      latitude: typeof document.latitude === 'number' ? document.latitude : undefined,
      longitude: typeof document.longitude === 'number' ? document.longitude : undefined,
      isOpen: typeof document.isOpen === 'boolean' ? document.isOpen : true,
      services: Array.isArray(document.services)
        ? (document.services as string[]).filter((service): service is string => typeof service === 'string')
        : [],
      images: Array.isArray(document.images)
        ? (document.images as string[]).filter((image): image is string => typeof image === 'string')
        : [],
      createdAt: this.parseDate(document.createdAt),
      updatedAt: this.parseDate(document.updatedAt),
    };
  }

  private validateBusiness(business: Business): Business {
    const trimmedName = business.name?.trim();
    const trimmedPhone = business.phone?.trim();
    const trimmedCategory = business.category?.trim();
    const trimmedCity = business.city?.trim();
    const trimmedAddress = business.address?.trim();

    if (!trimmedName) {
      throw new Error('Business name is required.');
    }

    if (!trimmedPhone) {
      throw new Error('Business phone is required.');
    }

    if (!trimmedCategory) {
      throw new Error('Business category is required.');
    }

    if (!trimmedCity) {
      throw new Error('Business city is required.');
    }

    if (!trimmedAddress) {
      throw new Error('Business address is required.');
    }

    return {
      ...business,
      name: trimmedName,
      phone: trimmedPhone,
      category: trimmedCategory,
      city: trimmedCity,
      address: trimmedAddress,
    };
  }

  private normalizeBusiness(business: Business): Business {
    return {
      ...business,
      name: business.name?.trim() ?? '',
      slug: business.slug?.trim() || this.slugify(business.name ?? ''),
      category: business.category?.trim(),
      city: business.city?.trim(),
      state: business.state?.trim(),
      description: business.description?.trim(),
      address: business.address?.trim(),
      services: (business.services ?? []).filter((service): service is string => typeof service === 'string' && service.trim().length > 0).map((service) => service.trim()),
      images: (business.images ?? []).filter((image): image is string => typeof image === 'string' && image.trim().length > 0).map((image) => image.trim()),
      isOpen: business.isOpen ?? true,
      createdAt: business.createdAt ?? new Date(),
      updatedAt: new Date(),
      rating: business.rating ?? 0,
      reviewCount: business.reviewCount ?? 0,
      views: business.views ?? 0,
    };
  }

  private slugify(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private parseDate(value: unknown): Date | undefined {
    if (value instanceof Date) {
      return value;
    }

    if (typeof value === 'string') {
      const parsedDate = new Date(value);
      return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
    }

    return undefined;
  }

  private invalidateCache(): void {
    this.cache.clear();
  }
}
