// import { Transform } from 'class-transformer';
// import { IsInt, IsOptional, Max, Min } from 'class-validator';

// export class ListClientsQueryDto {
//   @IsOptional()
//   @Transform(({ value }) => (value !== undefined ? Number(value) : 0))
//   @IsInt()
//   @Min(0)
//   skip?: number = 0;

//   @IsOptional()
//   @Transform(({ value }) => (value !== undefined ? Number(value) : 25))
//   @IsInt()
//   @Min(1)
//   @Max(100)
//   take?: number = 25;
// }
