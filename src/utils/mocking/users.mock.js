import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';

const ROLES = ['user', 'admin'];
const DEFAULT_PASSWORD = 'coder123';

export const generateMockUser = () => ({
  _id: new Types.ObjectId(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  age: faker.number.int({ min: 18, max: 65 }),
  password: bcrypt.hashSync(DEFAULT_PASSWORD, 10),
  role: faker.helpers.arrayElement(ROLES),
  pets: [],
  __v: 0
});

export const generateMockUsers = (quantity = 50) => {
  return Array.from({ length: quantity }, generateMockUser);
};