import { registerEnumType } from '@nestjs/graphql';

export enum AnimalType {
  CAT = 'cat',
  DOG = 'dog',
  BIRD = 'bird',
}

registerEnumType(AnimalType, {
  name: 'AnimalType',
  description: 'Types of animals',
});
