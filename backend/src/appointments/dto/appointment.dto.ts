import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { AppointmentStatus } from '@prisma/client';

export class CreateAppointmentDto {
  @IsDateString({}, { message: 'La fecha debe ser válida' })
  date: string;

  @IsString()
  serviceId: string;

  @IsOptional()
  @IsString()
  barberId?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateAppointmentDto {
  @IsOptional()
  @IsDateString({}, { message: 'La fecha debe ser válida' })
  date?: string;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;

  @IsOptional()
  @IsString()
  barberId?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
