import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateHistoryDTO } from '../dtos/UpdateHistoryDTO';

import { HistoryRepository } from '../repositories/HistoryRepository';

@Injectable()
export class UpdateHistoryByEventIdUseCase {
  constructor(private historyRepository: HistoryRepository) {}

  async execute(historyId: string, eventId: string, data: UpdateHistoryDTO) {
    const history = await this.historyRepository.findByEventId(
      historyId,
      eventId,
    );

    if (!history) {
      throw new NotFoundException('History not found!');
    }

    if (data.value && data.value <= 0) {
      throw new BadRequestException('The value cannot be less than zero!');
    }

    const historyUpdated = await this.historyRepository.updateById(
      historyId,
      data,
    );

    return historyUpdated;
  }
}
