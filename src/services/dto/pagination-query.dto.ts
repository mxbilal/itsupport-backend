import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';

export class PaginationQueryParams {
  @IsOptional()
  @IsInt()
  @Min(1)
  PageNumber: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize: number = 10;

  @IsOptional()
  @IsString()
  SortColumn: string = 'id';

  @IsOptional()
  @IsString()
  SortOrder: 'a' | 'd' = 'a';

  @IsOptional()
  @IsString()
  search?: string;
}