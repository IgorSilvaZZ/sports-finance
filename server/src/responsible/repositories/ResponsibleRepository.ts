import { Responsible as ResponsiblePrisma } from '@prisma/client';

import { CreateResponsibleDTO } from '@/responsible/dtos/CreateResponsibleDTO';

export abstract class ResponsibleRepository {
  abstract create(data: CreateResponsibleDTO): Promise<ResponsiblePrisma>;
  abstract findById(id: string): Promise<ResponsiblePrisma | null>;
  abstract findByEmail(email: string): Promise<ResponsiblePrisma | null>;
}
