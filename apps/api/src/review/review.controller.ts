import { Controller, Get, Post, Param, Body } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateReviewDto } from "./dto/create-review.dto";

@Controller("businesses/:businessId/reviews")
export class ReviewController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll(@Param("businessId") businessId: string) {
    return this.prisma.client.review.findMany({
      where: { businessId },
      orderBy: { createdAt: "desc" },
    });
  }

  @Post()
  async create(
    @Param("businessId") businessId: string,
    @Body() dto: CreateReviewDto,
  ) {
    const review = await this.prisma.client.review.create({
      data: {
        businessId,
        rating: dto.rating,
        comment: dto.comment,
        authorName: dto.authorName ?? "Anonymous",
      },
    });

    // Recalculate the business's aggregate rating/review count.
    const agg = await this.prisma.client.review.aggregate({
      where: { businessId },
      _avg: { rating: true },
      _count: true,
    });

    await this.prisma.client.business.update({
      where: { id: businessId },
      data: {
        rating: agg._avg.rating ?? 0,
        reviewCount: agg._count,
      },
    });

    return review;
  }
}
