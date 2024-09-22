import { Body, Controller, Post } from '@nestjs/common';

import { CreateParticipantUseCase } from './useCases/CreateParticipantUseCase';
import { CreateParticipantDTO } from './dtos/CreateParticipantDTO';

@Controller('/participants')
export class ParticipantController {
  constructor(
    private readonly createParticipantUseCase: CreateParticipantUseCase,
  ) {}

  @Post('/')
  async create(@Body() createParticipantDTO: CreateParticipantDTO) {
    const participant =
      await this.createParticipantUseCase.execute(createParticipantDTO);

    return participant;
  }
}
