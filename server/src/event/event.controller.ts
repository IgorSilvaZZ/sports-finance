import { Body, Controller, Post } from '@nestjs/common';

import { CreateEventDTO } from './dtos/CreateEventDTO';
import { CreateEventUseCase } from './useCases/CreateEventUseCase';

@Controller('/events')
export class EventController {
  constructor(private createEventUseCase: CreateEventUseCase) {}

  @Post('/')
  async create(@Body() createEventDTO: CreateEventDTO) {
    const event = await this.createEventUseCase.execute(createEventDTO);

    return event;
  }
}
