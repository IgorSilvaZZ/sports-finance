import { CreateEventDTO } from '@/event/dtos/CreateEventDTO';
import { TypeEvent } from '@/event/enums/typeEvent.enums';

import { Override } from '../types/Override.type';

export const makeEvent = (override: Override<CreateEventDTO> = {}) => {
  return {
    name: 'Event Test',
    type: TypeEvent.TENNIS,
    description: 'Event test created',
    responsibleId: 'responsible-id',
    dayMonthly: '20',
    valueMonthly: 300,
    ...override,
  };
};
