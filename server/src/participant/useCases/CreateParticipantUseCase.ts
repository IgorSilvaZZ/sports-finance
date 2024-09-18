import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';

import { CreateParticipantDTO } from '@/participant/dtos/CreateParticipantDTO';
import { ParticipantRepository } from '@/participant/repositories/ParticipantRepository';
import { CategoryRepository } from '@/category/repositories/CategoryRepository';
import { EventRepository } from '@/event/repositories/EventRepository';

@Injectable()
export class CreateParticipantUseCase {
  constructor(
    private participantRepository: ParticipantRepository,
    private categoryRepository: CategoryRepository,
    private eventRepository: EventRepository,
  ) {}

  async execute(data: CreateParticipantDTO) {
    const participantAlreadyExists =
      await this.participantRepository.findyByEmail(data.email);

    if (participantAlreadyExists) {
      throw new NotFoundException('Participant already exists!');
    }

    let password = '';

    if (data.password) {
      password = await hash(data.password, 10);
    }

    if (data.eventId) {
      const eventAlreadyExists = await this.eventRepository.findById(
        String(data.eventId),
      );

      if (!eventAlreadyExists) {
        throw new NotFoundException('Event not found!');
      }
    }

    try {
      // Criando novo participante
      const participant = await this.participantRepository.create({
        name: data.name,
        email: data.email,
        password: password,
        phoneNumber: data.phoneNumber,
        avatar: data.avatar,
        eventId: data.eventId,
      });

      // Relacionando a categoria para o participante responsável
      if (data.eventId) {
        await Promise.all([
          this.categoryRepository.updateParticipantById(
            'Saldo Total',
            participant.id,
          ),
          this.categoryRepository.updateParticipantById(
            'Caixa',
            participant.id,
          ),
        ]);
      }

      return participant;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error in create new participant!');
    }
  }
}
