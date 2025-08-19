import { DashBoardFilters } from "../interfaces/Dashboard.interface";
import { History } from "../interfaces/History.interface";

import { getQueryParams } from "../utils/history";

import { api } from "../lib/axios";

export class HistoryService {
  static async getHistories(
    eventId: string,
    queryParams?: DashBoardFilters
  ): Promise<History[]> {
    const params = {
      eventId,
      ...getQueryParams(queryParams as DashBoardFilters),
    };

    const { data } = await api.get<History[]>("/history", {
      params,
    });

    return data;
  }
}
