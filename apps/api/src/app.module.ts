import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { BusinessModule } from "./business/business.module";
import { CategoryModule } from "./category/category.module";
import { ReviewModule } from "./review/review.module";
import { AppController } from "./app.controller";

@Module({
  imports: [PrismaModule, BusinessModule, CategoryModule, ReviewModule],
  controllers: [AppController],
})
export class AppModule {}
