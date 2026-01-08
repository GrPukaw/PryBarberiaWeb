import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { CurrentUser, Roles } from '../auth/decorators';
import { Role, AppointmentStatus, User } from '@prisma/client';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(
    @CurrentUser() user: User,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    return this.appointmentsService.create(user.id, createAppointmentDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.BARBER)
  findAll(@Query('status') status?: AppointmentStatus) {
    return this.appointmentsService.findAll({ status });
  }

  @Get('my-appointments')
  findMyAppointments(@CurrentUser() user: User) {
    if (user.role === 'BARBER') {
      return this.appointmentsService.findByBarber(user.id);
    }
    return this.appointmentsService.findByClient(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Patch(':id/confirm')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.BARBER)
  confirm(@Param('id') id: string) {
    return this.appointmentsService.confirm(id);
  }

  @Patch(':id/complete')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.BARBER)
  complete(@Param('id') id: string) {
    return this.appointmentsService.complete(id);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.appointmentsService.cancel(id);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
