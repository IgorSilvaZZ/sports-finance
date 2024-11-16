import { BadRequestException, Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { hash } from 'bcrypt';

import { CreateResponsibleDTO } from '../dtos/CreateResponsibleDTO';
import { ResponsibleRepository } from '../repositories/ResponsibleRepository';

@Injectable()
export class CreateResponsibleUseCase {
  constructor(
    private i18nService: I18nService,
    private responsibleRepository: ResponsibleRepository,
  ) {}

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
      throw new BadRequestException(
        this.i18nService.t('events.RESPONSIBLE.ALREADYEXISTS', {
          lang: I18nContext.current()?.lang || 'en',
        }),
      );
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
