import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto, UpdateServiceDto } from './dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    const service = await this.prisma.service.create({
      data: createServiceDto,
    });

    return {
      message: 'Servicio creado exitosamente',
      service,
    };
  }

  async findAll(includeInactive = false) {
    const where = includeInactive ? {} : { isActive: true };
    
    const services = await this.prisma.service.findMany({
      where,
      orderBy: { name: 'asc' },
    });

    return services;
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException('Servicio no encontrado');
    }

    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    await this.findOne(id); // Verify service exists

    const service = await this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });

    return {
      message: 'Servicio actualizado exitosamente',
      service,
    };
  }

  async remove(id: string) {
    await this.findOne(id); // Verify service exists

    await this.prisma.service.delete({
      where: { id },
    });

    return {
      message: 'Servicio eliminado exitosamente',
    };
  }

  async toggleActive(id: string) {
    const service = await this.findOne(id);

    const updated = await this.prisma.service.update({
      where: { id },
      data: { isActive: !service.isActive },
    });

    return {
      message: `Servicio ${updated.isActive ? 'activado' : 'desactivado'} exitosamente`,
      service: updated,
    };
  }
}
