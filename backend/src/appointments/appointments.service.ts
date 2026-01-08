import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';
import { AppointmentStatus } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(clientId: string, createAppointmentDto: CreateAppointmentDto) {
    const { date, serviceId, barberId, notes } = createAppointmentDto;

    // Verify service exists
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      throw new NotFoundException('Servicio no encontrado');
    }

    if (!service.isActive) {
      throw new BadRequestException('El servicio no está disponible');
    }

    // Verify barber exists if provided
    if (barberId) {
      const barber = await this.prisma.user.findFirst({
        where: { id: barberId, role: 'BARBER' },
      });

      if (!barber) {
        throw new NotFoundException('Barbero no encontrado');
      }
    }

    const appointment = await this.prisma.appointment.create({
      data: {
        date: new Date(date),
        clientId,
        serviceId,
        barberId,
        notes,
      },
      include: {
        service: true,
        client: {
          select: { id: true, name: true, email: true, phone: true },
        },
        barber: {
          select: { id: true, name: true, email: true, phone: true },
        },
      },
    });

    return {
      message: 'Cita creada exitosamente',
      appointment,
    };
  }

  async findAll(filters?: { status?: AppointmentStatus; clientId?: string; barberId?: string }) {
    const where: Record<string, unknown> = {};

    if (filters?.status) where.status = filters.status;
    if (filters?.clientId) where.clientId = filters.clientId;
    if (filters?.barberId) where.barberId = filters.barberId;

    const appointments = await this.prisma.appointment.findMany({
      where,
      include: {
        service: true,
        client: {
          select: { id: true, name: true, email: true, phone: true },
        },
        barber: {
          select: { id: true, name: true, email: true, phone: true },
        },
      },
      orderBy: { date: 'asc' },
    });

    return appointments;
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        service: true,
        client: {
          select: { id: true, name: true, email: true, phone: true },
        },
        barber: {
          select: { id: true, name: true, email: true, phone: true },
        },
      },
    });

    if (!appointment) {
      throw new NotFoundException('Cita no encontrada');
    }

    return appointment;
  }

  async findByClient(clientId: string) {
    return this.findAll({ clientId });
  }

  async findByBarber(barberId: string) {
    return this.findAll({ barberId });
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    await this.findOne(id); // Verify appointment exists

    const data: Record<string, unknown> = { ...updateAppointmentDto };
    if (updateAppointmentDto.date) {
      data.date = new Date(updateAppointmentDto.date);
    }

    const appointment = await this.prisma.appointment.update({
      where: { id },
      data,
      include: {
        service: true,
        client: {
          select: { id: true, name: true, email: true, phone: true },
        },
        barber: {
          select: { id: true, name: true, email: true, phone: true },
        },
      },
    });

    return {
      message: 'Cita actualizada exitosamente',
      appointment,
    };
  }

  async updateStatus(id: string, status: AppointmentStatus) {
    await this.findOne(id);

    const appointment = await this.prisma.appointment.update({
      where: { id },
      data: { status },
      include: {
        service: true,
        client: {
          select: { id: true, name: true, email: true, phone: true },
        },
        barber: {
          select: { id: true, name: true, email: true, phone: true },
        },
      },
    });

    return {
      message: `Estado de la cita actualizado a ${status}`,
      appointment,
    };
  }

  async cancel(id: string) {
    return this.updateStatus(id, AppointmentStatus.CANCELLED);
  }

  async confirm(id: string) {
    return this.updateStatus(id, AppointmentStatus.CONFIRMED);
  }

  async complete(id: string) {
    return this.updateStatus(id, AppointmentStatus.COMPLETED);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.appointment.delete({
      where: { id },
    });

    return {
      message: 'Cita eliminada exitosamente',
    };
  }
}
