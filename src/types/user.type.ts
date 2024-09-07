import { Role } from '@src/common/enums';

export type User = {
  userId: string;
  email: string;
  refresh_token: string;
  role: Role;
};

export type UserWithoutRt = Omit<User, 'refresh_token'>;
