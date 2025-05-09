import { registerEnumType } from '@nestjs/graphql';

export enum AnimalStatus {
  AVAILABLE = 'AVAILABLE',
  ADOPTED = 'ADOPTED',
  IN_TREATMENT = 'IN_TREATMENT',
  DECEASED = 'DECEASED',
  RESERVED = 'RESERVED',
}

registerEnumType(AnimalStatus, {
  name: 'AnimalStatus',
  description: 'Current status of the animal',
});
