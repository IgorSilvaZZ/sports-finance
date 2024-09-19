import { Participant as ParticipantPrisma } from '@prisma/client';

import { CreateParticipantDTO } from '@/participant/dtos/CreateParticipantDTO';

export abstract class ParticipantRepository {
  abstract create(
    data: CreateParticipantDTO,
  ): Promise<ParticipantPrisma | null>;
  abstract findById(id: string): Promise<ParticipantPrisma>;
  abstract findByEventId(
    nameParticipant: string,
    eventId: string,
  ): Promise<ParticipantPrisma | null>;
}
