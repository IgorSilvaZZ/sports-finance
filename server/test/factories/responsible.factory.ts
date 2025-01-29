import { faker } from '@faker-js/faker/.';

import { Override } from '../types/Override.type';

import { CreateResponsibleDTO } from '@/responsible/dtos/CreateResponsibleDTO';

export const makeResponsible = (
  override: Override<CreateResponsibleDTO> = {},
) => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    password: '123',
    ...override,
  };
};
