import { Responsible } from '@prisma/client';

import { CreateResponsibleDTO } from '@/responsible/dtos/CreateResponsibleDTO';
import { ResponsibleRepository } from '@/responsible/repositories/ResponsibleRepository';
import { randomUUID } from 'crypto';

export class ResponsibleRepositoryInMemory implements ResponsibleRepository {
  public responsibles: Responsible[] = [];

  async findById(id: string): Promise<Responsible | null> {
    const responsible = this.responsibles.find((item) => item.id === id);

    return responsible;
  }

  async findByEmail(email: string): Promise<Responsible | null> {
    const responsible = this.responsibles.find((item) => item.email === email);

    return responsible;
  }

  async create({
    name,
    email,
    password,
    avatar,
    phoneNumber,
  }: CreateResponsibleDTO): Promise<Responsible> {
    const newResponbile = {
      id: randomUUID(),
      name,
      email,
      password,
      avatar,
      phoneNumber,
      createDate: new Date(),
      updateDate: new Date(),
      eventId: null,
    };

    this.responsibles.push(newResponbile);

    return newResponbile;
  }
}
