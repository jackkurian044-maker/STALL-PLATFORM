import { IsOptional, IsString, IsNumberString } from "class-validator";

export class QueryBusinessDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  category?: string; // category slug

  @IsOptional()
  @IsNumberString()
  lat?: string;

  @IsOptional()
  @IsNumberString()
  lng?: string;

  @IsOptional()
  @IsNumberString()
  radiusKm?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
