import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class BusinessRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.BusinessWhereInput, take?: number) {
    return this.prisma.client.business.findMany({
      where,
      take,
      include: { category: true, images: true },
      orderBy: [{ isPremium: "desc" }, { rating: "desc" }],
    });
  }

  findBySlug(slug: string) {
    return this.prisma.client.business.findUnique({
      where: { slug },
      include: {
        category: true,
        images: true,
        offers: { where: { expiresAt: { gt: new Date() } } },
        reviews: { orderBy: { createdAt: "desc" }, take: 20 },
      },
    });
  }

  create(data: Prisma.BusinessCreateInput) {
    return this.prisma.client.business.create({ data });
  }

  update(id: string, data: Prisma.BusinessUpdateInput) {
    return this.prisma.client.business.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.client.business.delete({ where: { id } });
  }
}
