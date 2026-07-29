import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Controller("categories")
export class CategoryController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.client.category.findMany({
      orderBy: { name: "asc" },
    });
  }
}
