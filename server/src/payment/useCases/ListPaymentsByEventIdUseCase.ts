import { Injectable, NotFoundException } from '@nestjs/common';

import { EventRepository } from '@/event/repositories/EventRepository';
import { PaymentRepository } from '../repositories/PaymentRepository';

@Injectable()
export class ListPaymentsByEventIdUseCase {
  constructor(
    private paymentRepository: PaymentRepository,
    private eventRepository: EventRepository,
  ) {}

  async execute(eventId: string) {
    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new NotFoundException('Event not found!');
    }

    const payments = await this.paymentRepository.findByEventId(eventId);

    return payments;
  }
}
