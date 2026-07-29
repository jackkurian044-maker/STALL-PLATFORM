import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  MinLength,
} from "class-validator";

export class CreateBusinessDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  categoryId!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  address!: string;

  @IsString()
  neighbourhood!: string;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  coverEmoji?: string;

  @IsOptional()
  @IsBoolean()
  isPremium?: boolean;
}
