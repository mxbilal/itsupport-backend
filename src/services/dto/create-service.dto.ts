// src/services/dto/create-service.dto.ts

import { IsString, IsBoolean, IsOptional, IsInt } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsBoolean()
  isActive: boolean;

  @IsInt()
  serviceType: number;

  @IsBoolean()
  deleted: boolean;
}
