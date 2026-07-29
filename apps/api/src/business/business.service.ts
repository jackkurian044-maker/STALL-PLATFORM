import { Injectable, NotFoundException } from "@nestjs/common";
import { BusinessRepository } from "./business.repository";
import { QueryBusinessDto } from "./dto/query-business.dto";
import { CreateBusinessDto } from "./dto/create-business.dto";
import { Prisma } from "@prisma/client";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Haversine distance in km between two lat/lng points.
function distanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

@Injectable()
export class BusinessService {
  constructor(private readonly repo: BusinessRepository) {}

  async findAll(query: QueryBusinessDto) {
    const where: Prisma.BusinessWhereInput = {};

    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { description: { contains: query.search } },
        { neighbourhood: { contains: query.search } },
      ];
    }

    if (query.category) {
      where.category = { slug: query.category };
    }

    const limit = query.limit ? parseInt(query.limit, 10) : 50;
    let results = await this.repo.findMany(where, limit);

    // If lat/lng supplied, sort by proximity and attach distanceKm.
    if (query.lat && query.lng) {
      const lat = parseFloat(query.lat);
      const lng = parseFloat(query.lng);
      const radius = query.radiusKm ? parseFloat(query.radiusKm) : 10;

      results = results
        .map((b: (typeof results)[number]) => ({
          ...b,
          distanceKm: distanceKm(lat, lng, b.latitude, b.longitude),
        }))
        .filter((b: { distanceKm: number }) => b.distanceKm <= radius)
        .sort(
          (a: { distanceKm: number }, b: { distanceKm: number }) =>
            a.distanceKm - b.distanceKm,
        );
    }

    return results;
  }

  async findBySlug(slug: string) {
    const business = await this.repo.findBySlug(slug);
    if (!business) {
      throw new NotFoundException(`Business "${slug}" not found`);
    }
    return business;
  }

  async create(dto: CreateBusinessDto) {
    const slug = slugify(dto.name);
    return this.repo.create({
      name: dto.name,
      slug,
      description: dto.description ?? "",
      address: dto.address,
      neighbourhood: dto.neighbourhood,
      latitude: dto.latitude,
      longitude: dto.longitude,
      phone: dto.phone ?? "",
      whatsapp: dto.whatsapp ?? "",
      coverEmoji: dto.coverEmoji ?? "🏪",
      isPremium: dto.isPremium ?? false,
      category: { connect: { id: dto.categoryId } },
    });
  }

  async remove(id: string) {
    return this.repo.remove(id);
  }
}
