import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from "@nestjs/common";
import { BusinessService } from "./business.service";
import { QueryBusinessDto } from "./dto/query-business.dto";
import { CreateBusinessDto } from "./dto/create-business.dto";

@Controller("businesses")
export class BusinessController {
  constructor(private readonly service: BusinessService) {}

  // GET /businesses?search=salon&category=salon&lat=..&lng=..&radiusKm=5
  @Get()
  findAll(@Query() query: QueryBusinessDto) {
    return this.service.findAll(query);
  }

  // GET /businesses/:slug
  @Get(":slug")
  findOne(@Param("slug") slug: string) {
    return this.service.findBySlug(slug);
  }

  // POST /businesses  (merchant onboarding)
  @Post()
  create(@Body() dto: CreateBusinessDto) {
    return this.service.create(dto);
  }

  // DELETE /businesses/:id
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
