import { Module } from "@nestjs/common";
import { AcquisitionController } from "./acquisition.controller";
import { AcquisitionRepository } from "./acquisition.repository";
import { AcquisitionService } from "./acquisition.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [AcquisitionController],
  providers: [AcquisitionRepository, AcquisitionService],
})
export class AcquisitionModule {}
