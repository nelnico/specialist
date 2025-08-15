// src/specialist/dto/search-specialists.dto.ts
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export enum SpecialistSortKey {
  Newest = 'newest',
  MostReviewed = 'mostReviewed',
  MostFavorited = 'mostFavorited',
}

export class SearchSpecialistsDto {
  @IsOptional()
  @IsEnum(SpecialistSortKey)
  orderBy: SpecialistSortKey = SpecialistSortKey.Newest;

  @IsOptional()
  @Transform(({ value }) => (value === undefined ? 0 : Number(value)))
  @IsInt()
  @Min(0)
  skip: number = 0;

  @IsOptional()
  @Transform(({ value }) => (value === undefined ? 50 : Number(value)))
  @IsInt()
  @Min(1)
  take: number = 50;

  @IsOptional()
  @IsString()
  query?: string;

  // ✅ make it a number
  @IsOptional()
  @Transform(({ value }) =>
    value === undefined || value === null || value === ''
      ? undefined
      : Number(value),
  )
  @IsInt()
  provinceId?: number;
}
