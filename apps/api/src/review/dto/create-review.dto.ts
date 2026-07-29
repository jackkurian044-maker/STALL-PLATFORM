import { IsInt, IsString, Max, Min, MinLength, IsOptional } from "class-validator";

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsString()
  @MinLength(3)
  comment!: string;

  @IsOptional()
  @IsString()
  authorName?: string;
}
