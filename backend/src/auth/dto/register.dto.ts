import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';

export enum Role {
  CLIENT = 'CLIENT',
  BARBER = 'BARBER',
  ADMIN = 'ADMIN',
}

export class RegisterDto {
  @IsEmail({}, { message: 'Por favor ingresa un email válido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  name: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
