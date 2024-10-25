import { Injectable, NotFoundException } from '@nestjs/common';

import { UpdatePaymentDTO } from '../dtos/UpdatePaymentDTO';

import { PaymentRepository } from '../repositories/PaymentRepository';
import { EventRepository } from '@/event/repositories/EventRepository';

@Injectable()
export class UpdatePaymentEventByIdUseCase {
  constructor(
    private paymentRepository: PaymentRepository,
    private eventRepository: EventRepository,
  ) {}

  async execute(eventId: string, paymentId: string, data: UpdatePaymentDTO) {
    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new NotFoundException('Event not found!');
    }

    const paymentByEvent = await this.paymentRepository.findPaymentByEvent(
      paymentId,
      eventId,
    );

    if (!paymentByEvent) {
      throw new NotFoundException('Payment not found!');
    }

    const paymentUpdated = await this.paymentRepository.updateById(
      paymentId,
      data,
    );

    return paymentUpdated;
  }
}
