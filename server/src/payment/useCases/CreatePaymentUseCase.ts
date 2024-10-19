import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreatePaymentDTO } from '../dtos/CreatePaymentDTO';

import { PaymentRepository } from '../repositories/PaymentRepository';
import { EventRepository } from '@/event/repositories/EventRepository';
import { isAfter, isValid, parseISO, startOfDay } from 'date-fns';

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    private paymentRepository: PaymentRepository,
    private eventRepository: EventRepository,
  ) {}

  async execute({
    name,
    eventId,
    value,
    status,
    datePayment,
  }: CreatePaymentDTO) {
    let namePayment = name;
    const statusPayment = status ?? true;

    const currentDate = startOfDay(new Date());
    const datePaymentToDate = parseISO(datePayment);

    if (!namePayment) {
      namePayment = `Pagamento-${new Date()}`;
    }

    if (!isValid(datePaymentToDate)) {
      throw new BadRequestException('Date for payment is invalid!');
    }

    if (isAfter(startOfDay(datePaymentToDate), currentDate)) {
      throw new BadRequestException('The payment date cannot be a future date');
    }

    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new NotFoundException('Event not found!');
    }

    const newPayment = {
      name: namePayment,
      eventId,
      value,
      datePayment,
      status: statusPayment,
    };

    const payment = await this.paymentRepository.create(newPayment);

    return payment;
  }
}
