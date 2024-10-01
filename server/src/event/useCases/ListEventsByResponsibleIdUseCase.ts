import { Injectable } from '@nestjs/common';

import { EventRepository } from '../repositories/EventRepository';

@Injectable()
export class ListEventsByResponsibleIdUseCase {
  constructor(private eventRespository: EventRepository) {}

  async execute(responsibleId: string) {
    const events =
      await this.eventRespository.findByResponsibleId(responsibleId);

    return events;
  }
}
