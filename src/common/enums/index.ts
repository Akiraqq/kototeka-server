import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  VOLUNTEER = 'VOLUNTEER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User roles within the application',
});
