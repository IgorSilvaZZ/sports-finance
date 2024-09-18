import { Participant as ParticipantPrisma } from '@prisma/client';

import { CreateParticipantDTO } from '@/participant/dtos/CreateParticipantDTO';

export abstract class ParticipantRepository {
  abstract create(data: CreateParticipantDTO): Promise<ParticipantPrisma>;
  abstract findyByEmail(email: string): Promise<ParticipantPrisma>;
  abstract findById(id: string): Promise<ParticipantPrisma>;
}
