import { Injectable } from '@nestjs/common';
import { Participant } from '@prisma/client';

import { CreateParticipantDTO } from '@/participant/dtos/CreateParticipantDTO';
import { UpdateParticipantDTO } from '@/participant/dtos/UpdateParticipantDTO';
import { ParticipantRepository } from '@/participant/repositories/ParticipantRepository';

import { DatabaseService } from '../database.service';

@Injectable()
export class ParticipantPrismaRepository implements ParticipantRepository {
  constructor(private prismaService: DatabaseService) {}

  async findById(id: string): Promise<Participant> {
    const participant = await this.prismaService.participant.findFirst({
      where: { id },
    });

    return participant;
  }
  async findByEventId(
    nameParticipant: string,
    eventId: string,
  ): Promise<Participant | null> {
    const participant = await this.prismaService.participant.findFirst({
      where: {
        AND: [
          {
            name: nameParticipant,
          },
          {
            eventId,
          },
        ],
      },
    });

    return participant;
  }
  async create(data: CreateParticipantDTO): Promise<Participant | null> {
    const newParticipant = await this.prismaService.participant.create({
      data,
    });

    return newParticipant;
  }
  async updateById(
    id: string,
    data: UpdateParticipantDTO,
  ): Promise<Participant | null> {
    const updateParticipant = await this.prismaService.participant.update({
      where: {
        id,
      },
      data,
    });

    return updateParticipant;
  }
}
