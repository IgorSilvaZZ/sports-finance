import { NotFoundException } from '@nestjs/common';

import { ParticipantRepository } from '../repositories/ParticipantRepository';
import { UpdateParticipantDTO } from '../dtos/UpdateParticipantDTO';

export class UpdateParticipantUseCase {
  constructor(private participantRepository: ParticipantRepository) {}

  async execute(participantId: string, data: UpdateParticipantDTO) {
    const participantAlreadyExists =
      await this.participantRepository.findById(participantId);

    if (!participantAlreadyExists) {
      throw new NotFoundException('Participant not found!');
    }

    const updateParticipant = await this.participantRepository.updateById(
      participantId,
      data,
    );

    return updateParticipant;
  }
}
