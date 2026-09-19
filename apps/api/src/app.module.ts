import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { BusinessModule } from "./business/business.module";
import { CategoryModule } from "./category/category.module";
import { ReviewModule } from "./review/review.module";
import { AcquisitionModule } from "./acquisition/acquisition.module";
import { AppController } from "./app.controller";

@Module({
  imports: [PrismaModule, BusinessModule, CategoryModule, ReviewModule, AcquisitionModule],
  controllers: [AppController],
})
export class AppModule {}
