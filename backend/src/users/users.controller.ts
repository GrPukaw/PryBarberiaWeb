import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
  Patch,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';
import { Role } from '@prisma/client';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  findAll(@Query('role') role?: Role) {
    return this.usersService.findAll(role);
  }

  @Get('barbers')
  findBarbers() {
    return this.usersService.findBarbers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id/role')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  updateRole(@Param('id') id: string, @Body('role') role: Role) {
    return this.usersService.updateRole(id, role);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
