import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(role?: Role) {
    const where = role ? { role } : {};
    
    const users = await this.prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async findBarbers() {
    return this.findAll(Role.BARBER);
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateRole(id: string, role: Role) {
    await this.findOne(id);

    const user = await this.prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return {
      message: `Rol actualizado a ${role}`,
      user,
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.user.delete({
      where: { id },
    });

    return {
      message: 'Usuario eliminado exitosamente',
    };
  }
}
