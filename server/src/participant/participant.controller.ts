import { Body, Controller, Param, Post, Put } from '@nestjs/common';

import { CreateParticipantUseCase } from './useCases/CreateParticipantUseCase';
import { CreateParticipantDTO } from './dtos/CreateParticipantDTO';
import { UpdateParticipantUseCase } from './useCases/UpdateParticipantUseCase';
import { UpdateParticipantDTO } from './dtos/UpdateParticipantDTO';

@Controller('/participants')
export class ParticipantController {
  constructor(
    private readonly createParticipantUseCase: CreateParticipantUseCase,
    private readonly updateParticipantUseCase: UpdateParticipantUseCase,
  ) {}

  @Post('/')
  async create(@Body() createParticipantDTO: CreateParticipantDTO) {
    const participant =
      await this.createParticipantUseCase.execute(createParticipantDTO);

    return participant;
  }

  @Put('/:participantId')
  async updateById(
    @Param('participantId') participantId: string,
    @Body() updateParticipantDTO: UpdateParticipantDTO,
  ) {
    const participantUpdated = await this.updateParticipantUseCase.execute(
      participantId,
      updateParticipantDTO,
    );

    return participantUpdated;
  }
}
