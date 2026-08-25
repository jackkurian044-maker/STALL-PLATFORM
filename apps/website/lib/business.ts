import { businesses as seedBusinesses } from "@/data/businesses";
import type { Business } from "@/types/business";

export type BusinessFilterOptions = {
  category?: string;
  city?: string;
  state?: string;
  service?: string;
  isOpen?: boolean;
  query?: string;
};

export class BusinessService {
  private readonly businesses: Business[];

  constructor(initialBusinesses: Business[] = seedBusinesses) {
    this.businesses = initialBusinesses.map((business) => ({ ...business, services: [...business.services] }));
  }

  getBusinesses() {
    return this.businesses.map((business) => ({ ...business, services: [...business.services] }));
  }

  getBusiness(id: string) {
    return this.businesses.find((business) => business.id === id) ?? null;
  }

  createBusiness(input: Partial<Business> & Pick<Business, "name">): Business {
    const business: Business = {
      id: input.id ?? `${input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
      name: input.name,
      category: input.category ?? "General",
      rating: input.rating ?? 0,
      reviewCount: input.reviewCount ?? 0,
      views: input.views ?? 0,
      phone: input.phone ?? "",
      whatsapp: input.whatsapp ?? "",
      address: input.address ?? "",
      city: input.city ?? "",
      state: input.state ?? "",
      isOpen: input.isOpen ?? true,
      description: input.description ?? "",
      services: input.services ?? [],
      images: input.images ?? [],
    };

    this.businesses.push(business);
    return { ...business, services: [...business.services] };
  }

  updateBusiness(id: string, updates: Partial<Business>) {
    const index = this.businesses.findIndex((business) => business.id === id);

    if (index === -1) {
      return null;
    }

    const updatedBusiness: Business = {
      ...this.businesses[index],
      ...updates,
      id,
      services: updates.services ?? this.businesses[index].services,
      images: updates.images ?? this.businesses[index].images,
    };

    this.businesses[index] = updatedBusiness;
    return { ...updatedBusiness, services: [...updatedBusiness.services] };
  }

  deleteBusiness(id: string) {
    const initialLength = this.businesses.length;
    const nextBusinesses = this.businesses.filter((business) => business.id !== id);
    this.businesses.splice(0, this.businesses.length, ...nextBusinesses);
    return this.businesses.length !== initialLength;
  }

  getBusinessesByCategory(category: string) {
    return this.businesses
      .filter((business) => business.category.toLowerCase() === category.toLowerCase())
      .map((business) => ({ ...business, services: [...business.services] }));
  }

  getBusinessesByCity(city: string) {
    return this.businesses
      .filter((business) => business.city.toLowerCase() === city.toLowerCase())
      .map((business) => ({ ...business, services: [...business.services] }));
  }

  getBusinessesByState(state: string) {
    return this.businesses
      .filter((business) => business.state.toLowerCase() === state.toLowerCase())
      .map((business) => ({ ...business, services: [...business.services] }));
  }

  getBusinessesByService(service: string) {
    return this.businesses
      .filter((business) => business.services.some((item) => item.toLowerCase() === service.toLowerCase()))
      .map((business) => ({ ...business, services: [...business.services] }));
  }

  getOpenBusinesses() {
    return this.businesses
      .filter((business) => business.isOpen)
      .map((business) => ({ ...business, services: [...business.services] }));
  }

  getCategories() {
    return Array.from(new Set(this.businesses.map((business) => business.category))).sort();
  }

  getCities() {
    return Array.from(new Set(this.businesses.map((business) => business.city))).sort();
  }

  getStates() {
    return Array.from(new Set(this.businesses.map((business) => business.state))).sort();
  }

  filterBusinesses(options: BusinessFilterOptions = {}) {
    const normalizedQuery = options.query?.toLowerCase().trim();

    return this.businesses.filter((business) => {
      if (options.category && business.category.toLowerCase() !== options.category.toLowerCase()) {
        return false;
      }

      if (options.city && business.city.toLowerCase() !== options.city.toLowerCase()) {
        return false;
      }

      if (options.state && business.state.toLowerCase() !== options.state.toLowerCase()) {
        return false;
      }

      if (
        options.service &&
        !business.services.some((item) => item.toLowerCase() === options.service?.toLowerCase())
      ) {
        return false;
      }

      if (options.isOpen !== undefined && business.isOpen !== options.isOpen) {
        return false;
      }

      if (normalizedQuery) {
        const haystack = [
          business.name,
          business.category,
          business.city,
          business.state,
          business.address,
          business.description,
          ...business.services,
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      }

      return true;
    }).map((business) => ({ ...business, services: [...business.services] }));
  }

  searchBusinesses(query: string) {
    return this.filterBusinesses({ query });
  }
}

const businessService = new BusinessService();

export function getBusinesses() {
  return businessService.getBusinesses();
}

export function getBusiness(id: string) {
  return businessService.getBusiness(id);
}

export function createBusiness(input: Partial<Business> & Pick<Business, "name">) {
  return businessService.createBusiness(input);
}

export function updateBusiness(id: string, updates: Partial<Business>) {
  return businessService.updateBusiness(id, updates);
}

export function deleteBusiness(id: string) {
  return businessService.deleteBusiness(id);
}

export function getBusinessesByCategory(category: string) {
  return businessService.getBusinessesByCategory(category);
}

export function getBusinessesByCity(city: string) {
  return businessService.getBusinessesByCity(city);
}

export function getBusinessesByState(state: string) {
  return businessService.getBusinessesByState(state);
}

export function getBusinessesByService(service: string) {
  return businessService.getBusinessesByService(service);
}

export function getOpenBusinesses() {
  return businessService.getOpenBusinesses();
}

export function getCategories() {
  return businessService.getCategories();
}

export function getCities() {
  return businessService.getCities();
}

export function getStates() {
  return businessService.getStates();
}

export function filterBusinesses(options: BusinessFilterOptions = {}) {
  return businessService.filterBusinesses(options);
}

export function searchBusinesses(query: string) {
  return businessService.searchBusinesses(query);
}
