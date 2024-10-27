import { Participant as ParticipantPrisma } from '@prisma/client';

import { CreateParticipantDTO } from '@/participant/dtos/CreateParticipantDTO';
import { UpdateParticipantDTO } from '@/participant/dtos/UpdateParticipantDTO';

export abstract class ParticipantRepository {
  abstract findById(id: string): Promise<ParticipantPrisma>;
  abstract findActiveByEventId(
    nameParticipant: string,
    eventId: string,
  ): Promise<ParticipantPrisma | null>;
  abstract create(
    data: CreateParticipantDTO,
  ): Promise<ParticipantPrisma | null>;
  abstract updateById(
    id: string,
    data: UpdateParticipantDTO,
  ): Promise<ParticipantPrisma | null>;
}
