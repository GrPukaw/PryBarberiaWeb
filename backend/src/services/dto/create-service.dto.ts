import { IsString, IsNumber, IsOptional, IsBoolean, Min, MinLength } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  price: number;

  @IsNumber()
  @Min(5, { message: 'La duración mínima es de 5 minutos' })
  duration: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
