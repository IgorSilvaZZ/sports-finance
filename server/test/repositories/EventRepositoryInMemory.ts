import { randomUUID } from 'crypto';
import { parseISO } from 'date-fns';
import {
  Prisma,
  Event as EventPrisma,
  Participant as ParticipantPrisma,
  Payments as PaymentsPrisma,
} from '@prisma/client';

import { CreateEventDTO } from '@/event/dtos/CreateEventDTO';
import { CreateParticipantDTO } from '@/participant/dtos/CreateParticipantDTO';
import { CreatePaymentDTO } from '@/payment/dtos/CreatePaymentDTO';

import { EventRepository } from '@/event/repositories/EventRepository';
import { UpdateEventDTO } from '@/event/dtos/UpdateEventDTO';

export class EventRepositoryInMemory implements EventRepository {
  public events: EventPrisma[] = [];

  public participants: ParticipantPrisma[] = [];

  public payments: PaymentsPrisma[] = [];

  async findById(
    id: string,
  ): Promise<(EventPrisma & { participants: ParticipantPrisma[] }) | null> {
    const event = this.events.find((item) => item.id === id);

    if (event) {
      const participants = this.participants.filter(
        (participant) => participant.eventId === event.id,
      );

      return {
        ...event,
        participants,
      };
    }

    return null;
  }

  async findByResponsibleId(responsibleId: string): Promise<
    (EventPrisma & {
      participantsCount: number;
      participants: ParticipantPrisma[];
    })[]
  > {
    const filteredEvents = this.events.filter(
      (item) => item.responsibleId === responsibleId,
    );

    const eventsWithParticipantsCount = filteredEvents.map((event) => {
      const participants = this.participants.filter(
        (participant) => participant.eventId === event.id,
      );

      return {
        ...event,
        participants,
        participantsCount: participants.length,
      };
    });

    return eventsWithParticipantsCount;
  }

  async findOneEventByResponsibleId(
    id: string,
    responsibleId: string,
  ): Promise<
    | (EventPrisma & {
        participants: ParticipantPrisma[];
        payments: PaymentsPrisma[];
      })
    | null
  > {
    const event = this.events.find(
      (item) => item.id === id && item.responsibleId === responsibleId,
    );

    if (event) {
      const participants = this.participants.filter(
        (participant) => participant.eventId === event.id,
      );

      const payments = this.payments.filter(
        (payment) => payment.eventId === event.id,
      );

      return {
        ...event,
        payments,
        participants,
      };
    }

    return null;
  }

  async create(data: CreateEventDTO): Promise<EventPrisma> {
    const newEvent = {
      ...data,
      id: randomUUID(),
      createDate: new Date(),
      updateDate: new Date(),
    };

    this.events.push(newEvent);

    return newEvent;
  }

  async createParticipantEvent({
    name,
    email,
    phoneNumber,
    avatar,
    eventId,
    status,
  }: CreateParticipantDTO) {
    const newParticipantEvent = {
      id: randomUUID(),
      name,
      email,
      phoneNumber,
      avatar,
      eventId,
      status: status ?? true,
      createDate: new Date(),
      updateDate: new Date(),
    };

    this.participants.push(newParticipantEvent);

    return newParticipantEvent;
  }

  async updateByEventResponsibleById(
    id: string,
    responsibleId: string,
    { name, description, dayMonthly, valueMonthly }: UpdateEventDTO,
  ): Promise<EventPrisma | null> {
    const eventByResponsibleIndex = this.events.findIndex(
      (item) => item.id === id && item.responsibleId === responsibleId,
    );

    if (eventByResponsibleIndex === -1) {
      return null;
    }

    const eventByResponsible = this.events[eventByResponsibleIndex];

    if (name) {
      eventByResponsible.name = name;
    }

    if (description) {
      eventByResponsible.description = description;
    }

    if (dayMonthly) {
      eventByResponsible.dayMonthly = dayMonthly;
    }

    if (valueMonthly) {
      eventByResponsible.valueMonthly = valueMonthly;
    }

    this.events[eventByResponsibleIndex] = eventByResponsible;

    return eventByResponsible;
  }

  async createPaymentEvent({
    name,
    datePayment,
    eventId,
    value,
    status,
    paymentRef,
  }: CreatePaymentDTO): Promise<PaymentsPrisma> {
    const newPayment = {
      id: randomUUID(),
      name,
      datePayment: parseISO(datePayment),
      value: new Prisma.Decimal(value),
      eventId,
      paymentRef,
      status: status ?? true,
      createDate: parseISO(datePayment) ?? new Date(),
      updateDate: new Date(),
    };

    this.payments.push(newPayment);

    return newPayment;
  }

  async deleteEventResponsibleById(
    id: string,
    responsibleId: string,
  ): Promise<void> {
    const eventIndex = this.events.findIndex(
      (item) => item.id === id && item.responsibleId === responsibleId,
    );

    if (eventIndex >= 0) {
      this.events.splice(eventIndex, 1);
    }
  }
}
