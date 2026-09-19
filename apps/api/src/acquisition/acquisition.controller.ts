import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { AcquisitionService } from "./acquisition.service";
import { CreateCandidateDto } from "./dto/create-candidate.dto";
import { AcquisitionStatus } from "@prisma/client";

@Controller("acquisition")
export class AcquisitionController {
  constructor(private readonly service: AcquisitionService) {}

  @Get("candidates")
  list(@Query("status") status?: AcquisitionStatus) {
    return this.service.list(status);
  }

  @Post("candidates")
  create(@Body() dto: CreateCandidateDto) {
    return this.service.create(dto);
  }

  @Post("candidates/:id/status")
  setStatus(@Param("id") id: string, @Body("status") status: AcquisitionStatus) {
    return this.service.setStatus(id, status);
  }
}
