import { Injectable } from '@nestjs/common';
import { Responsible } from '@prisma/client';

import { CreateResponsibleDTO } from '@/responsible/dtos/CreateResponsibleDTO';
import { ResponsibleRepository } from '@/responsible/repositories/ResponsibleRepository';

import { DatabaseService } from '../database.service';

@Injectable()
export class ResponsiblePrismaRepository implements ResponsibleRepository {
  constructor(private prismaService: DatabaseService) {}

  async findById(id: string): Promise<Responsible | null> {
    const responsible = await this.prismaService.responsible.findFirst({
      where: {
        id,
      },
    });

    return responsible;
  }

  async findByEmail(email: string): Promise<Responsible | null> {
    const responsible = await this.prismaService.responsible.findFirst({
      where: {
        email,
      },
    });

    return responsible;
  }

  async create(data: CreateResponsibleDTO): Promise<Responsible> {
    const newReponsible = await this.prismaService.responsible.create({
      data,
    });

    return newReponsible;
  }
}
