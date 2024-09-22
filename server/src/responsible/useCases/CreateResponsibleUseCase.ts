import { BadRequestException } from '@nestjs/common';

import { CreateResponsibleDTO } from '../dtos/CreateResponsibleDTO';
import { ResponsibleRepository } from '../repositories/ResponsibleRepository';
import { hash } from 'bcrypt';

export class CreateResponsibleUseCase {
  constructor(private responsibleRepository: ResponsibleRepository) {}

  async execute({
    name,
    email,
    password,
    avatar,
    phoneNumber,
  }: CreateResponsibleDTO) {
    const participantAlreadyExists =
      await this.responsibleRepository.findByEmail(email);

    if (participantAlreadyExists) {
      throw new BadRequestException('Responsible already exists!');
    }

    const passwordHash = await hash(password, 10);

    const newResponsibleData = {
      name,
      email,
      password: passwordHash,
      avatar,
      phoneNumber,
    };

    const responsible =
      await this.responsibleRepository.create(newResponsibleData);

    return responsible;
  }
}
