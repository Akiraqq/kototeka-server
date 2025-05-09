import { Animal } from '../entities';
import { User } from '@src/types/user.type';
import { AnimalStatus, AnimalType } from '../enums';
import { Repository } from 'typeorm';
import { Role } from '@src/common/enums';
import { CreateAnimalInput, UpdateAnimalInput } from '../dto';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

export const volunteer: User = {
  userId: 'user1',
  email: '',
  role: Role.VOLUNTEER,
  organizationId: 'org123',
  refresh_token: null,
};

export const admin: User = {
  ...volunteer,
  role: Role.ADMIN,
};

export const exampleAnimal: CreateAnimalInput = {
  name: 'Doggo',
  description: '',
  type: AnimalType.DOG,
  status: AnimalStatus.ADOPTED,
  organizationId: volunteer.organizationId,
  photoUrls: [],
};

export const exampleAnimalWithId = {
  ...exampleAnimal,
  id: '1',
};

export const exampleAnimalWithDeleted = {
  ...exampleAnimalWithId,
  deletedAt: Date.now(),
};

export const updateInput: UpdateAnimalInput = {
  id: '1',
  name: 'Updated Dog',
  organizationId: volunteer.organizationId,
};

export const mockAnimalRepository = (): MockType<Repository<Animal>> => ({
  create: jest.fn().mockReturnValue(exampleAnimal),
  save: jest.fn().mockReturnValue(exampleAnimal),
  update: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softRemove: jest.fn().mockReturnValue(exampleAnimal),
  restore: jest.fn(),
});

export const mockAnimalsService = {
  createAnimal: jest.fn().mockResolvedValueOnce(exampleAnimalWithId),
  findAllAnimals: jest.fn().mockResolvedValue([exampleAnimalWithId]),
  findOneAnimal: jest.fn().mockResolvedValue(exampleAnimalWithId),
  deleteAnimal: jest.fn().mockResolvedValue(exampleAnimalWithId),
  restoreAnimal: jest.fn().mockResolvedValue(exampleAnimalWithId),
  updateAnimal: jest
    .fn()
    .mockResolvedValue({ ...exampleAnimalWithId, ...updateInput }),
};
