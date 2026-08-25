import type { Business } from '../models/business';

export class BusinessRepository {
  private businesses: Business[] = [
    {
      id: 'aya-flowers',
      name: 'Aya Flowers',
      category: 'Flowers',
      rating: 4.9,
      reviewCount: 284,
      views: 3520,
      phone: '...',
      whatsapp: '...',
      address: '...',
      city: '...',
      state: '...',
      isOpen: true,
      description: 'Premium floral arrangements and gifting.',
      services: ['Bouquets', 'Wedding Decoration', 'Birthday Decoration'],
      images: [],
    },
    {
      id: 'style-express',
      name: 'Style Express',
      category: 'Salon',
      rating: 4.8,
      reviewCount: 192,
      views: 2175,
      phone: '9876543210',
      whatsapp: '9876543210',
      address: 'Kadugodi',
      city: 'Bangalore',
      state: 'Karnataka',
      isOpen: true,
      description: 'Professional salon services for men and women.',
      services: ['Haircut', 'Facial', 'Hair Spa'],
      images: [],
    },
  ];

  async createBusiness(business: Business): Promise<Business> {
    const createdBusiness: Business = {
      ...business,
      id: business.id ?? this.generateId(business.name),
    };

    if (this.businesses.some((existingBusiness) => existingBusiness.id === createdBusiness.id)) {
      throw new Error('Business already exists');
    }

    this.businesses = [...this.businesses, createdBusiness];
    return createdBusiness;
  }

  async updateBusiness(id: string, data: Partial<Business>): Promise<Business | null> {
    const index = this.businesses.findIndex((business) => business.id === id);

    if (index === -1) {
      return null;
    }

    const updatedBusiness: Business = {
      ...this.businesses[index],
      ...data,
      id,
    };

    this.businesses = this.businesses.map((business) =>
      business.id === id ? updatedBusiness : business
    );

    return updatedBusiness;
  }

  async deleteBusiness(id: string): Promise<boolean> {
    const previousLength = this.businesses.length;
    this.businesses = this.businesses.filter((business) => business.id !== id);
    return this.businesses.length !== previousLength;
  }

  async getBusiness(id: string): Promise<Business | null> {
    return this.businesses.find((business) => business.id === id) ?? null;
  }

  async getBusinesses(page = 1, limit = 20): Promise<Business[]> {
    const startIndex = (page - 1) * limit;
    return [...this.businesses]
      .sort((left, right) => left.name.localeCompare(right.name))
      .slice(startIndex, startIndex + limit);
  }

  async searchBusinesses(query: string): Promise<Business[]> {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return this.getBusinesses();
    }

    return [...this.businesses]
      .sort((left, right) => left.name.localeCompare(right.name))
      .filter((business) => {
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
    return [...this.businesses]
      .sort((left, right) => left.name.localeCompare(right.name))
      .filter((business) => business.category?.toLowerCase() === category.toLowerCase());
  }

  async getBusinessesByCity(city: string): Promise<Business[]> {
    return [...this.businesses]
      .sort((left, right) => left.name.localeCompare(right.name))
      .filter((business) => business.city?.toLowerCase() === city.toLowerCase());
  }

  async getOpenBusinesses(): Promise<Business[]> {
    return [...this.businesses]
      .sort((left, right) => left.name.localeCompare(right.name))
      .filter((business) => business.isOpen);
  }

  async getFeaturedBusinesses(limit = 6): Promise<Business[]> {
    return [...this.businesses]
      .sort((left, right) => (right.rating ?? 0) - (left.rating ?? 0))
      .slice(0, limit);
  }

  async incrementViews(id: string): Promise<Business | null> {
    const business = await this.getBusiness(id);

    if (!business) {
      return null;
    }

    const updatedBusiness = {
      ...business,
      views: (business.views ?? 0) + 1,
    };

    await this.updateBusiness(id, updatedBusiness);
    return updatedBusiness;
  }

  async toggleBusinessStatus(id: string): Promise<Business | null> {
    const business = await this.getBusiness(id);

    if (!business) {
      return null;
    }

    const updatedBusiness = {
      ...business,
      isOpen: !business.isOpen,
    };

    await this.updateBusiness(id, updatedBusiness);
    return updatedBusiness;
  }

  private generateId(name: string): string {
    return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`;
  }
}

export const businessRepository = new BusinessRepository();
