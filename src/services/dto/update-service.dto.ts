// src/services/dto/update-service.dto.ts

import { IsString, IsBoolean, IsOptional, IsInt } from 'class-validator';

export class UpdateServiceDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsInt()
  @IsOptional()
  serviceType?: number;

  @IsBoolean()
  @IsOptional()
  deleted?: boolean;
}
