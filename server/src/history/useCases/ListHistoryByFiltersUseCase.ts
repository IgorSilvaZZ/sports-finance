import { Injectable } from '@nestjs/common';

import { FilterHistoryDTO } from '../dtos/FilterHistoryDTO';

import { HistoryRepository } from '../repositories/HistoryRepository';

@Injectable()
export class ListHistoryByFiltersUseCase {
  constructor(private historyRespository: HistoryRepository) {}

  async execute(filtersHistory: FilterHistoryDTO) {
    const filters = { ...filtersHistory };

    Object.keys(filters).forEach((key) => {
      if (!key) {
        delete filters[key];
      }
    });

    const listHistory = await this.historyRespository.listByFilters(filters);

    return listHistory;
  }
}
