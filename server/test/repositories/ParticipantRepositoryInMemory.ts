import { Participant as ParticipantPrisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { CreateParticipantDTO } from '@/participant/dtos/CreateParticipantDTO';
import { ParticipantRepository } from '@/participant/repositories/ParticipantRepository';
import { UpdateParticipantDTO } from '@/participant/dtos/UpdateParticipantDTO';

export class ParticipantRepositoryInMemory implements ParticipantRepository {
  public participants: ParticipantPrisma[] = [];

  async findById(id: string): Promise<ParticipantPrisma | null> {
    const participant = this.participants.find((item) => item.id === id);

    return participant;
  }

  async findyByEmail(email: string): Promise<ParticipantPrisma | null> {
    const participant = this.participants.find((item) => item.email === email);

    return participant;
  }

  async findByEventId(
    nameParticipant: string,
    eventId: string,
  ): Promise<ParticipantPrisma | null> {
    const participant = this.participants.find(
      (item) => item.name === nameParticipant && item.eventId === eventId,
    );

    return participant;
  }

  async create({
    name,
    email,
    phoneNumber,
    avatar,
    eventId,
  }: CreateParticipantDTO): Promise<ParticipantPrisma> {
    const dataParticipant = {
      id: randomUUID(),
      name,
      email,
      phoneNumber,
      avatar,
      eventId,
      createDate: new Date(),
      updateDate: new Date(),
    };

    this.participants.push(dataParticipant);

    return dataParticipant;
  }

  async updateById(
    id: string,
    data: UpdateParticipantDTO,
  ): Promise<ParticipantPrisma | null> {
    const participantIndex = this.participants.findIndex(
      (item) => item.id === id,
    );

    if (participantIndex >= 0) {
      const currentParticipant = this.participants[participantIndex];

      if (data.name) {
        currentParticipant.name = data.name;
      }

      if (data.email) {
        currentParticipant.email = data.email;
      }

      if (data.phoneNumber) {
        currentParticipant.phoneNumber = data.phoneNumber;
      }

      if (data.avatar) {
        currentParticipant.avatar = data.avatar;
      }

      this.participants[participantIndex] = currentParticipant;

      return currentParticipant;
    }

    return null;
  }
}
